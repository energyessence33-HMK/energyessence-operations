import { Platform } from "react-native";

export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  url?: string;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "camera",
    color: "#E4405F",
    url: "https://instagram.com",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "music-note",
    color: "#000000",
    url: "https://tiktok.com",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "play-circle",
    color: "#FF0000",
    url: "https://youtube.com",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "facebook",
    color: "#1877F2",
    url: "https://facebook.com",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "twitter",
    color: "#1DA1F2",
    url: "https://twitter.com",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "linkedin",
    color: "#0A66C2",
    url: "https://linkedin.com",
  },
];

export const SocialSharingService = {
  async shareVideo(
    videoUri: string,
    title: string,
    description: string,
    platform?: string
  ) {
    try {
      if (Platform.OS === "web") {
        console.log("Sharing not available on web");
        return false;
      }

      if (platform) {
        return await this.shareToSpecificPlatform(videoUri, title, description, platform);
      }

      // Use native share sheet
      console.log(`Sharing video: ${title}`);
      return true;
    } catch (error) {
      console.error("Failed to share video:", error);
      return false;
    }
  },

  async shareToSpecificPlatform(
    videoUri: string,
    title: string,
    description: string,
    platform: string
  ): Promise<boolean> {
    try {
      const encodedDescription = encodeURIComponent(description);
      const encodedTitle = encodeURIComponent(title);

      const platformUrls: Record<string, string> = {
        instagram: `instagram://share?url=${videoUri}`,
        tiktok: `tiktok://share?url=${videoUri}`,
        facebook: `fb://share?url=${videoUri}&quote=${encodedDescription}`,
        twitter: `twitter://post?message=${encodedTitle}%20${encodedDescription}`,
        linkedin: `linkedin://share?url=${videoUri}`,
        youtube: `youtube://share?url=${videoUri}`,
      };

      const url = platformUrls[platform];
      if (!url) {
        console.log(`Platform ${platform} not supported`);
        return false;
      }

      // In production, use Linking.openURL(url)
      console.log(`Would share to ${platform}: ${url}`);
      return true;
    } catch (error) {
      console.error(`Failed to share to ${platform}:`, error);
      return false;
    }
  },

  async generateShareLink(videoId: string): Promise<string> {
    const baseUrl = "https://kingdom-executor.com/video";
    const shareLink = `${baseUrl}/${videoId}?utm_source=app&utm_medium=share`;
    return shareLink;
  },

  async trackShare(videoId: string, platform: string) {
    return {
      videoId,
      platform,
      timestamp: new Date().toISOString(),
      shareLink: await this.generateShareLink(videoId),
    };
  },

  getPlatformByName(name: string): SocialPlatform | undefined {
    return SOCIAL_PLATFORMS.find((p) => p.name.toLowerCase() === name.toLowerCase());
  },

  getPlatformById(id: string): SocialPlatform | undefined {
    return SOCIAL_PLATFORMS.find((p) => p.id === id);
  },

  getAllPlatforms(): SocialPlatform[] {
    return SOCIAL_PLATFORMS;
  },
};
