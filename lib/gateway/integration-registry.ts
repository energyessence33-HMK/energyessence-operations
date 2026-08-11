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
  },
  {
    id: "slack",
    displayName: "Slack",
    category: "operations",
    connectionMode: "mcp",
    evidenceStatus: "SCAFFOLDED",
    description: "Operational communications. Sending messages remains an approval-gated external action.",
  },
  {
    id: "notion",
    displayName: "Notion",
    category: "knowledge",
    connectionMode: "mcp",
    evidenceStatus: "SCAFFOLDED",
    description: "Knowledge archive and operating documentation. Read-only verification precedes page or database edits.",
  },
  {
    id: "shopify",
    displayName: "Shopify",
    category: "commerce",
    connectionMode: "mcp",
    evidenceStatus: "INTEGRATED",
    description: "Commerce catalog and operational data. Product, order, and customer updates require scoped approval.",
  },
  {
    id: "canva",
    displayName: "Canva",
    category: "creative",
    connectionMode: "mcp",
    evidenceStatus: "BLOCKED",
    description: "Design asset workflows are awaiting reliable provider capability discovery.",
  },
  {
    id: "zapier",
    displayName: "Zapier",
    category: "automation",
    connectionMode: "mcp",
    evidenceStatus: "PLANNED",
    description: "Cross-system automation is deferred until each workflow has explicit inputs, outputs, owner, and approval boundary.",
  },
  {
    id: "stripe",
    displayName: "Stripe",
    category: "payments",
    connectionMode: "api_key",
    evidenceStatus: "BLOCKED",
    description: "Payments are disabled in free mode and must not be enabled without explicit commercial and compliance approval.",
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
