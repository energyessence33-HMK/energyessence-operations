import AsyncStorage from "@react-native-async-storage/async-storage";

export interface EmailSubscriber {
  email: string;
  name: string;
  subscribedAt: string;
  tags: string[];
  preferences: {
    dailyAffirmations: boolean;
    newFeatures: boolean;
    promotions: boolean;
    communityUpdates: boolean;
  };
}

const AFFIRMATIONS = [
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

const STORAGE_KEY = "email_subscribers";

export const EmailService = {
  async subscribeEmail(
    email: string,
    name: string,
    tags: string[] = ["new_subscriber"]
  ): Promise<EmailSubscriber | null> {
    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.error("Invalid email address");
        return null;
      }

      const subscriber: EmailSubscriber = {
        email,
        name,
        subscribedAt: new Date().toISOString(),
        tags,
        preferences: {
          dailyAffirmations: true,
          newFeatures: true,
          promotions: false,
          communityUpdates: true,
        },
      };

      // In production, send to SendGrid API
      await this.saveSubscriber(subscriber);

      // Send welcome email
      await this.sendWelcomeEmail(email, name);

      return subscriber;
    } catch (error) {
      console.error("Failed to subscribe email:", error);
      return null;
    }
  },

  async saveSubscriber(subscriber: EmailSubscriber) {
    try {
      const subscribers = await this.getSubscribers();
      const existingIndex = subscribers.findIndex((s) => s.email === subscriber.email);

      if (existingIndex > -1) {
        subscribers[existingIndex] = subscriber;
      } else {
        subscribers.push(subscriber);
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
    } catch (error) {
      console.error("Failed to save subscriber:", error);
    }
  },

  async getSubscribers(): Promise<EmailSubscriber[]> {
    try {
      const subscribers = await AsyncStorage.getItem(STORAGE_KEY);
      return subscribers ? JSON.parse(subscribers) : [];
    } catch (error) {
      console.error("Failed to get subscribers:", error);
      return [];
    }
  },

  async unsubscribeEmail(email: string) {
    try {
      const subscribers = await this.getSubscribers();
      const filtered = subscribers.filter((s) => s.email !== email);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Failed to unsubscribe:", error);
    }
  },

  async updatePreferences(email: string, preferences: Partial<EmailSubscriber["preferences"]>) {
    try {
      const subscribers = await this.getSubscribers();
      const subscriber = subscribers.find((s) => s.email === email);

      if (subscriber) {
        subscriber.preferences = { ...subscriber.preferences, ...preferences };
        await this.saveSubscriber(subscriber);
      }
    } catch (error) {
      console.error("Failed to update preferences:", error);
    }
  },

  async sendWelcomeEmail(email: string, name: string) {
    try {
      const affirmation = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];

      const emailData = {
        to: email,
        subject: "Welcome to Kingdom Executor Studio",
        template: "welcome",
        data: {
          name,
          affirmation,
          dashboardUrl: "https://kingdom-executor.com/dashboard",
        },
      };

      // In production, call SendGrid API
      console.log("Sending welcome email:", emailData);
      return true;
    } catch (error) {
      console.error("Failed to send welcome email:", error);
      return false;
    }
  },

  async sendDailyAffirmation(email: string) {
    try {
      const affirmation = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];

      const emailData = {
        to: email,
        subject: "✨ Your Daily Affirmation",
        template: "daily_affirmation",
        data: {
          affirmation,
        },
      };

      console.log("Sending daily affirmation:", emailData);
      return true;
    } catch (error) {
      console.error("Failed to send affirmation:", error);
      return false;
    }
  },

  async sendFeatureAnnouncement(email: string, feature: string, description: string) {
    try {
      const emailData = {
        to: email,
        subject: `🎉 New Feature: ${feature}`,
        template: "feature_announcement",
        data: {
          feature,
          description,
        },
      };

      console.log("Sending feature announcement:", emailData);
      return true;
    } catch (error) {
      console.error("Failed to send announcement:", error);
      return false;
    }
  },

  async sendPromotionalEmail(email: string, offer: string, discount: number) {
    try {
      const emailData = {
        to: email,
        subject: `🎁 Exclusive Offer: ${offer}`,
        template: "promotional",
        data: {
          offer,
          discount,
        },
      };

      console.log("Sending promotional email:", emailData);
      return true;
    } catch (error) {
      console.error("Failed to send promotional email:", error);
      return false;
    }
  },

  getRandomAffirmation(): string {
    return AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
  },

  getAllAffirmations(): string[] {
    return AFFIRMATIONS;
  },
};
