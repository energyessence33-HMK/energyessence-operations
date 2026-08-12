import { governancePreflight, type GovernancePreflightInput } from "../gateway/governance-preflight";

export type SocialPlatform = "instagram" | "tiktok";

export interface SocialDestination {
  id: string;
  platform: SocialPlatform;
  handle: string;
  profileUrl: string;
  evidenceStatus: "TESTED" | "BLOCKED";
  safeScope: readonly string[];
  blockingReason: string;
}

export const THOUGHT2PONDER_SOCIAL_DESTINATIONS: readonly SocialDestination[] = [
  {
    id: "thought2ponder-instagram",
    platform: "instagram",
    handle: "@thought2ponder06",
    profileUrl: "https://www.instagram.com/thought2ponder06/",
    evidenceStatus: "TESTED",
    safeScope: ["Browser-based owner identity verification completed", "L3 post or reel publication after final approval"],
    blockingReason: "The owner browser session verified the intended profile. The configured Instagram MCP connector remains unlinked, so programmatic posting and insights access are unavailable.",
  },
  {
    id: "thought2ponder-tiktok",
    platform: "tiktok",
    handle: "@thought2ponder",
    profileUrl: "https://www.tiktok.com/@thought2ponder",
    evidenceStatus: "BLOCKED",
    safeScope: ["Read-only account identity after connection", "L3 content publication after approval"],
    blockingReason: "TikTok for Business is disabled and no account linkage is configured.",
  },
];

export function socialPublicationPreflight(destination: SocialDestination, contentReference: string) {
  const input: GovernancePreflightInput = {
    provider: destination.platform,
    action: "social_content_publication",
    target: destination.handle,
    riskLevel: "L3",
    summary: `Proposed publication to ${destination.handle}; content reference: ${contentReference}. No publication is executed by preflight.`,
    rollbackReference: "Publication cannot be assumed reversible. Approval must include an asset, caption, destination, and removal plan.",
  };

  return { input, ...governancePreflight(input) };
}
