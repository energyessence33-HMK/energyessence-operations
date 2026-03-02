export interface Affirmation {
  id: string;
  text: string;
  category: "spiritual" | "abundance" | "identity" | "purpose" | "alignment" | "power";
  author?: string;
  scriptureRef?: string;
  frequency?: "daily" | "weekly" | "occasional";
}

export const AFFIRMATIONS: Affirmation[] = [
  // Spiritual Foundation
  {
    id: "aff_001",
    text: "I am a child of God, created in His image and likeness.",
    category: "spiritual",
    scriptureRef: "Genesis 1:27",
  },
  {
    id: "aff_002",
    text: "My spirit is eternal, my essence is divine.",
    category: "spiritual",
    frequency: "daily",
  },
  {
    id: "aff_003",
    text: "I walk in the light of Christ consciousness.",
    category: "spiritual",
    frequency: "daily",
  },
  {
    id: "aff_004",
    text: "God's love flows through me, healing all that I touch.",
    category: "spiritual",
    scriptureRef: "1 John 4:7-8",
  },
  {
    id: "aff_005",
    text: "I am connected to the Divine Source of all creation.",
    category: "spiritual",
  },
  {
    id: "aff_006",
    text: "My soul recognizes its eternal nature.",
    category: "spiritual",
  },
  {
    id: "aff_007",
    text: "I am guided by the Holy Spirit in all my endeavors.",
    category: "spiritual",
    scriptureRef: "John 14:26",
  },
  {
    id: "aff_008",
    text: "Truth resides within me; I am a beacon of light.",
    category: "spiritual",
  },

  // Abundance & Prosperity
  {
    id: "aff_009",
    text: "I am worthy of unlimited abundance and prosperity.",
    category: "abundance",
    frequency: "daily",
  },
  {
    id: "aff_010",
    text: "Money flows to me easily and effortlessly.",
    category: "abundance",
  },
  {
    id: "aff_011",
    text: "I attract wealth, health, and happiness.",
    category: "abundance",
  },
  {
    id: "aff_012",
    text: "My income is unlimited; my potential is infinite.",
    category: "abundance",
  },
  {
    id: "aff_013",
    text: "I receive blessings from expected and unexpected sources.",
    category: "abundance",
  },
  {
    id: "aff_014",
    text: "Prosperity is my natural state of being.",
    category: "abundance",
  },
  {
    id: "aff_015",
    text: "I am a magnet for opportunities and success.",
    category: "abundance",
  },
  {
    id: "aff_016",
    text: "Every transaction brings me closer to my financial goals.",
    category: "abundance",
  },
  {
    id: "aff_017",
    text: "I give generously and receive abundantly.",
    category: "abundance",
    scriptureRef: "Proverbs 11:24-25",
  },
  {
    id: "aff_018",
    text: "My wealth increases daily; my empire expands.",
    category: "abundance",
  },

  // Identity & Self-Worth
  {
    id: "aff_019",
    text: "I am worthy of love, respect, and success.",
    category: "identity",
    frequency: "daily",
  },
  {
    id: "aff_020",
    text: "My authentic self is powerful and magnetic.",
    category: "identity",
  },
  {
    id: "aff_021",
    text: "I embrace my unique gifts and talents.",
    category: "identity",
  },
  {
    id: "aff_022",
    text: "I am confident in who I am and what I bring to the world.",
    category: "identity",
  },
  {
    id: "aff_023",
    text: "My voice matters; my message resonates.",
    category: "identity",
  },
  {
    id: "aff_024",
    text: "I am a leader; I inspire and elevate others.",
    category: "identity",
  },
  {
    id: "aff_025",
    text: "My presence is a gift to the world.",
    category: "identity",
  },
  {
    id: "aff_026",
    text: "I radiate confidence, grace, and divine authority.",
    category: "identity",
  },

  // Purpose & Mission
  {
    id: "aff_027",
    text: "I am living my divine purpose with clarity and passion.",
    category: "purpose",
    frequency: "daily",
  },
  {
    id: "aff_028",
    text: "My mission is clear; my path is illuminated.",
    category: "purpose",
  },
  {
    id: "aff_029",
    text: "I am called to greatness; I answer that call.",
    category: "purpose",
  },
  {
    id: "aff_030",
    text: "Every action I take aligns with my highest purpose.",
    category: "purpose",
  },
  {
    id: "aff_031",
    text: "I am a vessel for divine wisdom and healing.",
    category: "purpose",
  },
  {
    id: "aff_032",
    text: "My work transforms lives and elevates consciousness.",
    category: "purpose",
  },
  {
    id: "aff_033",
    text: "I serve humanity with love, integrity, and excellence.",
    category: "purpose",
  },
  {
    id: "aff_034",
    text: "My legacy will inspire generations.",
    category: "purpose",
  },

  // Divine Alignment
  {
    id: "aff_035",
    text: "I move with Heaven's precision and timing.",
    category: "alignment",
    frequency: "daily",
  },
  {
    id: "aff_036",
    text: "I am in perfect alignment with divine will.",
    category: "alignment",
  },
  {
    id: "aff_037",
    text: "Return to your Essence; I am whole and complete.",
    category: "alignment",
    frequency: "daily",
  },
  {
    id: "aff_038",
    text: "I trust the divine timing of my life.",
    category: "alignment",
  },
  {
    id: "aff_039",
    text: "Every obstacle is an opportunity for growth.",
    category: "alignment",
  },
  {
    id: "aff_040",
    text: "I am guided by intuition and divine wisdom.",
    category: "alignment",
  },
  {
    id: "aff_041",
    text: "My life flows with grace, ease, and synchronicity.",
    category: "alignment",
  },
  {
    id: "aff_042",
    text: "I surrender to the divine plan unfolding in my life.",
    category: "alignment",
    scriptureRef: "Proverbs 3:5-6",
  },

  // Power & Authority
  {
    id: "aff_043",
    text: "I am a kingdom executor; I create with divine authority.",
    category: "power",
    frequency: "daily",
  },
  {
    id: "aff_044",
    text: "I speak with power; my words create reality.",
    category: "power",
  },
  {
    id: "aff_045",
    text: "I command my reality with intention and faith.",
    category: "power",
  },
  {
    id: "aff_046",
    text: "My energy is magnetic; I attract what I decree.",
    category: "power",
  },
  {
    id: "aff_047",
    text: "I am empowered to create the life of my dreams.",
    category: "power",
  },
  {
    id: "aff_048",
    text: "I am a co-creator with the Divine.",
    category: "power",
  },
  {
    id: "aff_049",
    text: "You are guided; I trust the journey.",
    category: "power",
  },
  {
    id: "aff_050",
    text: "I am unstoppable; I am victorious; I am blessed.",
    category: "power",
  },
  {
    id: "aff_051",
    text: "My faith is unshakeable; my vision is clear.",
    category: "power",
  },
  {
    id: "aff_052",
    text: "I activate my highest potential every single day.",
    category: "power",
  },
];

export const getAffirmationsByCategory = (category: Affirmation["category"]): Affirmation[] => {
  return AFFIRMATIONS.filter((aff) => aff.category === category);
};

export const getDailyAffirmations = (): Affirmation[] => {
  return AFFIRMATIONS.filter((aff) => aff.frequency === "daily");
};

export const getRandomAffirmation = (): Affirmation => {
  return AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
};

export const getAffirmationOfTheDay = (): Affirmation => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return AFFIRMATIONS[dayOfYear % AFFIRMATIONS.length];
};
