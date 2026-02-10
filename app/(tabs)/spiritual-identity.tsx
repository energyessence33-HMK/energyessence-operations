import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface IdentityStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function SpiritualIdentityScreen() {
  const colors = useColors();
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [journeySteps, setJourneySteps] = useState<IdentityStep[]>([
    {
      id: "1",
      title: "Find Your Essence",
      description: "Discover your true identity in Christ consciousness",
      completed: false,
    },
    {
      id: "2",
      title: "Align Your Values",
      description: "Define core values aligned with divine purpose",
      completed: false,
    },
    {
      id: "3",
      title: "Craft Your Purpose",
      description: "Create authentic purpose statement",
      completed: false,
    },
    {
      id: "4",
      title: "Build Your Brand",
      description: "Transform identity into brand positioning",
      completed: false,
    },
  ]);

  const [affirmation, setAffirmation] = useState(
    "I am aligned with my true essence and divine purpose"
  );
  const [alignmentScore, setAlignmentScore] = useState(78);

  const toggleStep = (id: string) => {
    setJourneySteps(
      journeySteps.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    );
  };

  const completedSteps = journeySteps.filter((s) => s.completed).length;

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">
              Spiritual Identity
            </Text>
            <Text className="text-sm text-muted">
              Discover your essence in Christ consciousness
            </Text>
          </View>

          {/* Daily Affirmation */}
          <View className="bg-gradient-to-r from-primary to-primary bg-opacity-10 rounded-xl p-6 border border-primary border-opacity-30">
            <Text className="text-xs font-semibold text-primary mb-3">
              TODAY'S AFFIRMATION
            </Text>
            <Text className="text-lg font-bold text-foreground leading-relaxed">
              {affirmation}
            </Text>
            <TouchableOpacity className="mt-4 bg-primary rounded-lg p-3 items-center">
              <Text className="text-background font-semibold text-sm">
                Meditate on This
              </Text>
            </TouchableOpacity>
          </View>

          {/* Alignment Score */}
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-sm font-semibold text-foreground">
                Spiritual Alignment Score
              </Text>
              <Text className="text-2xl font-bold text-primary">
                {alignmentScore}%
              </Text>
            </View>
            <View className="h-2 bg-border rounded-full overflow-hidden">
              <View
                className="h-full bg-primary rounded-full"
                style={{ width: `${alignmentScore}%` }}
              />
            </View>
            <Text className="text-xs text-muted mt-2">
              Based on daily practices and alignment check-ins
            </Text>
          </View>

          {/* Identity Discovery Journey */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">
              Identity Discovery Journey
            </Text>
            <Text className="text-sm text-muted">
              {completedSteps} of {journeySteps.length} completed
            </Text>

            {journeySteps.map((step) => (
              <TouchableOpacity
                key={step.id}
                onPress={() => setSelectedStep(step.id)}
                className={`rounded-lg p-4 border ${
                  step.completed
                    ? "bg-success bg-opacity-10 border-success"
                    : "bg-surface border-border"
                }`}
              >
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 gap-1">
                    <Text
                      className={`font-semibold ${
                        step.completed ? "text-success" : "text-foreground"
                      }`}
                    >
                      {step.title}
                    </Text>
                    <Text className="text-xs text-muted">
                      {step.description}
                    </Text>
                  </View>
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                      step.completed
                        ? "bg-success border-success"
                        : "border-border"
                    }`}
                  >
                    {step.completed && (
                      <Text className="text-background font-bold">✓</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Core Values */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">
              Your Core Values
            </Text>
            <View className="gap-2">
              {[
                "Authenticity",
                "Alignment",
                "Abundance",
                "Service",
                "Truth",
              ].map((value) => (
                <View
                  key={value}
                  className="bg-surface rounded-lg p-3 border border-border flex-row items-center justify-between"
                >
                  <Text className="text-foreground font-medium">{value}</Text>
                  <View className="w-4 h-4 rounded-full bg-primary" />
                </View>
              ))}
            </View>
          </View>

          {/* Purpose Statement */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">
              Your Purpose Statement
            </Text>
            <View className="bg-surface rounded-lg p-4 border border-border">
              <Text className="text-sm text-foreground leading-relaxed">
                "I create authentic, Christ-aligned content that serves others
                and generates abundance through truth, alignment, and divine
                purpose."
              </Text>
            </View>
            <TouchableOpacity className="bg-primary rounded-lg p-3 items-center">
              <Text className="text-background font-semibold">Edit Purpose</Text>
            </TouchableOpacity>
          </View>

          {/* Alignment Check-In */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">
              Daily Alignment Check-In
            </Text>
            <TouchableOpacity className="bg-primary rounded-lg p-4 items-center">
              <Text className="text-background font-semibold">
                Start 5-Minute Check-In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
