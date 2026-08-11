import { requiresHumanApproval, type PermissionLevel } from "./execution-models";

export type AutomationControlStatus = "ready" | "blocked" | "approval_required" | "draft_only";

export interface AutomationControl {
  id: string;
  title: string;
  provider: string;
  riskLevel: PermissionLevel;
  status: AutomationControlStatus;
  summary: string;
  preconditions: readonly string[];
  externalEffect: boolean;
}

/**
 * Declarative executive control inventory. These are preflight entries, not
 * provider actions. Only L0–L2 controls may become autonomous after all
 * listed preconditions are met; L3/L4 always need a named human approval.
 */
export const EXECUTIVE_AUTOMATION_CONTROLS: readonly AutomationControl[] = [
  {
    id: "connector-evidence-review",
    title: "Connector evidence review",
    provider: "Kingdom Executor",
    riskLevel: "L0",
    status: "ready",
    summary: "Classify provider health, evidence state, and missing preconditions from read-only metadata.",
    preconditions: ["Registry metadata is available", "No provider call is initiated"],
    externalEffect: false,
  },
  {
    id: "content-draft-preflight",
    title: "Content draft preflight",
    provider: "Thought2Ponder",
    riskLevel: "L1",
    status: "ready",
    summary: "Prepare a source-labeled draft with Scripture, interpretation, guided-practice, and technical-fact distinctions.",
    preconditions: ["Source provenance is recorded", "No post, message, or email is sent"],
    externalEffect: false,
  },
  {
    id: "shopify-digital-product-review",
    title: "Shopify digital-product review",
    provider: "Shopify",
    riskLevel: "L3",
    status: "approval_required",
    summary: "Verify the reported Gates of Pearl fulfilment configuration before proposing a repair.",
    preconditions: ["Fresh read-only product verification", "Named owner approval", "Rollback and customer-impact review"],
    externalEffect: true,
  },
  {
    id: "printify-read-only-adapter",
    title: "Printify read-only adapter",
    provider: "Printify",
    riskLevel: "L3",
    status: "blocked",
    summary: "Establish provider health and shop status without catalog, order, fulfilment, or payout access.",
    preconditions: ["Provider-side credential rotation", "Least-privilege scope", "Server-side secret configuration", "Named owner approval"],
    externalEffect: true,
  },
  {
    id: "provider-credential-remediation",
    title: "Provider credential remediation",
    provider: "Shopify and Printify",
    riskLevel: "L4",
    status: "blocked",
    summary: "Rotate or revoke values exposed outside the provider’s intended secret boundary.",
    preconditions: ["Owner performs action in provider dashboard", "Scope review", "Replacement secret stored server-side only"],
    externalEffect: true,
  },
] as const;

export function canRunAutonomously(control: AutomationControl): boolean {
  return !control.externalEffect && !requiresHumanApproval(control.riskLevel) && control.status === "ready";
}

export function controlStateLabel(control: AutomationControl): string {
  if (canRunAutonomously(control)) return "AUTONOMOUSLY SAFE";
  if (control.status === "blocked") return "BLOCKED";
  if (requiresHumanApproval(control.riskLevel)) return "HUMAN APPROVAL REQUIRED";
  return "DRAFT ONLY";
}
