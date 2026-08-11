import { describe, expect, it } from "vitest";

import {
  THOUGHT2PONDER_SOCIAL_DESTINATIONS,
  socialPublicationPreflight,
} from "../lib/social/thought2ponder-social-destinations";

describe("Thought2Ponder social destinations", () => {
  it("registers the supplied destinations as blocked until provider linkage is verified", () => {
    expect(THOUGHT2PONDER_SOCIAL_DESTINATIONS.map((destination) => destination.handle)).toEqual([
      "@thought2ponder06",
      "@thought2ponder",
    ]);
    expect(THOUGHT2PONDER_SOCIAL_DESTINATIONS.every((destination) => destination.evidenceStatus === "BLOCKED")).toBe(true);
  });

  it("classifies publication as L3 and never executes it during preflight", () => {
    const preflight = socialPublicationPreflight(THOUGHT2PONDER_SOCIAL_DESTINATIONS[0], "content/approved-reel-001");

    expect(preflight.input.riskLevel).toBe("L3");
    expect(preflight.approvalRequired).toBe(true);
    expect(preflight.executionPermitted).toBe(false);
  });
});
