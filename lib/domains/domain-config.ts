export type DomainId =
  | "essencepulse"
  | "hitmaking-global"
  | "hitmaking-za"
  | "thought2ponder";

export interface BrandDomain {
  id: DomainId;
  name: string;
  domain: string;
  href: string;
  role: string;
  description: string;
  cta: string;
  accent: string;
  asset: string;
  tags: string[];
}

/**
 * Canonical domain registry. Keep domain-specific copy and destinations here so
 * navigation, analytics, and future deep links share one source of truth.
 */
export const BRAND_DOMAINS: BrandDomain[] = [
  {
    id: "essencepulse",
    name: "Essence Pulse",
    domain: "essencepulse.store",
    href: "https://essencepulse.store",
    role: "Unified kingdom hub",
    description: "Align identity, create with intention, and move every brand system from vision into action.",
    cta: "Open hub",
    accent: "#06B6D4",
    asset: "/manus-storage/essencepulse-hero_8e77c3ac.png",
    tags: ["alignment", "strategy", "creation"],
  },
  {
    id: "hitmaking-global",
    name: "HitmaKING Global",
    domain: "hitmaking.store",
    href: "https://hitmaking.store",
    role: "Global sovereign marketplace",
    description: "Premium faith-led jewelry and apparel for people building a visible standard of excellence.",
    cta: "Explore collection",
    accent: "#FCD34D",
    asset: "/manus-storage/hitmaking-marketplace_5dfde172.png",
    tags: ["jewelry", "apparel", "sovereignty"],
  },
  {
    id: "hitmaking-za",
    name: "HitmaKING South Africa",
    domain: "hitmaking.co.za",
    href: "https://hitmaking.co.za",
    role: "South African operations",
    description: "The regional storefront for local fulfillment, community, and kingdom-centered product drops.",
    cta: "Visit ZA store",
    accent: "#1E40AF",
    asset: "/manus-storage/hitmaking-marketplace_5dfde172.png",
    tags: ["South Africa", "local", "fulfillment"],
  },
  {
    id: "thought2ponder",
    name: "Thought2Ponder",
    domain: "thought2ponder.store",
    href: "https://thought2ponder.store",
    role: "Reflection and identity practice",
    description: "Journaling prompts, wisdom products, and quiet practices for deeper self-awareness and spiritual identity.",
    cta: "Begin reflection",
    accent: "#A78BFA",
    asset: "/manus-storage/thought2ponder-reflection_1059b0e5.png",
    tags: ["reflection", "journaling", "identity"],
  },
];

export const UNIFIED_ECOSYSTEM_ASSET =
  "/manus-storage/unified-ecosystem-banner_267b1e34.png";

export function getBrandDomain(id: DomainId): BrandDomain {
  const domain = BRAND_DOMAINS.find((item) => item.id === id);
  if (!domain) {
    throw new Error(`Unknown brand domain: ${id}`);
  }
  return domain;
}
