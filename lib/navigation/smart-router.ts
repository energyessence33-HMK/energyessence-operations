/**
 * Smart Router - Intelligent Navigation System
 * Provides context-aware routing with smart rules and premium UX
 */

import { stateManager } from "@/lib/services/state-manager";

export type NavigationRoute = 
  | "dashboard"
  | "spiritual-identity"
  | "brand-studio"
  | "video-generator"
  | "psychology-module"
  | "learn-grow"
  | "monetize"
  | "onboarding"
  | "login";

interface NavigationRule {
  name: string;
  condition: () => Promise<boolean>;
  route: NavigationRoute;
  priority: number;
}

interface UserContext {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  hasSpiritualProfile: boolean;
  hasBrandIdentity: boolean;
  hasActiveWorkflows: boolean;
  learningProgress: number;
  monetizationScore: number;
}

class SmartRouter {
  /**
   * Navigation rules that determine optimal next screen
   * Higher priority = checked first
   */
  private navigationRules: NavigationRule[] = [
    {
      name: "Unauthenticated User",
      condition: async () => {
        const state = await stateManager.loadState();
        return !state.user;
      },
      route: "login",
      priority: 100,
    },
    {
      name: "First Time User - Onboarding",
      condition: async () => {
        const state = await stateManager.loadState();
        const hasProfile = state.spiritualProfile && state.spiritualProfile.purposeStatement;
        return !hasProfile;
      },
      route: "onboarding",
      priority: 90,
    },
    {
      name: "Missing Spiritual Identity",
      condition: async () => {
        const state = await stateManager.loadState();
        const score = state.spiritualProfile?.alignmentScore || 0;
        return score === 0;
      },
      route: "spiritual-identity",
      priority: 80,
    },
    {
      name: "Missing Brand Identity",
      condition: async () => {
        const state = await stateManager.loadState();
        const hasBrand = state.brandIdentity && state.brandIdentity.brandName;
        return !hasBrand;
      },
      route: "brand-studio",
      priority: 70,
    },
    {
      name: "Active Workflows - Show Dashboard",
      condition: async () => {
        const state = await stateManager.loadState();
        const workflows = state.workflows || [];
        return workflows.length > 0;
      },
      route: "dashboard",
      priority: 60,
    },
    {
      name: "Learning Path - Suggest Learn & Grow",
      condition: async () => {
        const state = await stateManager.loadState();
        const completed = state.learningProgress?.completedCourses?.length || 0;
        return completed < 3;
      },
      route: "learn-grow",
      priority: 50,
    },
    {
      name: "Monetization Focus",
      condition: async () => {
        const state = await stateManager.loadState();
        const revenue = state.monetization?.monthlyRevenue || 0;
        return revenue === 0;
      },
      route: "monetize",
      priority: 40,
    },
    {
      name: "Default - Dashboard",
      condition: async () => true,
      route: "dashboard",
      priority: 0,
    },
  ];

  /**
   * Get user context for smart routing decisions
   */
  async getUserContext(): Promise<UserContext> {
    const state = await stateManager.loadState();

    return {
      isAuthenticated: !!state.user,
      hasCompletedOnboarding: !!state.spiritualProfile?.purposeStatement,
      hasSpiritualProfile: (state.spiritualProfile?.alignmentScore || 0) > 0,
      hasBrandIdentity: !!state.brandIdentity?.brandName,
      hasActiveWorkflows: (state.workflows || []).filter((w: any) => w.status === "active").length > 0,
      learningProgress: state.learningProgress?.completedCourses?.length || 0,
      monetizationScore: state.monetization?.monthlyRevenue || 0,
    };
  }

  /**
   * Determine the optimal next route based on user state
   */
  async getOptimalRoute(): Promise<NavigationRoute> {
    // Sort rules by priority (highest first)
    const sortedRules = [...this.navigationRules].sort(
      (a, b) => b.priority - a.priority
    );

    // Evaluate each rule in priority order
    for (const rule of sortedRules) {
      try {
        const conditionMet = await rule.condition();
        if (conditionMet) {
          console.log(`[SmartRouter] Route selected: ${rule.name} → ${rule.route}`);
          return rule.route;
        }
      } catch (error) {
        console.error(`[SmartRouter] Error evaluating rule "${rule.name}":`, error);
      }
    }

    // Fallback to dashboard
    return "dashboard";
  }

