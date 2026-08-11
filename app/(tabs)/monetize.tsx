import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { PrintifyGovernanceCard } from "@/components/commerce/printify-governance-card";

interface MonetizationModel {
  id: string;
  name: string;
  description: string;
  icon: string;
  potential: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: number;
}

export default function MonetizeScreen() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const monetizationModels: MonetizationModel[] = [
    {
      id: "1",
      name: "Digital Products",
      description: "eBooks, templates, courses",
      icon: "📚",
      potential: "High",
    },
    {
      id: "2",
      name: "Services",
      description: "Consulting, coaching, done-for-you",
      icon: "🎯",
      potential: "Very High",
    },
    {
      id: "3",
      name: "Memberships",
      description: "Recurring revenue model",
      icon: "🔑",
      potential: "High",
    },
    {
      id: "4",
      name: "Affiliate Marketing",
      description: "Promote others' products",
      icon: "🤝",
      potential: "Medium",
    },
    {
      id: "5",
      name: "Sponsorships",
      description: "Brand partnerships",
      icon: "🏢",
      potential: "Medium",
    },
    {
      id: "6",
      name: "Passive Income",
      description: "Royalties, licensing, investments",
      icon: "💎",
      potential: "Very High",
    },
  ];

  const modules: Module[] = [
    {
      id: "1",
      title: "Monetization Models",
      description: "Understand all revenue streams",
      lessons: 6,
    },
    {
      id: "2",
      title: "Pricing Psychology",
      description: "Premium pricing strategies",
      lessons: 5,
    },
    {
      id: "3",
      title: "Product Creation",
      description: "From idea to launch",
      lessons: 8,
    },
    {
      id: "4",
      title: "Sales Funnel Mastery",
      description: "Complete customer journey",
      lessons: 7,
    },
    {
      id: "5",
      title: "Financial Projections",
      description: "Revenue forecasting",
      lessons: 4,
    },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Monetize</Text>
            <Text className="text-sm text-muted">
              How to Get Paid 2 Exist
            </Text>
          </View>

          {/* Premium Badge */}
          <View className="bg-gradient-to-r from-primary to-primary bg-opacity-10 rounded-lg p-4 border border-primary border-opacity-30">
              <View className="flex-row items-center gap-2">
              <Text className="text-xl font-bold text-primary">KE</Text>
              <View className="flex-1">
                <Text className="text-sm font-bold text-primary">
                  Governed Monetization System
                </Text>
                <Text className="text-xs text-muted">
                  Build commercial systems with review points, clear ownership, and accountable execution.
                </Text>
              </View>
            </View>
          </View>

          {!selectedModel ? (
            <>
              {/* Monetization Models */}
              <View className="gap-3">
                <Text className="text-lg font-bold text-foreground">
                  Revenue Streams
                </Text>

                {monetizationModels.map((model) => (
                  <TouchableOpacity
                    key={model.id}
                    onPress={() => setSelectedModel(model.id)}
                    className="bg-surface rounded-lg p-4 border border-border"
                  >
                    <View className="gap-2">
                      <View className="flex-row items-start justify-between">
                        <View className="flex-1 gap-1">
                          <View className="flex-row items-center gap-2">
                            <Text className="text-2xl">{model.icon}</Text>
                            <Text className="text-base font-semibold text-foreground">
                              {model.name}
                            </Text>
                          </View>
                          <Text className="text-sm text-muted">
                            {model.description}
                          </Text>
                        </View>
                        <View className="bg-primary px-2 py-1 rounded-full">
                          <Text className="text-xs font-bold text-background">
                            {model.potential}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <PrintifyGovernanceCard />

              {/* Learning Modules */}
              <View className="gap-3">
                <Text className="text-lg font-bold text-foreground">
                  Learning Modules
                </Text>

                {modules.map((module) => (
                  <TouchableOpacity
                    key={module.id}
                    className="bg-surface rounded-lg p-4 border border-border"
                  >
                    <View className="gap-2">
                      <Text className="text-base font-semibold text-foreground">
                        {module.title}
                      </Text>
                      <Text className="text-sm text-muted">
                        {module.description}
                      </Text>
                      <Text className="text-xs text-primary font-semibold">
                        {module.lessons} lessons
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Income Tracker */}
              <View className="gap-3">
                <Text className="text-lg font-bold text-foreground">
                  Your Income Dashboard
                </Text>
                <View className="bg-surface rounded-lg p-4 border border-border gap-3">
                  <View className="gap-1">
                    <Text className="text-xs text-muted">Commerce data</Text>
                    <Text className="text-base font-semibold text-foreground">Not connected</Text>
                  </View>
                  <View className="gap-1">
                    <Text className="text-xs text-muted">
                      Activation boundary
                    </Text>
                    <Text className="text-sm font-semibold text-foreground">
                      Provider approval required
                    </Text>
                  </View>
                </View>
              </View>

              {/* Get Started */}
              <TouchableOpacity className="bg-primary rounded-lg p-4 items-center">
                <Text className="text-background font-semibold">
                  Start Your Monetization Journey
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Model Detail */}
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 gap-1">
                    <Text className="text-lg font-bold text-foreground">
                      {monetizationModels.find((m) => m.id === selectedModel)
                        ?.name}
                    </Text>
                    <Text className="text-sm text-muted">
                      {monetizationModels.find((m) => m.id === selectedModel)
                        ?.description}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setSelectedModel(null)}>
                    <Text className="text-primary font-semibold">Back</Text>
                  </TouchableOpacity>
                </View>

                {/* Implementation Steps */}
                <View className="gap-3">
                  <Text className="text-sm font-semibold text-foreground">
                    Implementation Steps
                  </Text>

                  {[1, 2, 3, 4, 5].map((step) => (
                    <View
                      key={step}
                      className="bg-surface rounded-lg p-4 border border-border flex-row items-start gap-3"
                    >
                      <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                        <Text className="text-background font-bold text-sm">
                          {step}
                        </Text>
                      </View>
                      <View className="flex-1 gap-1">
                        <Text className="text-sm font-semibold text-foreground">
                          Step {step}: Key Action
                        </Text>
                        <Text className="text-xs text-muted">
                          Detailed guidance and resources
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Tools & Resources */}
                <View className="gap-3">
                  <Text className="text-sm font-semibold text-foreground">
                    Tools & Resources
                  </Text>

                  <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border">
                    <Text className="text-sm font-semibold text-foreground">
                      📊 Pricing Calculator
                    </Text>
                    <Text className="text-xs text-muted mt-1">
                      Calculate optimal pricing
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border">
                    <Text className="text-sm font-semibold text-foreground">
                      📈 Revenue Projector
                    </Text>
                    <Text className="text-xs text-muted mt-1">
                      Forecast your income
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border">
                    <Text className="text-sm font-semibold text-foreground">
                      📋 Launch Checklist
                    </Text>
                    <Text className="text-xs text-muted mt-1">
                      Step-by-step launch guide
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Start Button */}
                <TouchableOpacity className="bg-primary rounded-lg p-4 items-center mt-4">
                  <Text className="text-background font-semibold">
                    Start This Revenue Stream
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
