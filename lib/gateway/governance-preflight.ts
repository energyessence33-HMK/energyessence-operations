import { createHash } from "node:crypto";

import {
  initialExecutionStatus,
  requiresHumanApproval,
  type PermissionLevel,
} from "./execution-models";

export interface GovernancePreflightInput {
  provider: string;
  action: string;
  target: string;
  riskLevel: PermissionLevel;
  summary: string;
  rollbackReference?: string;
}

export function inputFingerprint(input: GovernancePreflightInput): string {
  const canonical = JSON.stringify({
    provider: input.provider,
    action: input.action,
    target: input.target,
    riskLevel: input.riskLevel,
    summary: input.summary,
    rollbackReference: input.rollbackReference ?? null,
  });
  return createHash("sha256").update(canonical).digest("hex");
}

export function governancePreflight(input: GovernancePreflightInput) {
  const approvalRequired = requiresHumanApproval(input.riskLevel);
  return {
    approvalRequired,
    inputHash: inputFingerprint(input),
    status: initialExecutionStatus(input.riskLevel),
    executionPermitted: false,
  } as const;
}
