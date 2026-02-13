/**
 * Customer Psychology Engine
 * Analyzes emotional triggers, buying psychology, and copywriting effectiveness
 * Based on proven conversion psychology principles
 */

interface PsychologyAnalysis {
  emotionalScore: number;
  triggers: string[];
  psychologyPrinciples: string[];
  recommendations: string[];
  conversionPotential: number;
}

interface CopywritingAnalysis {
  headlineScore: number;
  ctaStrength: number;
  emotionalResonance: number;
  trustFactors: number;
  urgencyLevel: number;
  overallScore: number;
  suggestions: string[];
}

class PsychologyEngine {
  /**
   * Emotional triggers that drive purchasing decisions
   */
  private emotionalTriggers = {
    scarcity: ["limited", "only", "exclusive", "rare", "last chance", "ends"],
    urgency: ["now", "today", "immediate", "don't wait", "act fast", "hurry"],
    social_proof: [
      "thousands",
      "bestseller",
      "trusted",
      "proven",
      "award",
      "certified",
    ],
    authority: [
      "expert",
      "certified",
      "professional",
      "leader",
      "master",
      "elite",
    ],
    fear_of_missing_out: [
      "everyone",
      "trending",
      "viral",
      "popular",
      "in demand",
    ],
    reciprocity: ["free", "gift", "bonus", "included", "extra"],
    likeability: [
      "authentic",
      "genuine",
      "real",
      "honest",
      "transparent",
      "true",
    ],
    aspiration: [
      "success",
      "wealth",
      "freedom",
      "abundance",
      "elite",
      "premium",
    ],
  };

  /**
   * Analyze content for emotional triggers and psychology principles
   */
  analyzeContent(content: string): PsychologyAnalysis {
    const lowerContent = content.toLowerCase();
    const foundTriggers: string[] = [];
    let triggerCount = 0;

    // Detect emotional triggers
    Object.entries(this.emotionalTriggers).forEach(([trigger, keywords]) => {
      keywords.forEach((keyword) => {
        if (lowerContent.includes(keyword)) {
          foundTriggers.push(trigger);
          triggerCount++;
        }
      });
    });

    // Remove duplicates
    const uniqueTriggers = [...new Set(foundTriggers)];

    // Calculate emotional score (0-100)
    const emotionalScore = Math.min(100, triggerCount * 8);

    // Identify psychology principles
    const principles = this.identifyPsychologyPrinciples(
      uniqueTriggers,
      content
    );

    // Generate recommendations
    const recommendations = this.generateRecommendations(
      uniqueTriggers,
      emotionalScore
    );

    // Calculate conversion potential (0-100)
    const conversionPotential = this.calculateConversionPotential(
      emotionalScore,
      uniqueTriggers.length,
      content
    );

    return {
      emotionalScore,
      triggers: uniqueTriggers,
      psychologyPrinciples: principles,
      recommendations,
      conversionPotential,
    };
  }

  /**
   * Analyze copywriting effectiveness
   */
  analyzeCopywriting(
    headline: string,
    body: string,
    cta: string
  ): CopywritingAnalysis {
    const fullCopy = `${headline} ${body} ${cta}`.toLowerCase();

    // Headline score (0-100)
    const headlineScore = this.scoreHeadline(headline);

    // CTA strength (0-100)
    const ctaStrength = this.scoreCTA(cta);

    // Emotional resonance (0-100)
    const emotionalAnalysis = this.analyzeContent(fullCopy);
    const emotionalResonance = emotionalAnalysis.emotionalScore;

    // Trust factors (0-100)
    const trustFactors = this.calculateTrustFactors(fullCopy);

    // Urgency level (0-100)
    const urgencyLevel = this.calculateUrgencyLevel(fullCopy);

    // Overall score (0-100)
    const overallScore = Math.round(
      (headlineScore +
        ctaStrength +
        emotionalResonance +
        trustFactors +
        urgencyLevel) /
        5
    );

    // Generate suggestions
    const suggestions = this.generateCopywritingSuggestions(
      headlineScore,
      ctaStrength,
      emotionalResonance,
      trustFactors,
      urgencyLevel
    );

    return {
      headlineScore,
      ctaStrength,
      emotionalResonance,
      trustFactors,
      urgencyLevel,
      overallScore,
      suggestions,
    };
  }

