import type { IntegrationAdapter, IntegrationMetadata } from "./integration-adapter";

/**
 * Declarative provider catalogue. Entries describe intended integration scope,
 * not a guarantee that a provider credential is live in the current runtime.
 */
export const GOVERNED_INTEGRATIONS = [
  {
    id: "github",
    displayName: "GitHub",
    category: "code",
    connectionMode: "mcp",
    evidenceStatus: "INTEGRATED",
    description: "Repository governance, code review, and release evidence. Read-only verification precedes any repository write.",
    lastVerifiedAt: "2026-08-11",
    verificationDetail: "Read-only repository metadata check confirmed access to energyessence33-HMK/energyessence-operations on main.",
  },
  {
    id: "slack",
    displayName: "Slack",
    category: "operations",
    connectionMode: "mcp",
    evidenceStatus: "BLOCKED",
    description: "Operational communications. Sending messages remains an approval-gated external action.",
    lastVerifiedAt: "2026-08-11",
    verificationDetail: "Connector capability discovery was blocked because Slack OAuth authorization is expired or invalid.",
  },
  {
    id: "notion",
    displayName: "Notion",
    category: "knowledge",
    connectionMode: "mcp",
    evidenceStatus: "INTEGRATED",
    description: "Knowledge archive and operating documentation. Read-only verification precedes page or database edits.",
    lastVerifiedAt: "2026-08-11",
    verificationDetail: "Read-only workspace identity check succeeded; page/database writes remain approval-gated.",
  },
  {
    id: "shopify",
    displayName: "Shopify",
    category: "commerce",
    connectionMode: "mcp",
    evidenceStatus: "INTEGRATED",
    description: "Commerce catalog and operational data. Product, order, and customer updates require scoped approval.",
    lastVerifiedAt: "2026-08-11",
    verificationDetail: "Read-only reconciliation confirmed a 131-product catalog, four aggregate customers, and no Manus-channel orders.",
  },
  {
    id: "canva",
    displayName: "Canva",
    category: "creative",
    connectionMode: "mcp",
    evidenceStatus: "BLOCKED",
    description: "Design asset workflows are awaiting reliable provider capability discovery.",
    lastVerifiedAt: "2026-08-11",
    verificationDetail: "Capability discovery did not return within the bounded verification window; no Canva content was accessed.",
  },
  {
    id: "zapier",
    displayName: "Zapier",
    category: "automation",
    connectionMode: "mcp",
    evidenceStatus: "BLOCKED",
    description: "Cross-system automation is deferred until each workflow has explicit inputs, outputs, owner, and approval boundary.",
    lastVerifiedAt: "2026-08-11",
    verificationDetail: "Capability discovery did not return within the bounded verification window; no automation was run.",
  },
  {
    id: "stripe",
    displayName: "Stripe",
    category: "payments",
    connectionMode: "api_key",
    evidenceStatus: "BLOCKED",
    description: "Payments are disabled in free mode and must not be enabled without explicit commercial and compliance approval.",
    lastVerifiedAt: "2026-08-11",
    verificationDetail: "Disabled by the approved free-access operating mode; no payment credential was invoked.",
  },
] as const satisfies readonly IntegrationMetadata[];

export class IntegrationRegistry {
  private readonly adapters = new Map<string, IntegrationAdapter>();

  register(adapter: IntegrationAdapter): void {
    const { id } = adapter.metadata();
    if (this.adapters.has(id)) {
      throw new Error(`Integration adapter already registered: ${id}`);
    }
    this.adapters.set(id, adapter);
  }

  get(id: string): IntegrationAdapter | undefined {
    return this.adapters.get(id);
  }

  listRegistered(): readonly IntegrationAdapter[] {
    return [...this.adapters.values()];
  }

  listDefinitions(): readonly IntegrationMetadata[] {
    return GOVERNED_INTEGRATIONS;
  }
}

export const integrationRegistry = new IntegrationRegistry();
