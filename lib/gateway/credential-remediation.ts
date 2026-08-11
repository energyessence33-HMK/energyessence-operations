import type { GovernancePreflightInput } from "./governance-preflight";

export type RemediationState =
  | "containment_required"
  | "awaiting_owner_rotation"
  | "ready_for_health_check";

export interface CredentialRemediationPlan {
  id: string;
  provider: string;
  state: RemediationState;
  riskLevel: "L4";
  evidenceClass: "confidential exposure evidence";
  ownerAction: string;
  applicationAction: string;
  verification: string;
}

/**
 * This plan intentionally stores no credential identifiers, values, account
 * addresses, payout details, token labels, or provider screenshots.
 */
export const CREDENTIAL_REMEDIATION_PLAN: readonly CredentialRemediationPlan[] = [
  {
    id: "shopify-exposure-containment",
    provider: "Shopify",
    state: "containment_required",
    riskLevel: "L4",
    evidenceClass: "confidential exposure evidence",
    ownerAction: "Rotate exposed application credentials and revoke superseded automation tokens in the provider dashboard.",
    applicationAction: "Keep all provider values out of source, client configuration, logs, and this mobile experience.",
    verification: "Run a post-rotation read-only health check and confirm no secret-like values appear in code or audit artifacts.",
  },
  {
    id: "printify-activation-boundary",
    provider: "Printify",
    state: "awaiting_owner_rotation",
    riskLevel: "L4",
    evidenceClass: "confidential exposure evidence",
    ownerAction: "Create a new least-privilege provider credential only after the affected legacy credentials are contained.",
    applicationAction: "Do not activate a connector or request a replacement value until EA-001 and EA-002 are explicitly approved.",
    verification: "Validate a server-only, read-only health adapter before proposing catalog, fulfilment, or publishing workflows.",
  },
];

export function credentialRotationPreflight(plan: CredentialRemediationPlan): GovernancePreflightInput {
  return {
    provider: plan.provider,
    action: "credential_rotation_readiness",
    target: plan.id,
    riskLevel: plan.riskLevel,
    summary: `${plan.ownerAction} ${plan.applicationAction}`,
    rollbackReference: "Credential rotation is non-reversible; recovery depends on an approved staged cutover and health verification.",
  };
}

export function remediationStateLabel(state: RemediationState): string {
  switch (state) {
    case "containment_required":
      return "CONTAINMENT REQUIRED";
    case "awaiting_owner_rotation":
      return "AWAITING OWNER ACTION";
    case "ready_for_health_check":
      return "READY FOR HEALTH CHECK";
  }
}
