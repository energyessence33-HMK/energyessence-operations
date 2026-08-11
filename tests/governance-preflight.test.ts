import { describe, expect, it, vi } from "vitest";

vi.mock("../server/db", () => ({
  recordAuditEvent: vi.fn(),
  listAuditEventsForActor: vi.fn(),
  decideAuditEvent: vi.fn(),
  listWorkflowsForUser: vi.fn(),
  createWorkflowForUser: vi.fn(),
  listScheduledPostsForUser: vi.fn(),
  listEcosystemsForUser: vi.fn(),
}));

import * as db from "../server/db";
import { governancePreflight } from "../lib/gateway/governance-preflight";
import { appRouter } from "../server/routers";
import type { TrpcContext } from "../server/_core/context";

function context(role: "user" | "admin" = "user"): TrpcContext {
  return {
    user: {
      id: 19,
      openId: "governance-user",
      email: "governance@example.com",
      name: "Governance User",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("governance preflight", () => {
  it("creates a non-executing L3 preflight with an immutable fingerprint", () => {
    const preflight = governancePreflight({
      provider: "Shopify",
      action: "product_update",
      target: "gid://shopify/Product/example",
      riskLevel: "L3",
      summary: "Correct fulfilment metadata after owner review.",
    });

    expect(preflight.approvalRequired).toBe(true);
    expect(preflight.status).toBe("awaiting_approval");
    expect(preflight.executionPermitted).toBe(false);
    expect(preflight.inputHash).toHaveLength(64);
  });

  it("persists a governed request but never runs a provider action", async () => {
    const caller = appRouter.createCaller(context());
    const result = await caller.governance.request({
      provider: "Shopify",
      action: "product_update",
      target: "gid://shopify/Product/example",
      riskLevel: "L3",
      summary: "Correct fulfilment metadata after owner review.",
    });

    expect(result.executionPermitted).toBe(false);
    expect(db.recordAuditEvent).toHaveBeenCalledWith(expect.objectContaining({
      approvalRequired: true,
      status: "awaiting_approval",
      provider: "Shopify",
    }));
  });

  it("allows an approval decision only from an authenticated administrator", async () => {
    await expect(appRouter.createCaller(context()).governance.decide({ eventId: 1, decision: "approved" }))
      .rejects.toThrow("Only an authenticated administrator");

    vi.mocked(db.decideAuditEvent).mockResolvedValue({ updated: true });
    await expect(appRouter.createCaller(context("admin")).governance.decide({ eventId: 1, decision: "approved" }))
      .resolves.toEqual({ updated: true });
  });
});
