/**
 * Governance vocabulary for all connector-backed work. These models are local
 * contracts only: they do not execute actions, persist secrets, or bypass
 * provider permissions.
 */
export const PERMISSION_LEVELS = ["L0", "L1", "L2", "L3", "L4"] as const;

export type PermissionLevel = (typeof PERMISSION_LEVELS)[number];

export type ApprovalStatus =
  | "not_required"
  | "pending"
  | "approved"
  | "rejected"
  | "expired"
  | "cancelled";

export type ExecutionStatus =
  | "draft"
  | "blocked"
  | "awaiting_approval"
  | "approved"
  | "executing"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface ApprovalRequest {
  id: string;
  executionId: string;
  requestedBy: string;
  requestedAt: Date;
  riskLevel: PermissionLevel;
  summary: string;
  provider: string;
  action: string;
  target: string;
  inputHash: string;
  status: ApprovalStatus;
  decidedBy?: string;
  decidedAt?: Date;
  decisionNote?: string;
  expiresAt?: Date;
}

export interface ApprovalOutcome {
  approvalId: string;
  status: Extract<ApprovalStatus, "approved" | "rejected" | "expired" | "cancelled">;
  decidedBy?: string;
  decidedAt: Date;
  note?: string;
}

export interface ExecutionRecord<TResult = unknown> {
  id: string;
  organizationId: string;
  actorType: "user" | "service" | "system";
  actorId: string;
  provider: string;
  action: string;
  target: string;
  riskLevel: PermissionLevel;
  inputHash: string;
  status: ExecutionStatus;
  approvalRequired: boolean;
  approvalId?: string;
  result?: TResult;
  error?: string;
  rollbackReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * L3 actions can affect external systems and L4 actions can affect production,
 * access control, financial state, or destructive state. Both require a named
 * human decision before execution.
 */
export function requiresHumanApproval(level: PermissionLevel): boolean {
  return level === "L3" || level === "L4";
}

export function initialExecutionStatus(level: PermissionLevel): ExecutionStatus {
  return requiresHumanApproval(level) ? "awaiting_approval" : "draft";
}
