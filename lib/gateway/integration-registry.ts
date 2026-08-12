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
    verificationDetail: "Direct connector authorization is expired or invalid. Zapier exposes an enabled Slack connection, but no message content was retrieved; direct reauthorization remains required.",
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
    verificationDetail: "Read-only aggregate query confirmed HitMa'KING, 136 products, and four aggregate customers. No customer records or commerce writes were retrieved or performed.",
  },
  {
    id: "canva",
    displayName: "Canva",
    category: "creative",
    connectionMode: "mcp",
    evidenceStatus: "TESTED",
    description: "Design asset workflows are available for read-only discovery; design edits, exports, and sharing remain approval-gated.",
    lastVerifiedAt: "2026-08-11",
    verificationDetail: "Capability discovery succeeded. No Canva design, folder, Brand Kit, template, or asset content was accessed.",
  },
  {
    id: "zapier",
    displayName: "Zapier",
    category: "automation",
    connectionMode: "mcp",
    evidenceStatus: "TESTED",
    description: "Cross-system automation has connected-provider inventory only; every workflow remains deferred until it has explicit inputs, outputs, owner, and approval boundary.",
    lastVerifiedAt: "2026-08-11",
    verificationDetail: "Capability discovery and enabled-action inventory succeeded for GitHub, Notion, Slack, and Shopify. No automation was run.",
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
  {
    id: "vercel",
    displayName: "Vercel",
    category: "operations",
    connectionMode: "mcp",
    evidenceStatus: "BLOCKED",
    description: "Deployment inventory and protection checks are available only after a target project is identified. Production deployment remains approval-gated.",
    lastVerifiedAt: "2026-08-11",
    verificationDetail: "Read-only team access succeeded, but the verified team returned no Vercel projects. No deployment, domain, protection, or billing action was performed.",
  },
  {
    id: "printify",
    displayName: "Printify",
    category: "commerce",
    connectionMode: "api_key",
    evidenceStatus: "BLOCKED",
    description: "Print-on-demand health verification is pending a newly rotated, least-privilege server-side credential and owner approval.",
    lastVerifiedAt: "2026-08-11",
    verificationDetail: "Provider context was supplied as confidential operational evidence only. No Printify credential, shop, catalog, order, fulfilment, or payout data was accessed.",
  },
  {
    id: "instagram-thought2ponder",
    displayName: "Instagram · Thought2Ponder",
    category: "social",
    connectionMode: "oauth",
    evidenceStatus: "TESTED",
    description: "Thought2Ponder social destination. Account linkage, insights, inbox access, and publishing are independently approval-gated.",
    lastVerifiedAt: "2026-08-11",
    verificationDetail: "An authenticated owner browser session reached the intended profile and exposed owner-only profile controls, verifying the destination identity. The configured Instagram MCP connector remains unlinked; no API account, post, insight, audience, or message data was retrieved.",
  },
  {
    id: "tiktok-thought2ponder",
    displayName: "TikTok · Thought2Ponder",
    category: "social",
    connectionMode: "oauth",
    evidenceStatus: "BLOCKED",
    lastVerifiedAt: "2026-08-11",
    description: "Thought2Ponder social destination. Content publishing and analytics require a linked provider account and an explicit approval request.",
    verificationDetail: "TikTok for Business is present in the account inventory but disabled. No TikTok account, audience, content, advertising, or performance data was accessed.",
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
