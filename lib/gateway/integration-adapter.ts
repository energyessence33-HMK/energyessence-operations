import type { ExecutionRecord, PermissionLevel } from "./execution-models";

export type IntegrationEvidenceStatus =
  | "PLANNED"
  | "SCAFFOLDED"
  | "IMPLEMENTED"
  | "TESTED"
  | "INTEGRATED"
  | "STAGING VERIFIED"
  | "PRODUCTION VERIFIED"
  | "BLOCKED";

export type IntegrationConnectionStatus =
  | "disconnected"
  | "configured"
  | "connected"
  | "degraded"
  | "blocked";

export interface IntegrationMetadata {
  id: string;
  displayName: string;
  category: "code" | "operations" | "knowledge" | "commerce" | "creative" | "automation" | "payments";
  connectionMode: "mcp" | "oauth" | "api_key" | "webhook" | "native";
  evidenceStatus: IntegrationEvidenceStatus;
  description: string;
  lastVerifiedAt?: string;
  verificationDetail?: string;
}

export interface IntegrationStatus {
  connection: IntegrationConnectionStatus;
  evidenceStatus: IntegrationEvidenceStatus;
  lastVerifiedAt?: Date;
  detail?: string;
}

export interface IntegrationAuthenticationRequest {
  mode?: "oauth" | "api_key" | "webhook";
  authorizationCode?: string;
  callbackUrl?: string;
}

export interface IntegrationAuthenticationResult {
  connected: boolean;
  nextStep?: string;
  detail?: string;
}

export interface IntegrationCapability {
  id: string;
  label: string;
  riskLevel: PermissionLevel;
  direction: "read" | "write" | "bidirectional";
  approvalRequired: boolean;
}

export interface IntegrationValidationResult {
  valid: boolean;
  checkedAt: Date;
  detail?: string;
}

export interface IntegrationExecutionContext {
  execution: ExecutionRecord;
  approvalId?: string;
  idempotencyKey: string;
}

export interface IntegrationExecutionResult<TResult = unknown> {
  status: "succeeded" | "failed" | "blocked";
  result?: TResult;
  error?: string;
  rollbackReference?: string;
}

export interface IntegrationWebhookEvent<TPayload = unknown> {
  id: string;
  type: string;
  receivedAt: Date;
  payload: TPayload;
  signature?: string;
}

export interface IntegrationWebhookResult {
  accepted: boolean;
  detail?: string;
}

export interface IntegrationHealthReport {
  status: "healthy" | "degraded" | "unavailable" | "unknown";
  checkedAt: Date;
  latencyMs?: number;
  detail?: string;
}

export interface IntegrationOperationResult {
  success: boolean;
  detail?: string;
}

/**
 * Every provider adapter must obey this contract. Implementations belong behind
 * the gateway and must never expose provider secrets to the mobile client.
 */
export interface IntegrationAdapter<TAction extends string = string, TInput = unknown, TResult = unknown> {
  metadata(): IntegrationMetadata;
  status(): Promise<IntegrationStatus>;
  authenticate(input: IntegrationAuthenticationRequest): Promise<IntegrationAuthenticationResult>;
  disconnect(): Promise<IntegrationOperationResult>;
  validate(): Promise<IntegrationValidationResult>;
  capabilities(): Promise<readonly IntegrationCapability[]>;
  execute(
    action: TAction,
    input: TInput,
    context: IntegrationExecutionContext,
  ): Promise<IntegrationExecutionResult<TResult>>;
  webhook(event: IntegrationWebhookEvent): Promise<IntegrationWebhookResult>;
  health(): Promise<IntegrationHealthReport>;
  revoke(reason?: string): Promise<IntegrationOperationResult>;
}
