/**
 * Deprecated client-side administration facade.
 *
 * Privileged access must be determined by the authenticated server context
 * (Manus OAuth user role plus protected procedures), never by a locally minted
 * SecureStore token. This facade intentionally fails closed until a server
 * approval API is wired to the governance domain.
 */

export type AdminRole = "super_admin" | "admin" | "moderator" | "analyst";

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

const ACCESS_DISABLED = "Client-side admin authentication is disabled. Use the authenticated server governance API.";

export class AdminAuthService {
  static getRolePermissions(_role: AdminRole): AdminPermissions {
    return {
      canViewAnalytics: false,
      canManageUsers: false,
      canModerateContent: false,
      canManageSubscriptions: false,
      canViewFinancials: false,
      canManageAdmins: false,
    };
  }

  static async login(_email: string, _password: string): Promise<AdminUser> {
    throw new Error(ACCESS_DISABLED);
  }

  static async logout(): Promise<void> {
    // No local authority or token exists to clear.
  }

  static async getCurrentAdmin(): Promise<AdminUser | null> {
    return null;
  }

  static async isAuthenticated(): Promise<boolean> {
    return false;
  }

  static async hasPermission(_permission: keyof AdminPermissions): Promise<boolean> {
    return false;
  }

  static async hasRole(_role: AdminRole | AdminRole[]): Promise<boolean> {
    return false;
  }

  static async getToken(): Promise<string | null> {
    return null;
  }

  static async validateToken(_token: string): Promise<boolean> {
    return false;
  }

  static async refreshSession(): Promise<AdminUser | null> {
    return null;
  }

  static async getActivityLog(_limit: number = 50): Promise<Array<never>> {
    return [];
  }
}
