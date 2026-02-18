import AsyncStorage from "@react-native-async-storage/async-storage";

export type SubscriptionTier = "free" | "pro" | "elite";

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  price: number;
  billingCycle: "monthly" | "annual";
  description: string;
  features: string[];
  videoLimit: number;
  templateAccess: boolean;
  prioritySupport: boolean;
  communityAccess: boolean;
  analyticsAccess: boolean;
  customBranding: boolean;
}

export interface UserSubscription {
  userId: string;
  tier: SubscriptionTier;
  startDate: string;
  renewalDate: string;
  isActive: boolean;
  autoRenew: boolean;
  paymentMethod?: string;
}

const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  free: {
    tier: "free",
    name: "Starter",
    price: 0,
    billingCycle: "monthly",
    description: "Perfect for getting started",
    features: [
      "2 videos per month",
      "Basic templates",
      "Community access",
      "Email support",
    ],
    videoLimit: 2,
    templateAccess: false,
    prioritySupport: false,
    communityAccess: true,
    analyticsAccess: false,
    customBranding: false,
  },
  pro: {
    tier: "pro",
    name: "Professional",
    price: 29.99,
    billingCycle: "monthly",
    description: "For serious creators",
    features: [
      "Unlimited videos",
      "Advanced templates",
      "Community access",
      "Priority email support",
      "Basic analytics",
      "Custom branding",
    ],
    videoLimit: 999,
    templateAccess: true,
    prioritySupport: true,
    communityAccess: true,
    analyticsAccess: true,
    customBranding: true,
  },
  elite: {
    tier: "elite",
    name: "Elite",
    price: 99.99,
    billingCycle: "monthly",
    description: "For empire builders",
    features: [
      "Unlimited everything",
      "Premium templates",
      "VIP community access",
      "24/7 priority support",
      "Advanced analytics",
      "Full custom branding",
      "API access",
      "White-label options",
      "Dedicated account manager",
    ],
    videoLimit: 999,
    templateAccess: true,
    prioritySupport: true,
    communityAccess: true,
    analyticsAccess: true,
    customBranding: true,
  },
};

const STORAGE_KEY = "user_subscription";

export const SubscriptionService = {
  getPlan(tier: SubscriptionTier): SubscriptionPlan {
    return SUBSCRIPTION_PLANS[tier];
  },

  getAllPlans(): SubscriptionPlan[] {
    return Object.values(SUBSCRIPTION_PLANS);
  },

  async getUserSubscription(): Promise<UserSubscription | null> {
    try {
      const subscription = await AsyncStorage.getItem(STORAGE_KEY);
      return subscription ? JSON.parse(subscription) : null;
    } catch (error) {
      console.error("Failed to get subscription:", error);
      return null;
    }
  },

  async setUserSubscription(subscription: UserSubscription) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
    } catch (error) {
      console.error("Failed to set subscription:", error);
    }
  },

  async upgradeTier(userId: string, newTier: SubscriptionTier) {
    const subscription: UserSubscription = {
      userId,
      tier: newTier,
      startDate: new Date().toISOString(),
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      autoRenew: true,
    };

    await this.setUserSubscription(subscription);
    return subscription;
  },

  async downgradeTier(userId: string, newTier: SubscriptionTier) {
    const subscription: UserSubscription = {
      userId,
      tier: newTier,
      startDate: new Date().toISOString(),
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      autoRenew: true,
    };

    await this.setUserSubscription(subscription);
    return subscription;
  },

  async cancelSubscription(userId: string) {
    const subscription: UserSubscription = {
      userId,
      tier: "free",
      startDate: new Date().toISOString(),
      renewalDate: new Date().toISOString(),
      isActive: false,
      autoRenew: false,
    };

    await this.setUserSubscription(subscription);
    return subscription;
  },

  async hasFeatureAccess(
    tier: SubscriptionTier,
    feature: keyof Omit<SubscriptionPlan, "tier" | "name" | "price" | "billingCycle" | "description" | "features" | "videoLimit">
  ): Promise<boolean> {
    const plan = this.getPlan(tier);
    return plan[feature] as boolean;
  },

  async getVideoLimit(tier: SubscriptionTier): Promise<number> {
    const plan = this.getPlan(tier);
    return plan.videoLimit;
  },

  async getRenewalDate(): Promise<string | null> {
    const subscription = await this.getUserSubscription();
    return subscription?.renewalDate || null;
  },

  async isSubscriptionActive(): Promise<boolean> {
    const subscription = await this.getUserSubscription();
    if (!subscription) return false;

    const renewalDate = new Date(subscription.renewalDate);
    const now = new Date();

    return subscription.isActive && renewalDate > now;
  },

  calculateAnnualSavings(monthlyPrice: number): number {
    return monthlyPrice * 12 * 0.2; // 20% discount for annual billing
  },

  getAnnualPrice(tier: SubscriptionTier): number {
    const plan = this.getPlan(tier);
    if (plan.tier === "free") return 0;
    const monthlyPrice = plan.price;
    const annualPrice = monthlyPrice * 12 * 0.8; // 20% discount
    return Math.round(annualPrice * 100) / 100;
  },
};
