import type { ApprovalStatus, ExecutionRecord, PermissionLevel } from "@/lib/gateway/execution-models";

export const INSTAGRAM_TEST_POST_DRAFT = {
  id: "TS-003-IG-TEST-001",
  destinationId: "instagram-thought2ponder",
  platform: "Instagram",
  handle: "@thought2ponder06",
  status: "DRAFT" as const,
  riskLevel: "L3" as PermissionLevel,
  title: "Thought2Ponder · Integration Test",
  caption: `A small pause for the mind and spirit.

Today’s reflection: clarity does not always arrive through more noise. Take five quiet minutes, name what matters, and choose one grounded next step.

Thought2Ponder is a space for intentional reflection, practical growth, and honest questions.

#Thought2Ponder #IntentionalLiving #ReflectionPractice`,
  altText: "A proposed midnight-blue Thought2Ponder reflection graphic with restrained gold linework and the words 'A small pause for the mind and spirit.'",
  visualBrief: "Create a minimal 4:5 Instagram graphic in midnight black, sapphire, muted turquoise, and gold. Use generous negative space, subtle sacred-geometry-inspired linework, and no faces, logos, or claims of supernatural outcomes.",
  mediaUrl: "/manus-storage/thought2ponder-a-small-pause-instagram_88683c47.png",
  mediaStatus: "GENERATING — PENDING REVIEW" as const,
  audienceDataAccess: false,
  inboxAccess: false,
  accountEdits: false,
  publicationAllowed: false,
  finalConfirmationRequired: true,
  blockers: [
    "The generated visual is still pending final publisher review.",
    "The Instagram MCP connector remains unlinked, so programmatic publication is unavailable.",
    "A final TS-003 publication confirmation has not been granted for this exact caption and media asset.",
  ],
} as const;

/**
 * Creates local audit-ready preflight data. This function never publishes,
 * invokes a provider, or stores a token.
 */
export interface SocialTestPostPreflight {
  execution: Omit<ExecutionRecord, "id" | "createdAt" | "updatedAt">;
  approvalStatus: ApprovalStatus;
  publicationEligible: false;
}

export function createInstagramTestPostPreflight(): SocialTestPostPreflight {
  return {
    execution: {
      organizationId: "local-draft",
      actorType: "system",
      actorId: "kingdom-executor",
      riskLevel: "L3",
      status: "awaiting_approval",
      action: "social.instagram.test_post.publish",
      provider: "instagram-thought2ponder",
      target: "@thought2ponder06",
      approvalRequired: true,
      inputHash: "local-draft-ts003-ig-test-001",
    },
    approvalStatus: "pending",
    publicationEligible: false,
  };
}
