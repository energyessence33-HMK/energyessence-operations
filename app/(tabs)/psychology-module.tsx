import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { psychologyEngine } from "@/lib/services/psychology-engine";

interface AnalysisResult {
  type: "content" | "copywriting";
  headline?: string;
  body?: string;
  cta?: string;
  score?: number;
  analysis?: any;
}

export default function PsychologyModuleScreen() {
  const colors = useColors();
  const [selectedTab, setSelectedTab] = useState<"learn" | "analyze">("learn");
  const [contentToAnalyze, setContentToAnalyze] = useState("");
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [cta, setCta] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  const psychologyPrinciples = [
    {
      name: "Scarcity Principle",
      description:
        "Limited availability creates urgency and increases perceived value",
      examples: ["Limited time offer", "Only 5 spots left", "Exclusive access"],
      icon: "⏰",
    },
    {
      name: "Urgency Principle",
      description: "Time pressure motivates immediate action",
      examples: ["Act now", "Today only", "Don't wait"],
      icon: "🚀",
    },
    {
      name: "Social Proof",
      description:
        "People trust decisions made by others in similar situations",
      examples: ["10,000+ customers", "5-star reviews", "Bestseller"],
      icon: "👥",
    },
    {
      name: "Authority Principle",
      description: "Expertise and credentials build trust and credibility",
      examples: ["Certified expert", "Industry leader", "Award winner"],
      icon: "👑",
    },
    {
      name: "Reciprocity",
      description: "Giving first creates obligation to give back",
      examples: ["Free guide", "Bonus included", "Free trial"],
      icon: "🎁",
    },
    {
      name: "Likeability",
      description: "Authentic and relatable communication builds connection",
      examples: ["Personal story", "Authentic voice", "Genuine care"],
      icon: "❤️",
    },
  ];

  /**
   * Analyze content for emotional triggers
   */
  const analyzeContent = () => {
    if (!contentToAnalyze.trim()) {
      alert("Please enter content to analyze");
      return;
    }

    const analysis = psychologyEngine.analyzeContent(contentToAnalyze);
    setAnalysisResult({
      type: "content",
      body: contentToAnalyze,
      score: analysis.conversionPotential,
      analysis,
    });
  };

  /**
   * Analyze copywriting effectiveness
   */
  const analyzeCopywriting = () => {
    if (!headline.trim() || !body.trim() || !cta.trim()) {
      alert("Please fill in headline, body, and CTA");
      return;
    }

    const analysis = psychologyEngine.analyzeCopywriting(headline, body, cta);
    setAnalysisResult({
      type: "copywriting",
      headline,
      body,
      cta,
      score: analysis.overallScore,
      analysis,
    });
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">
              Customer Psychology
            </Text>
            <Text className="text-sm text-muted">
              Master emotional triggers and conversion psychology
            </Text>
          </View>

          {/* Premium Badge */}
          <View className="bg-gradient-to-r from-primary to-primary bg-opacity-10 rounded-lg p-4 border border-primary border-opacity-30">
            <View className="flex-row items-center gap-2">
              <Text className="text-xl">🧠</Text>
              <View className="flex-1">
                <Text className="text-sm font-bold text-primary">
                  Psychology Engine
                </Text>
                <Text className="text-xs text-muted">
                  AI-powered emotional analysis and optimization
                </Text>
              </View>
            </View>
          </View>

          {/* Tab Selection */}
          <View className="flex-row gap-2 bg-surface rounded-lg p-1 border border-border">
            <TouchableOpacity
              onPress={() => setSelectedTab("learn")}
              className={`flex-1 rounded-lg p-3 items-center ${
                selectedTab === "learn" ? "bg-primary" : ""
              }`}
            >
              <Text
                className={`font-semibold ${
                  selectedTab === "learn"
                    ? "text-background"
                    : "text-foreground"
                }`}
              >
                Learn
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab("analyze")}
              className={`flex-1 rounded-lg p-3 items-center ${
                selectedTab === "analyze" ? "bg-primary" : ""
              }`}
            >
              <Text
                className={`font-semibold ${
                  selectedTab === "analyze"
                    ? "text-background"
                    : "text-foreground"
                }`}
              >
                Analyze
              </Text>
            </TouchableOpacity>
          </View>

          {selectedTab === "learn" ? (
            <>
              {/* Psychology Principles */}
              <View className="gap-3">
                <Text className="text-lg font-bold text-foreground">
                  Core Psychology Principles
                </Text>

                {psychologyPrinciples.map((principle) => (
                  <TouchableOpacity
                    key={principle.name}
                    className="bg-surface rounded-lg p-4 border border-border"
                  >
                    <View className="gap-2">
                      <View className="flex-row items-center gap-2">
                        <Text className="text-2xl">{principle.icon}</Text>
                        <Text className="text-base font-semibold text-foreground flex-1">
                          {principle.name}
                        </Text>
                      </View>
                      <Text className="text-sm text-muted">
                        {principle.description}
                      </Text>
                      <View className="gap-1 mt-2">
                        <Text className="text-xs font-semibold text-primary">
                          Examples:
                        </Text>
                        {principle.examples.map((example) => (
                          <Text
                            key={example}
                            className="text-xs text-foreground ml-2"
                          >
                            • {example}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Best Practices */}
              <View className="gap-3">
                <Text className="text-lg font-bold text-foreground">
                  Conversion Best Practices
                </Text>

                <View className="bg-surface rounded-lg p-4 border border-border gap-3">
                  <View className="gap-2">
                    <Text className="text-sm font-semibold text-foreground">
                      Headlines
                    </Text>
                    <Text className="text-xs text-muted">
                      • Use power words (Proven, Secret, Exclusive, Guaranteed)
                    </Text>
                    <Text className="text-xs text-muted">
                      • Include numbers for higher engagement
                    </Text>
                    <Text className="text-xs text-muted">
                      • Optimal length: 6-12 words
                    </Text>
                  </View>

                  <View className="gap-2">
                    <Text className="text-sm font-semibold text-foreground">
                      Body Copy
                    </Text>
                    <Text className="text-xs text-muted">
                      • Focus on benefits, not features
                    </Text>
                    <Text className="text-xs text-muted">
                      • Use specific data and social proof
                    </Text>
                    <Text className="text-xs text-muted">
                      • Tell a story that resonates emotionally
                    </Text>
                  </View>

                  <View className="gap-2">
                    <Text className="text-sm font-semibold text-foreground">
                      Call-to-Action
                    </Text>
                    <Text className="text-xs text-muted">
                      • Use action verbs (Get, Start, Discover, Unlock)
                    </Text>
                    <Text className="text-xs text-muted">
                      • Create urgency (Now, Today, Limited Time)
                    </Text>
                    <Text className="text-xs text-muted">
                      • Keep it short and clear
                    </Text>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              {/* Content Analysis */}
              <View className="gap-3">
                <Text className="text-lg font-bold text-foreground">
                  Analyze Your Content
                </Text>

                <View className="gap-3">
                  <View className="gap-2">
                    <Text className="text-sm font-semibold text-foreground">
                      Content to Analyze
                    </Text>
                    <TextInput
                      className="bg-surface border border-border rounded-lg p-3 text-foreground"
                      placeholder="Paste your content, ad copy, or message..."
                      placeholderTextColor={colors.muted}
                      value={contentToAnalyze}
                      onChangeText={setContentToAnalyze}
                      multiline
                      numberOfLines={5}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={analyzeContent}
                    className="bg-primary rounded-lg p-4 items-center"
                  >
                    <Text className="text-background font-semibold">
                      Analyze Emotional Triggers
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Copywriting Analysis */}
              <View className="gap-3">
                <Text className="text-lg font-bold text-foreground">
                  Copywriting Analysis
                </Text>

                <View className="gap-2">
                  <Text className="text-xs font-semibold text-foreground">
                    Headline
                  </Text>
                  <TextInput
                    className="bg-surface border border-border rounded-lg p-3 text-foreground"
                    placeholder="Your headline..."
                    placeholderTextColor={colors.muted}
                    value={headline}
                    onChangeText={setHeadline}
                  />
                </View>

                <View className="gap-2">
                  <Text className="text-xs font-semibold text-foreground">
                    Body Copy
                  </Text>
                  <TextInput
                    className="bg-surface border border-border rounded-lg p-3 text-foreground"
                    placeholder="Your body copy..."
                    placeholderTextColor={colors.muted}
                    value={body}
                    onChangeText={setBody}
                    multiline
                    numberOfLines={4}
                  />
                </View>

                <View className="gap-2">
                  <Text className="text-xs font-semibold text-foreground">
                    Call-to-Action
                  </Text>
                  <TextInput
                    className="bg-surface border border-border rounded-lg p-3 text-foreground"
                    placeholder="Your CTA..."
                    placeholderTextColor={colors.muted}
                    value={cta}
                    onChangeText={setCta}
                  />
                </View>

                <TouchableOpacity
                  onPress={analyzeCopywriting}
                  className="bg-primary rounded-lg p-4 items-center"
                >
                  <Text className="text-background font-semibold">
                    Analyze Copywriting
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Analysis Results */}
              {analysisResult && (
                <View className="gap-3 bg-surface rounded-lg p-4 border border-border">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-lg font-bold text-foreground">
                      Analysis Results
                    </Text>
                    <View className="bg-primary px-3 py-1 rounded-full">
                      <Text className="text-background font-bold text-lg">
                        {analysisResult.score}%
                      </Text>
                    </View>
                  </View>

                  <View className="h-2 bg-border rounded-full overflow-hidden">
                    <View
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${analysisResult.score || 0}%` }}
                    />
                  </View>

                  {analysisResult.type === "content" &&
                    analysisResult.analysis && (
                      <View className="gap-2">
                        <Text className="text-sm font-semibold text-foreground">
                          Detected Triggers:
                        </Text>
                        {analysisResult.analysis.triggers.map(
                          (trigger: string) => (
                            <View
                              key={trigger}
                              className="bg-background rounded-lg p-2"
                            >
                              <Text className="text-xs text-foreground">
                                ✓ {trigger}
                              </Text>
                            </View>
                          )
                        )}

                        <Text className="text-sm font-semibold text-foreground mt-2">
                          Recommendations:
                        </Text>
                        {analysisResult.analysis.recommendations.map(
                          (rec: string, idx: number) => (
                            <Text key={idx} className="text-xs text-muted">
                              • {rec}
                            </Text>
                          )
                        )}
                      </View>
                    )}

                  {analysisResult.type === "copywriting" &&
                    analysisResult.analysis && (
                      <View className="gap-2">
                        <View className="flex-row justify-between">
                          <Text className="text-xs text-muted">
                            Headline: {analysisResult.analysis.headlineScore}%
                          </Text>
                          <Text className="text-xs text-muted">
                            CTA: {analysisResult.analysis.ctaStrength}%
                          </Text>
                        </View>
                        <View className="flex-row justify-between">
                          <Text className="text-xs text-muted">
                            Emotion: {analysisResult.analysis.emotionalResonance}%
                          </Text>
                          <Text className="text-xs text-muted">
                            Trust: {analysisResult.analysis.trustFactors}%
                          </Text>
                        </View>

                        <Text className="text-sm font-semibold text-foreground mt-2">
                          Suggestions:
                        </Text>
                        {analysisResult.analysis.suggestions.map(
                          (suggestion: string, idx: number) => (
                            <Text key={idx} className="text-xs text-muted">
                              • {suggestion}
                            </Text>
                          )
                        )}
                      </View>
                    )}
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
