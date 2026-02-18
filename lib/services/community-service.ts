import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  category: "success_story" | "question" | "tip" | "achievement";
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityComment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  likes: number;
  createdAt: string;
}

export interface UserAchievement {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  description: string;
  badge: string;
  earnedAt: string;
  visibility: "public" | "private";
}

const STORAGE_KEYS = {
  POSTS: "community_posts",
  COMMENTS: "community_comments",
  ACHIEVEMENTS: "user_achievements",
};

const ACHIEVEMENT_BADGES = {
  first_video: {
    title: "First Creator",
    description: "Created your first video",
    icon: "🎬",
  },
  ten_videos: {
    title: "Content Machine",
    description: "Created 10 videos",
    icon: "🚀",
  },
  hundred_views: {
    title: "Viral Spark",
    description: "Reached 100 views",
    icon: "⚡",
  },
  thousand_views: {
    title: "Influence Builder",
    description: "Reached 1,000 views",
    icon: "👑",
  },
  first_earnings: {
    title: "Monetized",
    description: "Earned your first dollar",
    icon: "💰",
  },
  community_helper: {
    title: "Community Champion",
    description: "Helped 10 community members",
    icon: "🤝",
  },
  elite_subscriber: {
    title: "Elite Member",
    description: "Subscribed to Elite tier",
    icon: "✨",
  },
};

export const CommunityService = {
  async createPost(
    userId: string,
    userName: string,
    title: string,
    content: string,
    category: CommunityPost["category"],
    tags: string[] = []
  ): Promise<CommunityPost> {
    const post: CommunityPost = {
      id: "post_" + Date.now(),
      userId,
      userName,
      title,
      content,
      category,
      tags,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const posts = await this.getPosts();
      posts.push(post);
      await AsyncStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch (error) {
      console.error("Failed to create post:", error);
    }

    return post;
  },

  async getPosts(category?: CommunityPost["category"]): Promise<CommunityPost[]> {
    try {
      const posts = await AsyncStorage.getItem(STORAGE_KEYS.POSTS);
      const allPosts = posts ? JSON.parse(posts) : [];

      if (category) {
        return allPosts.filter((p: CommunityPost) => p.category === category);
      }

      return allPosts.sort(
        (a: CommunityPost, b: CommunityPost) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error("Failed to get posts:", error);
      return [];
    }
  },

  async getPostById(postId: string): Promise<CommunityPost | null> {
    try {
      const posts = await this.getPosts();
      return posts.find((p) => p.id === postId) || null;
    } catch (error) {
      console.error("Failed to get post:", error);
      return null;
    }
  },

  async likePost(postId: string): Promise<boolean> {
    try {
      const posts = await this.getPosts();
      const post = posts.find((p) => p.id === postId);

      if (post) {
        post.likes += 1;
        post.updatedAt = new Date().toISOString();
        await AsyncStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Failed to like post:", error);
      return false;
    }
  },

  async addComment(
    postId: string,
    userId: string,
    userName: string,
    content: string
  ): Promise<CommunityComment | null> {
    try {
      const comment: CommunityComment = {
        id: "comment_" + Date.now(),
        postId,
        userId,
        userName,
        content,
        likes: 0,
        createdAt: new Date().toISOString(),
      };

      const posts = await this.getPosts();
      const post = posts.find((p) => p.id === postId);

      if (post) {
        post.comments += 1;
        post.updatedAt = new Date().toISOString();
        await AsyncStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));

        const comments = await this.getComments();
        comments.push(comment);
        await AsyncStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));

        return comment;
      }

      return null;
    } catch (error) {
      console.error("Failed to add comment:", error);
      return null;
    }
  },

  async getComments(postId?: string): Promise<CommunityComment[]> {
    try {
      const comments = await AsyncStorage.getItem(STORAGE_KEYS.COMMENTS);
      const allComments = comments ? JSON.parse(comments) : [];

      if (postId) {
        return allComments.filter((c: CommunityComment) => c.postId === postId);
      }

      return allComments;
    } catch (error) {
      console.error("Failed to get comments:", error);
      return [];
    }
  },

  async addAchievement(
    userId: string,
    userName: string,
    achievementKey: keyof typeof ACHIEVEMENT_BADGES,
    visibility: "public" | "private" = "public"
  ): Promise<UserAchievement | null> {
    try {
      const badge = ACHIEVEMENT_BADGES[achievementKey];

      if (!badge) {
        console.error("Achievement not found");
        return null;
      }

      const achievement: UserAchievement = {
        id: "achievement_" + Date.now(),
        userId,
        userName,
        title: badge.title,
        description: badge.description,
        badge: badge.icon,
        earnedAt: new Date().toISOString(),
        visibility,
      };

      const achievements = await this.getAchievements();
      achievements.push(achievement);
      await AsyncStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));

      return achievement;
    } catch (error) {
      console.error("Failed to add achievement:", error);
      return null;
    }
  },

  async getAchievements(userId?: string): Promise<UserAchievement[]> {
    try {
      const achievements = await AsyncStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      const allAchievements = achievements ? JSON.parse(achievements) : [];

      if (userId) {
        return allAchievements.filter(
          (a: UserAchievement) => a.userId === userId && a.visibility === "public"
        );
      }

      return allAchievements.filter((a: UserAchievement) => a.visibility === "public");
    } catch (error) {
      console.error("Failed to get achievements:", error);
      return [];
    }
  },

  async getUserStats(userId: string) {
    try {
      const posts = await this.getPosts();
      const achievements = await this.getAchievements(userId);

      const userPosts = posts.filter((p) => p.userId === userId);
      const totalLikes = userPosts.reduce((sum, p) => sum + p.likes, 0);
      const totalComments = userPosts.reduce((sum, p) => sum + p.comments, 0);

      return {
        postsCreated: userPosts.length,
        totalLikes,
        totalComments,
        achievementsEarned: achievements.length,
      };
    } catch (error) {
      console.error("Failed to get user stats:", error);
      return {
        postsCreated: 0,
        totalLikes: 0,
        totalComments: 0,
        achievementsEarned: 0,
      };
    }
  },

  getAchievementBadges() {
    return ACHIEVEMENT_BADGES;
  },
};
