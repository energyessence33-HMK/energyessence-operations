import { describe, it, expect } from "vitest";
import { OPUS_VIDEO_ASSET_CATALOG, OPUS_THEME_TOKENS } from "../lib/content/opus-video-asset-catalog";

describe("Opus Video Asset Library & Theme Governance", () => {
  it("contains pre-configured ready-to-post video assets", () => {
    expect(OPUS_VIDEO_ASSET_CATALOG.length).toBeGreaterThan(0);
    for (const asset of OPUS_VIDEO_ASSET_CATALOG) {
      expect(asset.id).toBeDefined();
      expect(asset.title).toBeDefined();
      expect(asset.aspectRatio).toBe("9:16");
      expect(asset.hookThreeSecondRule).toBeDefined();
      expect(asset.promptSpecification).toBeDefined();
    }
  });

  it("enforces high-frequency vibration and anime-pixel color tokens", () => {
    expect(OPUS_THEME_TOKENS.background).toBe("#06090F");
    expect(OPUS_THEME_TOKENS.primary).toBe("#D9B458");
    expect(OPUS_THEME_TOKENS.highFrequencyVibrations.length).toBe(3);
  });
});
