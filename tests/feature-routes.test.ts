import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../server/db", () => ({
  listWorkflowsForUser: vi.fn(),
  createWorkflowForUser: vi.fn(),
  listScheduledPostsForUser: vi.fn(),
  listEcosystemsForUser: vi.fn(),
}));

import { appRouter } from "../server/routers";
import * as db from "../server/db";
import type { TrpcContext } from "../server/_core/context";

function createAuthenticatedContext(): TrpcContext {
  return {
    user: {
      id: 42,
      openId: "governed-user",
      name: "Governed User",
      email: "governed@example.com",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("feature routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads dashboard data strictly for the authenticated user", async () => {
    const workflows = [{ id: 1, title: "Governed workflow" }];
    const posts = [{ id: 2, content: "Governed post" }];
    const ecosystems = [{ id: 3, name: "Essence Pulse" }];
    vi.mocked(db.listWorkflowsForUser).mockResolvedValue(workflows as never);
    vi.mocked(db.listScheduledPostsForUser).mockResolvedValue(posts as never);
    vi.mocked(db.listEcosystemsForUser).mockResolvedValue(ecosystems as never);

    const caller = appRouter.createCaller(createAuthenticatedContext());
    await expect(caller.workflows.list()).resolves.toEqual(workflows);
    await expect(caller.scheduledPosts.list()).resolves.toEqual(posts);
    await expect(caller.ecosystems.list()).resolves.toEqual(ecosystems);
    expect(db.listWorkflowsForUser).toHaveBeenCalledWith(42);
    expect(db.listScheduledPostsForUser).toHaveBeenCalledWith(42);
    expect(db.listEcosystemsForUser).toHaveBeenCalledWith(42);
  });

  it("validates and creates only a scoped workflow payload", async () => {
    vi.mocked(db.createWorkflowForUser).mockResolvedValue({ created: true });
    const caller = appRouter.createCaller(createAuthenticatedContext());

    await expect(caller.workflows.create({
      title: "  Prepare connector reconciliation  ",
      priority: "high",
      description: "Read-only reconciliation before approval-gated updates.",
    })).resolves.toEqual({ created: true });

    expect(db.createWorkflowForUser).toHaveBeenCalledWith(42, {
      title: "Prepare connector reconciliation",
      priority: "high",
      description: "Read-only reconciliation before approval-gated updates.",
    });
  });

  it("publishes declarative provider metadata without exposing a credential", async () => {
    const caller = appRouter.createCaller(createAuthenticatedContext());
    const integrations = await caller.integrations.registry();

    expect(integrations.map((integration) => integration.id)).toEqual(
      expect.arrayContaining(["github", "shopify", "slack", "notion"]),
    );
    expect(integrations.every((integration) => (
      !("apiKey" in integration) &&
      !("secret" in integration) &&
      !("token" in integration)
    ))).toBe(true);
  });
});
