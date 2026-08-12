import { describe, expect, it } from "vitest";

import {
  THOUGHT2PONDER_SOCIAL_DESTINATIONS,
  socialPublicationPreflight,
} from "../lib/social/thought2ponder-social-destinations";

describe("Thought2Ponder social destinations", () => {
  it("records browser-verified ownership separately from blocked provider linkage", () => {
    expect(THOUGHT2PONDER_SOCIAL_DESTINATIONS.map((destination) => destination.handle)).toEqual([
      "@thought2ponder06",
      "@thought2ponder",
    ]);
    expect(THOUGHT2PONDER_SOCIAL_DESTINATIONS[0].evidenceStatus).toBe("TESTED");
    expect(THOUGHT2PONDER_SOCIAL_DESTINATIONS[1].evidenceStatus).toBe("BLOCKED");
    expect(THOUGHT2PONDER_SOCIAL_DESTINATIONS[0].blockingReason).toContain("MCP connector remains unlinked");
  });

  it("classifies publication as L3 and never executes it during preflight", () => {
    const preflight = socialPublicationPreflight(THOUGHT2PONDER_SOCIAL_DESTINATIONS[0], "content/approved-reel-001");

    expect(preflight.input.riskLevel).toBe("L3");
    expect(preflight.approvalRequired).toBe(true);
    expect(preflight.executionPermitted).toBe(false);
  });
});
