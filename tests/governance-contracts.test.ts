import { describe, expect, it } from "vitest";

import { initialExecutionStatus, requiresHumanApproval } from "../lib/gateway/execution-models";
import { GOVERNED_INTEGRATIONS, IntegrationRegistry } from "../lib/gateway/integration-registry";

describe("governance contracts", () => {
  it("requires human approval for consequential external actions", () => {
    expect(requiresHumanApproval("L0")).toBe(false);
    expect(requiresHumanApproval("L2")).toBe(false);
    expect(requiresHumanApproval("L3")).toBe(true);
    expect(requiresHumanApproval("L4")).toBe(true);
    expect(initialExecutionStatus("L3")).toBe("awaiting_approval");
  });

  it("keeps the integration registry declarative until adapters are registered", () => {
    const registry = new IntegrationRegistry();
    expect(registry.listDefinitions()).toEqual(GOVERNED_INTEGRATIONS);
    expect(registry.listRegistered()).toHaveLength(0);
    expect(registry.get("shopify")).toBeUndefined();
  });
});
