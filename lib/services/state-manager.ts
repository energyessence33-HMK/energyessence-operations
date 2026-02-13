import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Application State Manager
 * Handles local persistence with AsyncStorage and optional backend sync
 */

export interface AppState {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  } | null;
  activeEcosystem: {
    id: string;
    name: string;
  } | null;
  spiritualProfile: {
    coreValues: string[];
    purposeStatement: string;
    alignmentScore: number;
    lastCheckIn: string;
  };
  brandIdentity: {
    brandName: string;
    tagline: string;
    colors: Record<string, string>;
    voiceAndTone: string;
    targetAudience: string;
  };
  videos: Array<{
    id: string;
    title: string;
    duration: "1_min" | "3_min";
    status: "draft" | "processing" | "completed" | "failed";
    script: string;
    url?: string;
    createdAt: string;
  }>;
  workflows: Array<{
    id: string;
    title: string;
    status: "active" | "completed" | "paused";
    dependencies: string[];
    createdAt: string;
  }>;
  scheduledPosts: Array<{
    id: string;
    content: string;
    scheduledTime: string;
    platforms: string[];
    status: "scheduled" | "published" | "failed";
  }>;
  learningProgress: {
    completedCourses: string[];
    currentCourse?: string;
    badges: string[];
  };
  monetization: {
    activeStreams: string[];
    monthlyRevenue: number;
    projectedRevenue: number;
  };
  lastSyncTime: string;
}

class StateManager {
  private static readonly STORAGE_KEY = "kingdom_executor_state";
  private static readonly SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutes
  private syncTimer: ReturnType<typeof setInterval> | null = null;

  /**
   * Initialize default app state
   */
  private getDefaultState(): AppState {
    return {
      user: null,
      activeEcosystem: null,
      spiritualProfile: {
        coreValues: [],
        purposeStatement: "",
        alignmentScore: 0,
        lastCheckIn: new Date().toISOString(),
      },
      brandIdentity: {
        brandName: "",
        tagline: "",
        colors: {},
        voiceAndTone: "",
        targetAudience: "",
      },
      videos: [],
      workflows: [],
      scheduledPosts: [],
      learningProgress: {
        completedCourses: [],
        badges: [],
      },
      monetization: {
        activeStreams: [],
        monthlyRevenue: 0,
        projectedRevenue: 0,
      },
      lastSyncTime: new Date().toISOString(),
    };
  }

