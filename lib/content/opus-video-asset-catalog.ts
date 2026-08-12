export interface OpusVideoAsset {
  id: string;
  title: string;
  category: "Short" | "Reel" | "Commercial" | "Meditation" | "Identity";
  durationSeconds: number;
  aspectRatio: "9:16" | "16:9";
  frequencyVibrationTag: string;
  visualStyle: string;
  scriptOutline: string;
  hookThreeSecondRule: string;
  promptSpecification: string;
  status: "Ready to Render" | "Governance Approved" | "Archived";
  provenance: string;
}

export const OPUS_VIDEO_ASSET_CATALOG: OpusVideoAsset[] = [
  {
    id: "OPUS-VID-001",
    title: "The 3-Second Sacred Pause",
    category: "Short",
    durationSeconds: 15,
    aspectRatio: "9:16",
    frequencyVibrationTag: "528Hz Transformation / Midnight Gold",
    visualStyle: "Anime-Pixel Divine Minimalism, Midnight Black (#06090F), Deep Sapphire (#102A62), Radiant Gold (#D9B458)",
    scriptOutline: "0-3s: Absolute silence with gold sacred geometry focal point. 3-10s: 'In the stillness, frequency aligns with truth.' 10-15s: Brand mark for Thought2Ponder & EssencePulse.",
    hookThreeSecondRule: "Visual contrast of radiant gold circle against midnight black with zero clutter stops immediate scrolling.",
    promptSpecification: "Cinematic vertical 9:16 short. Minimalist anime-pixel divine style. Midnight black background, soft glowing sacred geometry in radiant gold (#D9B458) and turquoise (#35BFC1). Clean typography rendering 'A small pause'. Extremely high production polish, zero visual clutter.",
    status: "Governance Approved",
    provenance: "Kingdom Executor AI OS Master Blueprint v2.1 — 3-Second Rule & Christ-Consciousness Principle"
  },
  {
    id: "OPUS-VID-002",
    title: "Kingdom Infrastructure & Generational Wealth",
    category: "Commercial",
    durationSeconds: 30,
    aspectRatio: "9:16",
    frequencyVibrationTag: "432Hz Harmonic Stability / Sapphire Gold",
    visualStyle: "Cybernetic Divine Architecture, Premium E-Commerce Infrastructure Metaphor",
    scriptOutline: "0-3s: High-speed architectural wireframe transforming into physical luxury jewelry and digital storefronts. 3-20s: 'Building sovereign digital assets across four locked domains.' 20-30s: HitMa'King & EssencePulse ecosystem call to action.",
    hookThreeSecondRule: "Dynamic lighting sweep across sovereign gold and sapphire digital nodes.",
    promptSpecification: "Cinematic vertical 9:16 commercial video. Architectural wireframes shifting into polished obsidian and gold e-commerce nodes. Midnight black and deep sapphire gradient field with golden light traces. Professional editorial pacing, no supernatural or financial claims.",
    status: "Ready to Render",
    provenance: "HitMa'King & EssencePulse Multi-Domain Integration Standard"
  },
  {
    id: "OPUS-VID-003",
    title: "Identity-Driven Sovereign Enterprise",
    category: "Reel",
    durationSeconds: 20,
    aspectRatio: "9:16",
    frequencyVibrationTag: "963Hz Crown Awakening / Pure Turquoise",
    visualStyle: "Atmospheric Anime-Pixel Gradient, Sacred Geometry, Editorial Typography",
    scriptOutline: "0-3s: 'Your enterprise is an extension of your divine identity.' 3-15s: Operational blueprint walkthrough in sacred geometry. 15-20s: Kingdom Executor Studio preview.",
    hookThreeSecondRule: "Immediate presentation of sovereign identity statement in crisp gold serif type.",
    promptSpecification: "Vertical 9:16 Instagram Reel asset. Deep sapphire and midnight black background with subtle pulsing turquoise light rings. Crisp gold typography. Calm, authoritative, highly intentional motion design with no artificial dopamine loops.",
    status: "Governance Approved",
    provenance: "Kingdom Executor Studio Core Philosophy"
  }
];

export const OPUS_THEME_TOKENS = {
  background: "#06090F", // Midnight Black
  surface: "#102A62",    // Deep Sapphire
  primary: "#D9B458",    // Radiant Gold
  accent: "#35BFC1",     // Muted Turquoise
  foreground: "#F8FAFC", // Clean Light Text
  muted: "#94A3B8",      // Secondary Text
  border: "#1E293B",     // Subtle Divider
  highFrequencyVibrations: [
    { freq: "528Hz", intent: "Transformation & Clarity" },
    { freq: "432Hz", intent: "Harmonic Stability" },
    { freq: "963Hz", intent: "Crown Alignment & Purpose" }
  ]
};
