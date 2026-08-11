import * as SecureStore from 'expo-secure-store';

/**
 * Admin Authentication & Access Control Service
 * Manages admin roles, permissions, and dashboard access
 */

export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'analyst';

export interface AdminPermissions {
  canViewAnalytics: boolean;
  canManageUsers: boolean;
  canModerateContent: boolean;
  canManageSubscriptions: boolean;
  canViewFinancials: boolean;
  canManageAdmins: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: AdminPermissions;
  lastLogin: Date;
  createdAt: Date;
}

export class AdminAuthService {
  private static currentAdmin: AdminUser | null = null;
  private static adminToken: string | null = null;

  /**
   * Get role-based permissions
   */
  static getRolePermissions(role: AdminRole): AdminPermissions {
    const permissionMap: Record<AdminRole, AdminPermissions> = {
      super_admin: {
        canViewAnalytics: true,
        canManageUsers: true,
        canModerateContent: true,
        canManageSubscriptions: true,
        canViewFinancials: true,
        canManageAdmins: true,
      },
      admin: {
        canViewAnalytics: true,
        canManageUsers: true,
        canModerateContent: true,
        canManageSubscriptions: true,
        canViewFinancials: true,
        canManageAdmins: false,
      },
      moderator: {
        canViewAnalytics: false,
        canManageUsers: false,
        canModerateContent: true,
        canManageSubscriptions: false,
        canViewFinancials: false,
        canManageAdmins: false,
      },
      analyst: {
        canViewAnalytics: true,
        canManageUsers: false,
        canModerateContent: false,
        canManageSubscriptions: false,
        canViewFinancials: true,
        canManageAdmins: false,
      },
    };

    return permissionMap[role];
  }

  /**
   * Admin login
   */
  static async login(email: string, password: string): Promise<AdminUser> {
    try {
      // TODO: Integrate with backend authentication
      // This is a placeholder implementation

      // Validate credentials
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Mock admin user for demonstration
      const mockAdmin: AdminUser = {
        id: 'admin_001',
        email: email,
        name: 'Admin User',
        role: 'super_admin',
        permissions: this.getRolePermissions('super_admin'),
        lastLogin: new Date(),
        createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      };

      // Store token securely
      const token = `admin_token_${Date.now()}`;
      await SecureStore.setItemAsync('admin_token', token);
      await SecureStore.setItemAsync('admin_user', JSON.stringify(mockAdmin));

      this.currentAdmin = mockAdmin;
      this.adminToken = token;

      return mockAdmin;
    } catch (error) {
      console.error('Admin login error:', error);
      throw error;
    }
  }

  /**
   * Admin logout
   */
  static async logout(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync('admin_token');
      await SecureStore.deleteItemAsync('admin_user');
      this.currentAdmin = null;
      this.adminToken = null;
    } catch (error) {
      console.error('Admin logout error:', error);
      throw error;
    }
  }

  /**
   * Get current admin user
   */
  static async getCurrentAdmin(): Promise<AdminUser | null> {
    try {
      if (this.currentAdmin) {
        return this.currentAdmin;
      }

      const userJson = await SecureStore.getItemAsync('admin_user');
      if (userJson) {
        this.currentAdmin = JSON.parse(userJson);
        return this.currentAdmin;
      }

      return null;
    } catch (error) {
      console.error('Error getting current admin:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  static async isAuthenticated(): Promise<boolean> {
    try {
      const token = await SecureStore.getItemAsync('admin_token');
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  /**
   * Check if admin has permission
   */
  static async hasPermission(permission: keyof AdminPermissions): Promise<boolean> {
    try {
      const admin = await this.getCurrentAdmin();
      if (!admin) {
        return false;
      }

      return admin.permissions[permission] || false;
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }

  /**
   * Check if admin has role
   */
  static async hasRole(role: AdminRole | AdminRole[]): Promise<boolean> {
    try {
      const admin = await this.getCurrentAdmin();
      if (!admin) {
        return false;
      }

      if (Array.isArray(role)) {
        return role.includes(admin.role);
      }

      return admin.role === role;
    } catch (error) {
      console.error('Error checking role:', error);
      return false;
    }
  }

  /**
   * Get admin token
   */
  static async getToken(): Promise<string | null> {
    try {
      if (this.adminToken) {
        return this.adminToken;
      }

      const token = await SecureStore.getItemAsync('admin_token');
      if (token) {
        this.adminToken = token;
        return token;
      }

      return null;
    } catch (error) {
      console.error('Error getting admin token:', error);
      return null;
    }
  }

  /**
   * Validate admin token
   */
  static async validateToken(token: string): Promise<boolean> {
    try {
      // TODO: Integrate with backend token validation
      // This is a placeholder implementation

      return token.startsWith('admin_token_');
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }

  /**
   * Refresh admin session
   */
  static async refreshSession(): Promise<AdminUser | null> {
    try {
      const admin = await this.getCurrentAdmin();
      if (!admin) {
        return null;
      }

      // Update last login
      admin.lastLogin = new Date();
      await SecureStore.setItemAsync('admin_user', JSON.stringify(admin));
      this.currentAdmin = admin;

      return admin;
    } catch (error) {
      console.error('Error refreshing session:', error);
      return null;
    }
  }

  /**
   * Get admin activity log
   */
  static async getActivityLog(limit: number = 50): Promise<Array<any>> {
    try {
      // TODO: Integrate with backend activity logging
      // This is a placeholder implementation

      const activity = [
        {
          id: 1,
          admin: 'Admin User',
          action: 'Viewed Analytics Dashboard',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
        },
        {
          id: 2,
          admin: 'Admin User',
          action: 'Moderated community post',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
        },
        {
          id: 3,
          admin: 'Admin User',
          action: 'Updated subscription settings',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
        },
      ];

      return activity.slice(0, Math.max(0, limit));
    } catch (error) {
      console.error('Error getting activity log:', error);
      return [];
    }
  }
}
