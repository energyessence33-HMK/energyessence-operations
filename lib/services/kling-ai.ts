import * as jwt from "jose";

interface KlingVideoRequest {
  prompt: string;
  duration: "1_min" | "3_min";
  style: "professional" | "creative" | "minimal";
  voiceover?: "male" | "female" | "narrator";
}

interface KlingVideoResponse {
  video_id: string;
  status: "processing" | "completed" | "failed";
  url?: string;
  error?: string;
}

class KlingAIService {
  private accessKey: string;
  private secretKey: string;
  private baseUrl = "https://api.klingai.com/v1";

  constructor() {
    this.accessKey = process.env.KLING_ACCESS_KEY || "";
    this.secretKey = process.env.KLING_SECRET_KEY || "";

    if (!this.accessKey || !this.secretKey) {
      console.warn(
        "Kling AI credentials not configured. Video generation will be unavailable."
      );
    }
  }

  /**
   * Generate JWT token for Kling AI API authentication
   * Uses HS256 with 30-minute expiration
   */
  private async generateToken(): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: this.accessKey,
      exp: now + 1800, // 30 minutes
      nbf: now - 5,
    };

    const secret = new TextEncoder().encode(this.secretKey);
    const token = await new jwt.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    return token;
  }

  /**
   * Create a video generation request
   */
  async generateVideo(request: KlingVideoRequest): Promise<KlingVideoResponse> {
    try {
      const token = await this.generateToken();

      const response = await fetch(`${this.baseUrl}/videos/generate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: request.prompt,
          duration: request.duration,
          style: request.style,
          voiceover: request.voiceover || "narrator",
          quality: "high",
          format: "mp4",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          video_id: "",
          status: "failed",
          error: error.message || "Failed to generate video",
        };
      }

      const data = await response.json();
      return {
        video_id: data.video_id,
        status: data.status,
        url: data.url,
      };
    } catch (error) {
      console.error("Kling AI video generation error:", error);
      return {
        video_id: "",
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Check video generation status
   */
  async getVideoStatus(videoId: string): Promise<KlingVideoResponse> {
    try {
      const token = await this.generateToken();

      const response = await fetch(`${this.baseUrl}/videos/${videoId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return {
          video_id: videoId,
          status: "failed",
          error: "Failed to fetch video status",
        };
      }

      const data = await response.json();
      return {
        video_id: videoId,
        status: data.status,
        url: data.url,
      };
    } catch (error) {
      console.error("Kling AI status check error:", error);
      return {
        video_id: videoId,
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Generate professional script from content
   */
  generateScript(
    content: string,
    duration: "1_min" | "3_min"
  ): { script: string; voiceoverDuration: number } {
    // const words = content.split(" ").length; // Word count for duration calculation
    // const targetWords = duration === "1_min" ? 150 : 400; // Approximate words per minute

    // Professional script formatting
    const script = `
[INTRO - 3 seconds]
${content.substring(0, 100)}...

[MAIN CONTENT - ${duration === "1_min" ? "45" : "150"} seconds]
${content}

[CALL TO ACTION - 5 seconds]
Take action now. Learn more at Kingdom Executor.

[OUTRO - 2 seconds]
Transform your brand. Get paid to exist.
    `.trim();

    return {
      script,
      voiceoverDuration: duration === "1_min" ? 60 : 180,
    };
  }

  /**
   * Validate credentials by making a test API call
   */
  async validateCredentials(): Promise<boolean> {
    try {
      const token = await this.generateToken();
      const response = await fetch(`${this.baseUrl}/health`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch (error) {
      console.error("Credential validation failed:", error);
      return false;
    }
  }
}

export const klingAI = new KlingAIService();
export type { KlingVideoRequest, KlingVideoResponse };
