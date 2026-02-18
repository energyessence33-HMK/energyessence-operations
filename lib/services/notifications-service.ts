import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Constants from "expo-constants";

const affirmations = [
  "Return to your Essence.",
  "Move with Heaven's Precision.",
  "You are guided.",
  "Align with your Divine Purpose.",
  "Breathe in Truth, Exhale Illusion.",
  "Your Kingdom awaits.",
  "Rise in Christ Consciousness.",
  "Divine Order is your Foundation.",
  "Be the Light you seek.",
  "Your Frequency attracts your Reality.",
  "You are worthy of abundance.",
  "Trust the divine timing.",
  "Your voice matters.",
  "Create from love, not fear.",
  "You are exactly where you need to be.",
];

export const NotificationsService = {
  async registerForPushNotifications() {
    if (Platform.OS === "web") {
      console.log("Push notifications not available on web");
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return null;
    }

    try {
      const token = await Notifications.getExpoPushTokenAsync();
      return token.data;
    } catch (error) {
      console.error("Failed to get push token:", error);
      return null;
    }
  },

  async scheduleDailyAffirmation(hour: number = 9, minute: number = 0) {
    const randomAffirmation =
      affirmations[Math.floor(Math.random() * affirmations.length)];

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "✨ Daily Affirmation",
        body: randomAffirmation,
        data: {
          type: "affirmation",
          affirmation: randomAffirmation,
        },
        sound: "default",
        badge: 1,
      },
      trigger: {
        type: "calendar" as const,
        hour,
        minute,
        repeats: true,
      } as any,
    });
  },

  async scheduleCustomNotification(
    title: string,
    body: string,
    delayInSeconds: number = 10,
    data?: Record<string, any>
  ) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data || {},
        sound: "default",
      },
      trigger: {
        seconds: delayInSeconds,
      } as any,
    });
  },

  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },

  async getScheduledNotifications() {
    return await Notifications.getAllScheduledNotificationsAsync();
  },

  setNotificationHandler() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  },

  onNotificationReceived(
    callback: (notification: Notifications.Notification) => void
  ) {
    return Notifications.addNotificationReceivedListener(callback);
  },

  onNotificationResponse(
    callback: (response: Notifications.NotificationResponse) => void
  ) {
    return Notifications.addNotificationResponseReceivedListener(callback);
  },
};