  /**
   * Score headline effectiveness
   */
  private scoreHeadline(headline: string): number {
    let score = 50;
    const length = headline.length;

    // Optimal headline length is 6-12 words
    const wordCount = headline.split(" ").length;
    if (wordCount >= 6 && wordCount <= 12) score += 15;
    else if (wordCount > 3 && wordCount < 20) score += 5;

    // Check for power words
    const powerWords = [
      "proven",
      "secret",
      "discover",
      "exclusive",
      "guaranteed",
      "revolutionary",
      "ultimate",
      "essential",
    ];
    if (powerWords.some((word) => headline.toLowerCase().includes(word)))
      score += 15;

    // Check for numbers (proven to increase engagement)
    if (/\d+/.test(headline)) score += 10;

    // Check for curiosity gap
    if (headline.includes("?") || headline.includes("...")) score += 10;

    return Math.min(100, score);
  }

  /**
   * Score CTA (Call-to-Action) effectiveness
   */
  private scoreCTA(cta: string): number {
    let score = 50;

    // Check for action verbs
    const actionVerbs = [
      "get",
      "start",
      "discover",
      "learn",
      "join",
      "claim",
      "access",
      "unlock",
      "transform",
      "create",
    ];
    if (actionVerbs.some((verb) => cta.toLowerCase().includes(verb)))
      score += 20;

    // Check for urgency
    if (
      cta.toLowerCase().includes("now") ||
      cta.toLowerCase().includes("today")
    )
      score += 15;

    // Check for benefit
    if (
      cta.toLowerCase().includes("free") ||
      cta.toLowerCase().includes("bonus")
    )
      score += 10;

    // Check length (shorter is better for CTA)
    if (cta.length < 50) score += 10;

    return Math.min(100, score);
  }

  /**
   * Calculate trust factors in content
   */
  private calculateTrustFactors(content: string): number {
    let score = 40;
    const lowerContent = content.toLowerCase();

    // Trust indicators
    const trustIndicators = [
      "certified",
      "proven",
      "trusted",
      "verified",
      "authentic",
      "transparent",
      "guarantee",
      "money-back",
      "satisfaction",
      "secure",
    ];

    trustIndicators.forEach((indicator) => {
      if (lowerContent.includes(indicator)) score += 5;
    });

    // Check for specific numbers/data (increases credibility)
    if (/\d+%|\$\d+|\d+,\d+/.test(content)) score += 10;

    return Math.min(100, score);
  }

  /**
   * Calculate urgency level in content
   */
  private calculateUrgencyLevel(content: string): number {
    let score = 30;
    const lowerContent = content.toLowerCase();

    const urgencyWords = [
      "now",
      "today",
      "limited",
      "only",
      "last chance",
      "ends",
      "hurry",
      "don't wait",
      "exclusive",
      "rare",
    ];

    urgencyWords.forEach((word) => {
      if (lowerContent.includes(word)) score += 5;
    });

    return Math.min(100, score);
  }