  /**
   * Load state from AsyncStorage
   */
  async loadState(): Promise<AppState> {
    try {
      const stored = await AsyncStorage.getItem(StateManager.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return this.getDefaultState();
    } catch (error) {
      console.error("Error loading state:", error);
      return this.getDefaultState();
    }
  }

  /**
   * Save state to AsyncStorage
   */
  async saveState(state: AppState): Promise<void> {
    try {
      state.lastSyncTime = new Date().toISOString();
      await AsyncStorage.setItem(
        StateManager.STORAGE_KEY,
        JSON.stringify(state)
      );
    } catch (error) {
      console.error("Error saving state:", error);
    }
  }

  /**
   * Update specific state section
   */
  async updateState<K extends keyof AppState>(
    key: K,
    value: AppState[K]
  ): Promise<AppState> {
    const state = await this.loadState();
    state[key] = value;
    await this.saveState(state);
    return state;
  }

  /**
   * Add video to state
   */
  async addVideo(video: AppState["videos"][0]): Promise<void> {
    const state = await this.loadState();
    state.videos.push(video);
    await this.saveState(state);
  }

  /**
   * Update video status
   */
  async updateVideoStatus(
    videoId: string,
    status: AppState["videos"][0]["status"],
    url?: string
  ): Promise<void> {
    const state = await this.loadState();
    const video = state.videos.find((v) => v.id === videoId);
    if (video) {
      video.status = status;
      if (url) video.url = url;
      await this.saveState(state);
    }
  }

  /**
   * Add workflow task
   */
  async addWorkflow(workflow: AppState["workflows"][0]): Promise<void> {
    const state = await this.loadState();
    state.workflows.push(workflow);
    await this.saveState(state);
  }

  /**
   * Update workflow status
   */
  async updateWorkflowStatus(
    workflowId: string,
    status: AppState["workflows"][0]["status"]
  ): Promise<void> {
    const state = await this.loadState();
    const workflow = state.workflows.find((w) => w.id === workflowId);
    if (workflow) {
      workflow.status = status;
      await this.saveState(state);
    }
  }

  /**
   * Add scheduled post
   */
  async addScheduledPost(post: AppState["scheduledPosts"][0]): Promise<void> {
    const state = await this.loadState();
    state.scheduledPosts.push(post);
    await this.saveState(state);
  }

  /**
   * Get active workflows count
   */
  async getActiveWorkflowCount(): Promise<number> {
    const state = await this.loadState();
    return state.workflows.filter((w) => w.status === "active").length;
  }

  /**
   * Update spiritual profile
   */
  async updateSpiritualProfile(
    profile: Partial<AppState["spiritualProfile"]>
  ): Promise<void> {
    const state = await this.loadState();
    state.spiritualProfile = { ...state.spiritualProfile, ...profile };
    await this.saveState(state);
  }

  /**
   * Update brand identity
   */
  async updateBrandIdentity(
    identity: Partial<AppState["brandIdentity"]>
  ): Promise<void> {
    const state = await this.loadState();
    state.brandIdentity = { ...state.brandIdentity, ...identity };
    await this.saveState(state);
  }

  /**
   * Update monetization data
   */
  async updateMonetization(
    monetization: Partial<AppState["monetization"]>
  ): Promise<void> {
    const state = await this.loadState();
    state.monetization = { ...state.monetization, ...monetization };
    await this.saveState(state);
  }

  /**
   * Complete course
   */
  async completeCourse(courseId: string): Promise<void> {
    const state = await this.loadState();
    if (!state.learningProgress.completedCourses.includes(courseId)) {
      state.learningProgress.completedCourses.push(courseId);
    }
    await this.saveState(state);
  }

  /**
   * Add badge
   */
  async addBadge(badgeId: string): Promise<void> {
    const state = await this.loadState();
    if (!state.learningProgress.badges.includes(badgeId)) {
      state.learningProgress.badges.push(badgeId);
    }
    await this.saveState(state);
  }

  /**
   * Sync state with backend (optional)
   */
  async syncWithBackend(apiUrl: string, token: string): Promise<boolean> {
    try {
      const state = await this.loadState();

      const response = await fetch(`${apiUrl}/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(state),
      });

      if (response.ok) {
        const syncedState = await response.json();
        await this.saveState(syncedState);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Backend sync error:", error);
      return false;
    }
  }

  /**
   * Start automatic sync
   */
  startAutoSync(apiUrl: string, token: string): void {
    if (this.syncTimer) return;

    this.syncTimer = setInterval(() => {
      this.syncWithBackend(apiUrl, token).catch((error) =>
        console.error("Auto sync failed:", error)
      );
    }, StateManager.SYNC_INTERVAL);
  }

  /**
   * Stop automatic sync
   */
  stopAutoSync(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }

  /**
   * Clear all data (for logout)
   */
  async clearState(): Promise<void> {
    try {
      await AsyncStorage.removeItem(StateManager.STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing state:", error);
    }
  }

  /**
   * Export state as JSON for backup
   */
  async exportState(): Promise<string> {
    const state = await this.loadState();
    return JSON.stringify(state, null, 2);
  }

  /**
   * Import state from JSON
   */
  async importState(jsonString: string): Promise<boolean> {
    try {
      const state = JSON.parse(jsonString) as AppState;
      await this.saveState(state);
      return true;
    } catch (error) {
      console.error("Error importing state:", error);
      return false;
    }
  }
}

export const stateManager = new StateManager();
