import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AnalyticsEvent {
  eventType: string;
  timestamp: string;
  userId?: string;
  data?: Record<string, any>;
}

export interface UserMetrics {
  totalVideosCreated: number;
  totalVideosShared: number;
  totalEarnings: number;
  averageEngagementRate: number;
  lastActiveDate: string;
  coursesCompleted: number;
  certificationsEarned: number;
}

const STORAGE_KEYS = {
  EVENTS: "analytics_events",
  METRICS: "user_metrics",
};

export const AnalyticsService = {
  async trackEvent(event: AnalyticsEvent) {
    try {
      const events = await this.getEvents();
      events.push(event);
      await AsyncStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (error) {
      console.error("Failed to track event:", error);
    }
  },

  async getEvents(): Promise<AnalyticsEvent[]> {
    try {
      const events = await AsyncStorage.getItem(STORAGE_KEYS.EVENTS);
      return events ? JSON.parse(events) : [];
    } catch (error) {
      console.error("Failed to get events:", error);
      return [];
    }
  },

  async getUserMetrics(): Promise<UserMetrics> {
    try {
      const metrics = await AsyncStorage.getItem(STORAGE_KEYS.METRICS);
      return metrics
        ? JSON.parse(metrics)
        : {
            totalVideosCreated: 0,
            totalVideosShared: 0,
            totalEarnings: 0,
            averageEngagementRate: 0,
            lastActiveDate: new Date().toISOString(),
            coursesCompleted: 0,
            certificationsEarned: 0,
          };
    } catch (error) {
      console.error("Failed to get metrics:", error);
      return {
        totalVideosCreated: 0,
        totalVideosShared: 0,
        totalEarnings: 0,
        averageEngagementRate: 0,
        lastActiveDate: new Date().toISOString(),
        coursesCompleted: 0,
        certificationsEarned: 0,
      };
    }
  },

  async updateMetrics(updates: Partial<UserMetrics>) {
    try {
      const current = await this.getUserMetrics();
      const updated = { ...current, ...updates, lastActiveDate: new Date().toISOString() };
      await AsyncStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to update metrics:", error);
    }
  },

  async trackVideoCreated(videoId: string, duration: "1min" | "3min") {
    await this.trackEvent({
      eventType: "video_created",
      timestamp: new Date().toISOString(),
      data: { videoId, duration },
    });

    const metrics = await this.getUserMetrics();
    await this.updateMetrics({
      totalVideosCreated: metrics.totalVideosCreated + 1,
    });
  },

  async trackVideoShared(videoId: string, platform: string) {
    await this.trackEvent({
      eventType: "video_shared",
      timestamp: new Date().toISOString(),
      data: { videoId, platform },
    });

    const metrics = await this.getUserMetrics();
    await this.updateMetrics({
      totalVideosShared: metrics.totalVideosShared + 1,
    });
  },

  async trackCourseCompleted(courseId: string) {
    await this.trackEvent({
      eventType: "course_completed",
      timestamp: new Date().toISOString(),
      data: { courseId },
    });

    const metrics = await this.getUserMetrics();
    await this.updateMetrics({
      coursesCompleted: metrics.coursesCompleted + 1,
    });
  },

  async trackEarnings(amount: number, source: string) {
    await this.trackEvent({
      eventType: "earnings",
      timestamp: new Date().toISOString(),
      data: { amount, source },
    });

    const metrics = await this.getUserMetrics();
    await this.updateMetrics({
      totalEarnings: metrics.totalEarnings + amount,
    });
  },

  async clearAllEvents() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.EVENTS);
    } catch (error) {
      console.error("Failed to clear events:", error);
    }
  },

  async exportAnalytics() {
    try {
      const events = await this.getEvents();
      const metrics = await this.getUserMetrics();
      return { events, metrics };
    } catch (error) {
      console.error("Failed to export analytics:", error);
      return null;
    }
  },
};
