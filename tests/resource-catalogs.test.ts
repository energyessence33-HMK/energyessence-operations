import { describe, expect, it } from "vitest";

import {
  CONTENT_CLASS_LABELS,
  THOUGHT2PONDER_RESOURCES,
} from "../lib/content/thought2ponder-resource-catalog";
import { ENERGYESSENCE_EXPERIENCE_TRACKS } from "../lib/content/energyessence-experience-catalog";

describe("embedded resource catalogs", () => {
  it("keeps Thought2Ponder resources as publisher-controlled metadata", () => {
    expect(THOUGHT2PONDER_RESOURCES).toHaveLength(7);
    expect(new Set(THOUGHT2PONDER_RESOURCES.map((resource) => resource.id)).size).toBe(
      THOUGHT2PONDER_RESOURCES.length,
    );

    for (const resource of THOUGHT2PONDER_RESOURCES) {
      expect(resource.publisherUrl).toBe("https://thought2ponder.store");
      expect(resource.sourceStatus).toBe("OWNER_SUPPLIED");
      expect(resource.accessPolicy).toBe("OPEN_PUBLISHER_DESTINATION");
      expect(resource.classifications.length).toBeGreaterThan(0);
    }
  });

  it("exposes the required content discernment labels", () => {
    expect(CONTENT_CLASS_LABELS.SCRIPTURE).toBe("Scripture");
    expect(CONTENT_CLASS_LABELS.INTERPRETATION).toBe("Interpretation");
    expect(CONTENT_CLASS_LABELS.GUIDED_PRACTICE).toBe("Guided practice");
    expect(CONTENT_CLASS_LABELS.TECHNICAL_FACT).toBe("Technical fact");
    expect(CONTENT_CLASS_LABELS.AI_INFERENCE).toBe("AI inference");
  });

  it("keeps Energy Essence tracks to an operational-planning scope", () => {
    expect(ENERGYESSENCE_EXPERIENCE_TRACKS.map((track) => track.id)).toEqual([
      "reset",
      "rebalance",
      "recharge",
    ]);

    for (const track of ENERGYESSENCE_EXPERIENCE_TRACKS) {
      expect(track.sourceStatus).toBe("LANDING_PAGE_REFERENCE");
      expect(track.safeDescription).not.toMatch(/cure|treat|diagnose|guarantee|scientific/i);
    }
  });
});
