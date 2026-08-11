import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { getAffirmationOfTheDay } from "@/lib/data/affirmations";

export interface AffirmationSchedule {
  id: string;
  enabled: boolean;
  time: string; // HH:mm format
  frequency: "daily" | "weekly" | "custom";
  daysOfWeek?: number[]; // 0-6, 0 = Sunday
  lastSent?: string;
  notificationId?: string;
}

const STORAGE_KEY = "affirmation_schedule";
const DEFAULT_SCHEDULE: AffirmationSchedule = {
  id: "default_schedule",
  enabled: true,
  time: "08:00",
  frequency: "daily",
};

export const AffirmationSchedulerService = {
  async initializeScheduler() {
    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      if (!existing) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SCHEDULE));
      }

      // Request notification permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.warn("Notification permissions not granted");
      }

      // Set notification handler
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });
    } catch (error) {
      console.error("Failed to initialize scheduler:", error);
    }
  },

  async getSchedule(): Promise<AffirmationSchedule> {
    try {
      const schedule = await AsyncStorage.getItem(STORAGE_KEY);
      return schedule ? JSON.parse(schedule) : DEFAULT_SCHEDULE;
    } catch (error) {
      console.error("Failed to get schedule:", error);
      return DEFAULT_SCHEDULE;
    }
  },

  async updateSchedule(schedule: Partial<AffirmationSchedule>): Promise<AffirmationSchedule> {
    try {
      const current = await this.getSchedule();
      const updated = { ...current, ...schedule };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error("Failed to update schedule:", error);
      return DEFAULT_SCHEDULE;
    }
  },

  async scheduleAffirmationNotification(schedule: AffirmationSchedule): Promise<string | null> {
    try {
      // Cancel existing notification if any
      if (schedule.notificationId) {
        await Notifications.cancelScheduledNotificationAsync(schedule.notificationId);
      }

      const [hours, minutes] = schedule.time.split(":").map(Number);
      const affirmation = getAffirmationOfTheDay();

      const trigger: any = {
        type: "calendar",
        hour: hours,
        minute: minutes,
      };

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "✨ Your Daily Affirmation",
          body: affirmation.text,
          data: {
            affirmationId: affirmation.id,
            category: affirmation.category,
          },
          sound: "default",
          badge: 1,
        },
        trigger: trigger as any,
      });

      // Update schedule with notification ID
      schedule.notificationId = notificationId;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));

      return notificationId;
    } catch (error) {
      console.error("Failed to schedule notification:", error);
      return null;
    }
  },

  async sendImmediateAffirmation(): Promise<boolean> {
    try {
      const affirmation = getAffirmationOfTheDay();

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "✨ Your Daily Affirmation",
          body: affirmation.text,
          data: {
            affirmationId: affirmation.id,
            category: affirmation.category,
          },
        },
        trigger: { type: "timeInterval" as any, seconds: 1 },
      });

      return true;
    } catch (error) {
      console.error("Failed to send immediate affirmation:", error);
      return false;
    }
  },

  async enableDailyAffirmations(): Promise<boolean> {
    try {
      const schedule = await this.getSchedule();
      schedule.enabled = true;
      await this.updateSchedule(schedule);
      await this.scheduleAffirmationNotification(schedule);
      return true;
    } catch (error) {
      console.error("Failed to enable daily affirmations:", error);
      return false;
    }
  },

  async disableDailyAffirmations(): Promise<boolean> {
    try {
      const schedule = await this.getSchedule();
      schedule.enabled = false;

      if (schedule.notificationId) {
        await Notifications.cancelScheduledNotificationAsync(schedule.notificationId);
      }

      await this.updateSchedule(schedule);
      return true;
    } catch (error) {
      console.error("Failed to disable daily affirmations:", error);
      return false;
    }
  },

  async setAffirmationTime(time: string): Promise<AffirmationSchedule> {
    try {
      const schedule = await this.getSchedule();
      schedule.time = time;
      await this.updateSchedule(schedule);

      if (schedule.enabled) {
        await this.scheduleAffirmationNotification(schedule);
      }

      return schedule;
    } catch (error) {
      console.error("Failed to set affirmation time:", error);
      return DEFAULT_SCHEDULE;
    }
  },

  async setAffirmationFrequency(
    frequency: "daily" | "weekly" | "custom"
  ): Promise<AffirmationSchedule> {
    try {
      const schedule = await this.getSchedule();
      schedule.frequency = frequency;
      await this.updateSchedule(schedule);

      if (schedule.enabled) {
        await this.scheduleAffirmationNotification(schedule);
      }

      return schedule;
    } catch (error) {
      console.error("Failed to set affirmation frequency:", error);
      return DEFAULT_SCHEDULE;
    }
  },

  async setWeeklyDays(daysOfWeek: number[]): Promise<AffirmationSchedule> {
    try {
      const schedule = await this.getSchedule();
      schedule.daysOfWeek = daysOfWeek;
      schedule.frequency = "weekly";
      await this.updateSchedule(schedule);

      if (schedule.enabled) {
        await this.scheduleAffirmationNotification(schedule);
      }

      return schedule;
    } catch (error) {
      console.error("Failed to set weekly days:", error);
      return DEFAULT_SCHEDULE;
    }
  },

  async getScheduledNotifications(): Promise<any[]> {
    try {
      return (await Notifications.getAllScheduledNotificationsAsync()) as any[];
    } catch (error) {
      console.error("Failed to get scheduled notifications:", error);
      return [];
    }
  },

  async clearAllNotifications(): Promise<void> {
    try {
      const notifications = await this.getScheduledNotifications();
      for (const notification of notifications) {
        await Notifications.cancelScheduledNotificationAsync((notification as any).identifier);
      }
    } catch (error) {
      console.error("Failed to clear notifications:", error);
    }
  },

  async getAffirmationStats(): Promise<{
    totalScheduled: number;
    enabled: boolean;
    nextTime: string;
    frequency: string;
  }> {
    try {
      const schedule = await this.getSchedule();
      const notifications = await this.getScheduledNotifications();

      return {
        totalScheduled: notifications.length,
        enabled: schedule.enabled,
        nextTime: schedule.time,
        frequency: schedule.frequency,
      };
    } catch (error) {
      console.error("Failed to get stats:", error);
      return {
        totalScheduled: 0,
        enabled: false,
        nextTime: "08:00",
        frequency: "daily",
      };
    }
  },
};
