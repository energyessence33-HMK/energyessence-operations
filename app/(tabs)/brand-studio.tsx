import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";

interface BrandTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  premium: boolean;
}

export default function BrandStudioScreen() {
  // const colors = useColors(); // Theme colors for styling
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const brandTools: BrandTool[] = [
    {
      id: "1",
      name: "Brand Strategy",
      description: "Professional positioning framework",
      icon: "📋",
      premium: true,
    },
    {
      id: "2",
      name: "Logo Generator",
      description: "AI-powered logo creation",
      icon: "🎨",
      premium: true,
    },
    {
      id: "3",
      name: "Color Palette",
      description: "Psychology-based color selection",
      icon: "🎭",
      premium: true,
    },
    {
      id: "4",
      name: "Brand Voice",
      description: "Messaging and tone framework",
      icon: "💬",
      premium: true,
    },
    {
      id: "5",
      name: "Competitor Analysis",
      description: "Market positioning insights",
      icon: "📊",
      premium: true,
    },
    {
      id: "6",
      name: "Brand Guidelines",
      description: "Professional brand book",
      icon: "📖",
      premium: true,
    },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">
              Brand Studio
            </Text>
            <Text className="text-sm text-muted">
              Elite professional branding tools
            </Text>
          </View>

          {/* Premium Badge */}
          <View className="bg-gradient-to-r from-primary to-primary bg-opacity-10 rounded-lg p-4 border border-primary border-opacity-30">
            <View className="flex-row items-center gap-2">
              <Text className="text-xl">👑</Text>
              <View className="flex-1">
                <Text className="text-sm font-bold text-primary">
                  Premium Branding Suite
                </Text>
                <Text className="text-xs text-muted">
                  Professional-grade tools for elite brands
                </Text>
              </View>
            </View>
          </View>

          {!selectedTool ? (
            <>
              {/* Brand Tools Grid */}
              <View className="gap-3">
                <Text className="text-lg font-bold text-foreground">
                  Available Tools
                </Text>
                {brandTools.map((tool) => (
                  <TouchableOpacity
                    key={tool.id}
                    onPress={() => setSelectedTool(tool.id)}
                    className="bg-surface rounded-lg p-4 border border-border"
                  >
                    <View className="flex-row items-start gap-3">
                      <Text className="text-3xl">{tool.icon}</Text>
                      <View className="flex-1 gap-1">
                        <View className="flex-row items-center justify-between">
                          <Text className="text-base font-semibold text-foreground">
                            {tool.name}
                          </Text>
                          {tool.premium && (
                            <View className="bg-primary px-2 py-1 rounded-full">
                              <Text className="text-xs font-bold text-background">
                                ELITE
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text className="text-sm text-muted">
                          {tool.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Quick Start */}
              <View className="gap-3 mt-4">
                <Text className="text-lg font-bold text-foreground">
                  Quick Start
                </Text>
                <TouchableOpacity className="bg-primary rounded-lg p-4 items-center">
                  <Text className="text-background font-semibold">
                    Start Brand Strategy Questionnaire
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {/* Tool Detail View */}
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-foreground">
                    {brandTools.find((t) => t.id === selectedTool)?.name}
                  </Text>
                  <TouchableOpacity onPress={() => setSelectedTool(null)}>
                    <Text className="text-primary font-semibold">Back</Text>
                  </TouchableOpacity>
                </View>

                {selectedTool === "1" && (
                  <View className="gap-4">
                    <Text className="text-base font-semibold text-foreground">
                      Brand Strategy Questionnaire
                    </Text>
                    <View className="bg-surface rounded-lg p-4 border border-border gap-3">
                      <View className="gap-2">
                        <Text className="text-sm font-semibold text-foreground">
                          What is your core mission?
                        </Text>
                        <View className="bg-background rounded-lg p-3 border border-border">
                          <Text className="text-xs text-muted">
                            Your answer here...
                          </Text>
                        </View>
                      </View>
                      <View className="gap-2">
                        <Text className="text-sm font-semibold text-foreground">
                          Who is your ideal customer?
                        </Text>
                        <View className="bg-background rounded-lg p-3 border border-border">
                          <Text className="text-xs text-muted">
                            Your answer here...
                          </Text>
                        </View>
                      </View>
                      <View className="gap-2">
                        <Text className="text-sm font-semibold text-foreground">
                          What makes you unique?
                        </Text>
                        <View className="bg-background rounded-lg p-3 border border-border">
                          <Text className="text-xs text-muted">
                            Your answer here...
                          </Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity className="bg-primary rounded-lg p-4 items-center">
                      <Text className="text-background font-semibold">
                        Generate Strategy
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {selectedTool === "2" && (
                  <View className="gap-4">
                    <Text className="text-base font-semibold text-foreground">
                      AI Logo Generator
                    </Text>
                    <View className="bg-surface rounded-lg p-6 border border-border items-center justify-center h-48">
                      <Text className="text-foreground text-center">
                        Logo Preview Area
                      </Text>
                    </View>
                    <TouchableOpacity className="bg-primary rounded-lg p-4 items-center">
                      <Text className="text-background font-semibold">
                        Generate Logo
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {selectedTool === "3" && (
                  <View className="gap-4">
                    <Text className="text-base font-semibold text-foreground">
                      Color Palette Generator
                    </Text>
                    <View className="gap-2">
                      {[
                        { name: "Primary", color: "#0a7ea4" },
                        { name: "Accent", color: "#D4AF37" },
                        { name: "Success", color: "#22C55E" },
                        { name: "Warning", color: "#F59E0B" },
                      ].map((palette) => (
                        <View
                          key={palette.name}
                          className="flex-row items-center gap-3 bg-surface rounded-lg p-3 border border-border"
                        >
                          <View
                            className="w-12 h-12 rounded-lg"
                            style={{ backgroundColor: palette.color }}
                          />
                          <View className="flex-1">
                            <Text className="font-semibold text-foreground">
                              {palette.name}
                            </Text>
                            <Text className="text-xs text-muted">
                              {palette.color}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                    <TouchableOpacity className="bg-primary rounded-lg p-4 items-center">
                      <Text className="text-background font-semibold">
                        Generate Palette
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {selectedTool === "4" && (
                  <View className="gap-4">
                    <Text className="text-base font-semibold text-foreground">
                      Brand Voice & Messaging
                    </Text>
                    <View className="bg-surface rounded-lg p-4 border border-border gap-3">
                      <View className="gap-2">
                        <Text className="text-sm font-semibold text-foreground">
                          Brand Tone
                        </Text>
                        <Text className="text-sm text-muted">
                          Professional, authentic, inspiring
                        </Text>
                      </View>
                      <View className="gap-2">
                        <Text className="text-sm font-semibold text-foreground">
                          Key Messages
                        </Text>
                        <Text className="text-sm text-muted">
                          Authenticity • Alignment • Abundance
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity className="bg-primary rounded-lg p-4 items-center">
                      <Text className="text-background font-semibold">
                        Customize Voice
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {selectedTool === "5" && (
                  <View className="gap-4">
                    <Text className="text-base font-semibold text-foreground">
                      Competitor Analysis
                    </Text>
                    <View className="bg-surface rounded-lg p-4 border border-border">
                      <Text className="text-sm text-muted">
                        Analyze your competitors and find your unique positioning
                      </Text>
                    </View>
                    <TouchableOpacity className="bg-primary rounded-lg p-4 items-center">
                      <Text className="text-background font-semibold">
                        Start Analysis
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {selectedTool === "6" && (
                  <View className="gap-4">
                    <Text className="text-base font-semibold text-foreground">
                      Brand Guidelines
                    </Text>
                    <View className="bg-surface rounded-lg p-4 border border-border">
                      <Text className="text-sm text-muted">
                        Generate a professional brand book with all your brand
                        standards
                      </Text>
                    </View>
                    <TouchableOpacity className="bg-primary rounded-lg p-4 items-center">
                      <Text className="text-background font-semibold">
                        Generate Brand Book
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
