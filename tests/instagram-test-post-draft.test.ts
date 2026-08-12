import { describe, expect, it } from "vitest";

import { createInstagramTestPostPreflight, INSTAGRAM_TEST_POST_DRAFT } from "../lib/social/instagram-test-post-draft";

describe("Instagram test-post draft", () => {
  it("keeps the prepared test post private until final approval and media selection", () => {
    expect(INSTAGRAM_TEST_POST_DRAFT.handle).toBe("@thought2ponder06");
    expect(INSTAGRAM_TEST_POST_DRAFT.status).toBe("DRAFT");
    expect(INSTAGRAM_TEST_POST_DRAFT.publicationAllowed).toBe(false);
    expect(INSTAGRAM_TEST_POST_DRAFT.finalConfirmationRequired).toBe(true);
    expect(INSTAGRAM_TEST_POST_DRAFT.mediaStatus).toBe("GENERATING — PENDING REVIEW");
    expect(INSTAGRAM_TEST_POST_DRAFT.mediaUrl).toContain("/manus-storage/");
  });

  it("creates an audit-ready L3 preflight without executing a provider action", () => {
    const preflight = createInstagramTestPostPreflight();

    expect(preflight.execution.riskLevel).toBe("L3");
    expect(preflight.execution.status).toBe("awaiting_approval");
    expect(preflight.execution.approvalRequired).toBe(true);
    expect(preflight.approvalStatus).toBe("pending");
    expect(preflight.publicationEligible).toBe(false);
    expect(preflight.execution.action).toBe("social.instagram.test_post.publish");
  });
});