  /**
   * Get recommended next action based on user progress
   */
  async getRecommendedAction(): Promise<{
    title: string;
    description: string;
    route: NavigationRoute;
    icon: string;
    urgency: "high" | "medium" | "low";
  } | null> {
    const context = await this.getUserContext();

    // High urgency: Complete onboarding
    if (!context.hasCompletedOnboarding) {
      return {
        title: "Complete Your Spiritual Identity",
        description: "Establish your core values and purpose foundation",
        route: "spiritual-identity",
        icon: "sparkles",
        urgency: "high",
      };
    }

    // High urgency: Create brand identity
    if (!context.hasBrandIdentity) {
      return {
        title: "Build Your Brand Identity",
        description: "Create your professional brand with AI tools",
        route: "brand-studio",
        icon: "square.grid.2x2",
        urgency: "high",
      };
    }

    // Medium urgency: Start learning
    if (context.learningProgress < 2) {
      return {
        title: "Start Your Learning Journey",
        description: "Master elite branding and monetization strategies",
        route: "learn-grow",
        icon: "checkmark.circle",
        urgency: "medium",
      };
    }

    // Medium urgency: Create first video
    if (context.hasActiveWorkflows) {
      return {
        title: "Generate Your First Video",
        description: "Create professional 1-minute promotional videos",
        route: "video-generator",
        icon: "paperplane.fill",
        urgency: "medium",
      };
    }

    // Low urgency: Monetization
    if (context.monetizationScore === 0) {
      return {
        title: "Start Getting Paid 2 Exist",
        description: "Activate your revenue streams and scale",
        route: "monetize",
        icon: "calendar",
        urgency: "low",
      };
    }

    return null;
  }

  /**
   * Check if user can access a specific route
   */
  async canAccessRoute(route: NavigationRoute): Promise<boolean> {
    const context = await this.getUserContext();

    // Authentication check
    if (route !== "login" && !context.isAuthenticated) {
      return false;
    }

    // Route-specific access rules
    const accessRules: Record<NavigationRoute, boolean> = {
      login: true,
      onboarding: context.isAuthenticated,
      dashboard: context.isAuthenticated && context.hasCompletedOnboarding,
      "spiritual-identity": context.isAuthenticated,
      "brand-studio": context.isAuthenticated && context.hasSpiritualProfile,
      "video-generator": context.isAuthenticated && context.hasBrandIdentity,
      "psychology-module": context.isAuthenticated && context.hasBrandIdentity,
      "learn-grow": context.isAuthenticated && context.hasCompletedOnboarding,
      monetize: context.isAuthenticated && context.hasBrandIdentity,
    };

    return accessRules[route] ?? true;
  }

  /**
   * Get navigation breadcrumb for current route
   */
  getBreadcrumb(route: NavigationRoute): string[] {
    const breadcrumbs: Record<NavigationRoute, string[]> = {
      login: ["Login"],
      onboarding: ["Onboarding"],
      dashboard: ["Home"],
      "spiritual-identity": ["Home", "Spiritual Identity"],
      "brand-studio": ["Home", "Brand Studio"],
      "video-generator": ["Home", "Video Generator"],
      "psychology-module": ["Home", "Psychology"],
      "learn-grow": ["Home", "Learn & Grow"],
      monetize: ["Home", "Monetize"],
    };

    return breadcrumbs[route] ?? ["Home"];
  }

  /**
   * Get suggested routes based on current route
   */
  getSuggestedRoutes(currentRoute: NavigationRoute): NavigationRoute[] {
    const suggestions: Record<NavigationRoute, NavigationRoute[]> = {
      login: ["onboarding"],
      onboarding: ["spiritual-identity"],
      "spiritual-identity": ["brand-studio"],
      "brand-studio": ["video-generator"],
      "video-generator": ["psychology-module"],
      "psychology-module": ["learn-grow"],
      "learn-grow": ["monetize"],
      monetize: ["dashboard"],
      dashboard: ["video-generator", "learn-grow", "monetize"],
    };

    return suggestions[currentRoute] ?? [];
  }

  /**
   * Track navigation event for analytics
   */
  async trackNavigation(
    fromRoute: NavigationRoute,
    toRoute: NavigationRoute,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      await stateManager.updateState("lastSyncTime", new Date().toISOString());
      console.log(`[Navigation] ${fromRoute} → ${toRoute}`, metadata);
    } catch (error) {
      console.error("[Navigation] Tracking error:", error);
    }
  }
}

export const smartRouter = new SmartRouter();
