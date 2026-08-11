export type ResourceContentClass =
  | "SCRIPTURE"
  | "INTERPRETATION"
  | "GUIDED_PRACTICE"
  | "TECHNICAL_FACT"
  | "AI_INFERENCE";

export type ResourceAccessPolicy =
  | "OPEN_PUBLISHER_DESTINATION"
  | "OWNER_APPROVED_EMBED_REQUIRED";

export interface Thought2PonderResource {
  id: string;
  title: string;
  format: "guide" | "workbook" | "membership-kit" | "practice-card";
  durationLabel: string;
  summary: string;
  classifications: ResourceContentClass[];
  scriptureReferences?: string[];
  safetyNote?: string;
  accessPolicy: ResourceAccessPolicy;
  publisherUrl: "https://thought2ponder.store";
  sourceStatus: "OWNER_SUPPLIED";
}

/**
 * Catalog metadata only. The app does not embed, reproduce, or host the supplied PDFs.
 * External delivery remains publisher-controlled until a distribution route is approved.
 */
export const THOUGHT2PONDER_RESOURCES: readonly Thought2PonderResource[] = [
  {
    id: "five-minute-threshold",
    title: "The 5-Minute Threshold Practice",
    format: "guide",
    durationLabel: "5 minutes",
    summary:
      "A short pause-and-reflect sequence for naming what is present and identifying one small next action.",
    classifications: ["SCRIPTURE", "INTERPRETATION", "GUIDED_PRACTICE"],
    scriptureReferences: ["Revelation 21:25"],
    accessPolicy: "OPEN_PUBLISHER_DESTINATION",
    publisherUrl: "https://thought2ponder.store",
    sourceStatus: "OWNER_SUPPLIED",
  },
  {
    id: "gates-of-pearl-deep-edition",
    title: "Gates of Pearl — Deep Edition",
    format: "guide",
    durationLabel: "Long-form companion",
    summary:
      "A contemplative guide that uses biblical imagery as a framework for personal reflection, questions, and daily practice.",
    classifications: ["SCRIPTURE", "INTERPRETATION", "GUIDED_PRACTICE"],
    scriptureReferences: ["Revelation 21–22", "Matthew 13:45–46"],
    safetyNote:
      "This resource is a reflective companion and is not a substitute for professional medical or mental-health care.",
    accessPolicy: "OPEN_PUBLISHER_DESTINATION",
    publisherUrl: "https://thought2ponder.store",
    sourceStatus: "OWNER_SUPPLIED",
  },
  {
    id: "sanctuary-reflection-candle-guide",
    title: "The Sanctuary Ritual — Reflection Candle Guide",
    format: "guide",
    durationLabel: "Four practice formats",
    summary:
      "A structured collection of morning, evening, weekly, and decision-focused reflection practices, with candle-safety guidance.",
    classifications: ["GUIDED_PRACTICE", "TECHNICAL_FACT"],
    safetyNote:
      "Follow the guide’s candle-safety instructions; do not leave a burning candle unattended.",
    accessPolicy: "OPEN_PUBLISHER_DESTINATION",
    publisherUrl: "https://thought2ponder.store",
    sourceStatus: "OWNER_SUPPLIED",
  },
  {
    id: "reflection-practice-bundle-quick-start",
    title: "Reflection Practice Bundle — Quick-Start Guide",
    format: "guide",
    durationLabel: "10-minute setup",
    summary:
      "A setup guide for establishing a sustainable reflection practice from the Thought2Ponder bundle.",
    classifications: ["GUIDED_PRACTICE"],
    accessPolicy: "OPEN_PUBLISHER_DESTINATION",
    publisherUrl: "https://thought2ponder.store",
    sourceStatus: "OWNER_SUPPLIED",
  },
  {
    id: "reflection-circle-welcome-kit",
    title: "Reflection Circle — Welcome Kit",
    format: "membership-kit",
    durationLabel: "Member onboarding",
    summary:
      "An onboarding resource for the Reflection Circle’s rhythm of reflective practice and community participation.",
    classifications: ["GUIDED_PRACTICE"],
    accessPolicy: "OPEN_PUBLISHER_DESTINATION",
    publisherUrl: "https://thought2ponder.store",
    sourceStatus: "OWNER_SUPPLIED",
  },
  {
    id: "daily-wisdom-cards-practice-guide",
    title: "Daily Wisdom Cards — Practice Guide",
    format: "practice-card",
    durationLabel: "Daily to monthly",
    summary:
      "A companion guide for building a question-led reflection practice with Daily Wisdom Cards.",
    classifications: ["GUIDED_PRACTICE"],
    accessPolicy: "OPEN_PUBLISHER_DESTINATION",
    publisherUrl: "https://thought2ponder.store",
    sourceStatus: "OWNER_SUPPLIED",
  },
  {
    id: "purpose-discovery-workbook",
    title: "Purpose Discovery Workbook",
    format: "workbook",
    durationLabel: "Five chapters",
    summary:
      "A guided inquiry into values, strengths, patterns, direction, and first steps for personal reflection.",
    classifications: ["GUIDED_PRACTICE", "INTERPRETATION"],
    safetyNote:
      "This workbook supports reflection and does not provide clinical, legal, financial, or diagnostic advice.",
    accessPolicy: "OPEN_PUBLISHER_DESTINATION",
    publisherUrl: "https://thought2ponder.store",
    sourceStatus: "OWNER_SUPPLIED",
  },
] as const;

export const CONTENT_CLASS_LABELS: Record<ResourceContentClass, string> = {
  SCRIPTURE: "Scripture",
  INTERPRETATION: "Interpretation",
  GUIDED_PRACTICE: "Guided practice",
  TECHNICAL_FACT: "Technical fact",
  AI_INFERENCE: "AI inference",
};