  /**
   * Identify psychology principles present in content
   */
  private identifyPsychologyPrinciples(
    triggers: string[],
    content: string
  ): string[] {
    const principles: string[] = [];

    if (triggers.includes("scarcity"))
      principles.push("Scarcity Principle - Limited availability drives urgency");
    if (triggers.includes("urgency"))
      principles.push(
        "Urgency Principle - Time pressure increases conversion"
      );
    if (triggers.includes("social_proof"))
      principles.push(
        "Social Proof - Others' validation builds confidence"
      );
    if (triggers.includes("authority"))
      principles.push("Authority Principle - Expertise builds trust");
    if (triggers.includes("fear_of_missing_out"))
      principles.push("FOMO - Fear of missing out drives action");
    if (triggers.includes("reciprocity"))
      principles.push("Reciprocity - Giving first builds obligation");
    if (triggers.includes("likeability"))
      principles.push("Likeability - Authenticity builds connection");
    if (triggers.includes("aspiration"))
      principles.push("Aspiration - Desire for better future motivates action");

    return principles;
  }

  /**
   * Generate recommendations based on analysis
   */
  private generateRecommendations(
    triggers: string[],
    score: number
  ): string[] {
    const recommendations: string[] = [];

    if (score < 40) {
      recommendations.push(
        "Add more emotional triggers to increase impact (scarcity, urgency, social proof)"
      );
      recommendations.push(
        "Include specific benefits and outcomes for the customer"
      );
    }

    if (!triggers.includes("social_proof")) {
      recommendations.push(
        "Add social proof elements (testimonials, numbers, success stories)"
      );
    }

    if (!triggers.includes("urgency")) {
      recommendations.push(
        "Create urgency with limited-time offers or exclusive access"
      );
    }

    if (!triggers.includes("authority")) {
      recommendations.push(
        "Establish authority with credentials, certifications, or expertise"
      );
    }

    if (!triggers.includes("aspiration")) {
      recommendations.push(
        "Connect to customer aspirations (success, freedom, abundance)"
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        "Excellent emotional trigger profile! Consider A/B testing variations."
      );
    }

    return recommendations;
  }

  /**
   * Calculate conversion potential
   */
  private calculateConversionPotential(
    emotionalScore: number,
    triggerCount: number,
    content: string
  ): number {
    let potential = emotionalScore * 0.6; // 60% weight on emotional score

    // Add trigger diversity bonus
    potential += Math.min(20, triggerCount * 2.5);

    // Check for clear CTA
    if (
      content.toLowerCase().includes("click") ||
      content.toLowerCase().includes("buy") ||
      content.toLowerCase().includes("get") ||
      content.toLowerCase().includes("start")
    ) {
      potential += 10;
    }

    return Math.min(100, Math.round(potential));
  }

  /**
   * Generate copywriting suggestions
   */
  private generateCopywritingSuggestions(
    headlineScore: number,
    ctaScore: number,
    emotionalScore: number,
    trustScore: number,
    urgencyScore: number
  ): string[] {
    const suggestions: string[] = [];

    if (headlineScore < 70) {
      suggestions.push(
        "Strengthen headline with power words (Proven, Secret, Exclusive, Guaranteed)"
      );
      suggestions.push("Include a number in your headline for higher engagement");
    }

    if (ctaScore < 70) {
      suggestions.push(
        "Use action verbs in CTA (Get, Start, Discover, Unlock, Claim)"
      );
      suggestions.push("Add urgency to CTA (Now, Today, Limited Time)");
    }

    if (emotionalScore < 60) {
      suggestions.push(
        "Increase emotional resonance by adding customer benefits and outcomes"
      );
      suggestions.push(
        "Connect to customer aspirations (success, freedom, abundance, impact)"
      );
    }

    if (trustScore < 60) {
      suggestions.push("Add trust signals (certifications, guarantees, reviews)");
      suggestions.push("Include specific data, statistics, or case studies");
    }

    if (urgencyScore < 50) {
      suggestions.push(
        "Create urgency with limited-time offers or exclusive access"
      );
      suggestions.push("Use time-sensitive language (Now, Today, This Week)");
    }

    if (suggestions.length === 0) {
      suggestions.push(
        "Your copy is performing well! Test variations to optimize further."
      );
    }

    return suggestions;
  }
}

export const psychologyEngine = new PsychologyEngine();
export type { PsychologyAnalysis, CopywritingAnalysis };
