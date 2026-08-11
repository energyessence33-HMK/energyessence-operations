export interface EnergyEssenceExperienceTrack {
  id: "reset" | "rebalance" | "recharge";
  name: string;
  planningFocus: string;
  safeDescription: string;
  sourceStatus: "LANDING_PAGE_REFERENCE";
}

/**
 * Planning and design metadata only. It deliberately excludes unverified health,
 * safety, scientific, product, pricing, guarantee, testimonial, and manufacturing claims.
 */
export const ENERGYESSENCE_EXPERIENCE_TRACKS: readonly EnergyEssenceExperienceTrack[] = [
  {
    id: "reset",
    name: "Reset",
    planningFocus: "Close and review",
    safeDescription:
      "A deliberate end-of-day review space for recording what to release, protect, or continue tomorrow.",
    sourceStatus: "LANDING_PAGE_REFERENCE",
  },
  {
    id: "rebalance",
    name: "Rebalance",
    planningFocus: "Pause and recalibrate",
    safeDescription:
      "A midday check-in for clarifying current priorities, constraints, and the next meaningful action.",
    sourceStatus: "LANDING_PAGE_REFERENCE",
  },
  {
    id: "recharge",
    name: "Recharge",
    planningFocus: "Begin with intention",
    safeDescription:
      "A morning planning space for selecting one purpose-aligned priority and defining a realistic first step.",
    sourceStatus: "LANDING_PAGE_REFERENCE",
  },
] as const;

export const ENERGYESSENCE_DESIGN_TOKENS = {
  obsidian: "#0B0B0B",
  bone: "#F5F3EE",
  gold: "#C9A44C",
  indigo: "#3D3A6B",
  sage: "#4A6351",
} as const;
