import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: "apple" | "google";
  createdAt: string;
}

const SECURE_STORE_KEYS = {
  USER: "kingdom_user",
  TOKEN: "kingdom_auth_token",
  REFRESH_TOKEN: "kingdom_refresh_token",
};

export const AuthService = {
  async saveUser(user: User) {
    try {
      await SecureStore.setItemAsync(SECURE_STORE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  },

  async getUser(): Promise<User | null> {
    try {
      const user = await SecureStore.getItemAsync(SECURE_STORE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Failed to get user:", error);
      return null;
    }
  },

  async saveToken(token: string, refreshToken?: string) {
    try {
      await SecureStore.setItemAsync(SECURE_STORE_KEYS.TOKEN, token);
      if (refreshToken) {
        await SecureStore.setItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN, refreshToken);
      }
    } catch (error) {
      console.error("Failed to save token:", error);
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(SECURE_STORE_KEYS.TOKEN);
    } catch (error) {
      console.error("Failed to get token:", error);
      return null;
    }
  },

  async signInWithApple(): Promise<User | null> {
    if (Platform.OS !== "ios") {
      console.log("Apple Sign-In only available on iOS");
      return null;
    }

    try {
      const mockUser: User = {
        id: "apple_" + Date.now(),
        email: "user@apple.com",
        name: "Apple User",
        provider: "apple",
        createdAt: new Date().toISOString(),
      };

      await this.saveUser(mockUser);
      await this.saveToken("mock_apple_token_" + Date.now());

      return mockUser;
    } catch (error) {
      console.error("Apple Sign-In error:", error);
      return null;
    }
  },

  async signInWithGoogle(): Promise<User | null> {
    try {
      const mockUser: User = {
        id: "google_" + Date.now(),
        email: "user@gmail.com",
        name: "Google User",
        provider: "google",
        createdAt: new Date().toISOString(),
      };

      await this.saveUser(mockUser);
      await this.saveToken("mock_google_token_" + Date.now());

      return mockUser;
    } catch (error) {
      console.error("Google Sign-In error:", error);
      return null;
    }
  },

  async signOut() {
    try {
      await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.USER);
      await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.TOKEN);
      await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  },

  async isAuthenticated(): Promise<boolean> {
    const user = await this.getUser();
    const token = await this.getToken();
    return !!user && !!token;
  },
};
