import { describe, expect, it } from "vitest";

import { AdminAuthService } from "../lib/services/admin-auth-service";

describe("deprecated client-side admin authentication", () => {
  it("fails closed instead of minting a local privileged identity", async () => {
    await expect(AdminAuthService.login("admin@example.com", "password")).rejects.toThrow(
      "Client-side admin authentication is disabled",
    );
    await expect(AdminAuthService.getCurrentAdmin()).resolves.toBeNull();
    await expect(AdminAuthService.isAuthenticated()).resolves.toBe(false);
  });

  it("does not accept token-shaped values as administrative authority", async () => {
    await expect(AdminAuthService.validateToken("admin_token_123")).resolves.toBe(false);
    await expect(AdminAuthService.hasPermission("canManageAdmins")).resolves.toBe(false);
  });
});
