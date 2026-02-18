import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { SpiritualCompanion } from "@/components/ui/spiritual-companion";
import { MaterialIcons } from "@expo/vector-icons";

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  colors: { primary: string; accent: string };
  icon: string;
}

const themeOptions: ThemeOption[] = [
  {
    id: "divine-blue",
    name: "Divine Blue",
    description: "Royal authority and spiritual elevation",
    colors: { primary: "#0066FF", accent: "#00D4FF" },
    icon: "auto-awesome",
  },
  {
    id: "golden-amber",
    name: "Golden Amber",
    description: "Abundance and divine prosperity",
    colors: { primary: "#FFB800", accent: "#FFD700" },
    icon: "trending-up",
  },
  {
    id: "violet-light",
    name: "Violet Light",
    description: "Spiritual mastery and transformation",
    colors: { primary: "#9D4EDD", accent: "#E0AAFF" },
    icon: "favorite",
  },
  {
    id: "emerald-green",
    name: "Emerald Green",
    description: "Growth, healing, and renewal",
    colors: { primary: "#00A86B", accent: "#7FFFD4" },
    icon: "eco",
  },
];

export default function SetFrequencyScreen() {
  const router = useRouter();
  const colors = useColors();
  const [selectedTheme, setSelectedTheme] = useState<string>("divine-blue");

  return (
    <ScreenContainer className="justify-between">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="px-6 py-8">
          {/* Progress Indicator */}
          <View className="flex-row items-center gap-2 mb-8">
            <View
              className="flex-1 h-1 rounded-full"
              style={{ backgroundColor: colors.primary }}
            />
            <View
              className="flex-1 h-1 rounded-full"
              style={{ backgroundColor: colors.primary }}
            />
            <View
              className="flex-1 h-1 rounded-full"
              style={{ backgroundColor: colors.primary }}
            />
            <View
              className="flex-1 h-1 rounded-full"
              style={{ backgroundColor: colors.border }}
            />
          </View>

          {/* Header */}
          <Text
            className="text-3xl font-bold mb-2"
            style={{ color: colors.foreground }}
          >
            Set Your Frequency
          </Text>
          <Text
            className="text-base mb-8"
            style={{ color: colors.muted }}
          >
            Choose a theme that resonates with your energy
          </Text>

          {/* Theme Options */}
          <View className="gap-4 mb-8">
            {themeOptions.map((theme) => (
              <TouchableOpacity
                key={theme.id}
                onPress={() => setSelectedTheme(theme.id)}
                className={`p-6 rounded-xl border-2 ${
                  selectedTheme === theme.id ? "border-primary" : "border-border"
                }`}
                style={{
                  backgroundColor:
                    selectedTheme === theme.id
                      ? colors.surface
                      : colors.surface + "80",
                }}
              >
                <View className="flex-row items-start gap-4">
                  <View
                    className="w-14 h-14 rounded-lg items-center justify-center"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    <MaterialIcons name={theme.icon as any} size={28} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text
                      className="text-lg font-bold mb-1"
                      style={{ color: colors.foreground }}
                    >
                      {theme.name}
                    </Text>
                    <Text
                      className="text-sm"
                      style={{ color: colors.muted }}
                    >
                      {theme.description}
                    </Text>
                  </View>
                  {selectedTheme === theme.id && (
                    <MaterialIcons name="check-circle" size={24} color={colors.primary} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Frequency Info */}
          <View
            className="p-6 rounded-xl border border-primary/30 mb-8"
            style={{ backgroundColor: colors.surface }}
          >
            <View className="flex-row items-start gap-3">
              <MaterialIcons name="info" size={24} color={colors.primary} />
              <View className="flex-1">
                <Text
                  className="text-sm font-semibold mb-2"
                  style={{ color: colors.primary }}
                >
                  What is Frequency?
                </Text>
                <Text
                  className="text-sm leading-relaxed"
                  style={{ color: colors.foreground }}
                >
                  Your frequency is the energetic vibration you emit. It attracts opportunities, people, and circumstances that match your internal state.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="px-6 pb-8 gap-3">
        <TouchableOpacity
          onPress={() => router.push("/onboarding/first-video" as any)}
          className="w-full py-4 rounded-xl items-center justify-center"
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="text-white font-bold text-lg">Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/onboarding/brand-basics" as any)}
          className="w-full py-4 rounded-xl items-center justify-center border-2"
          style={{ borderColor: colors.primary }}
        >
          <Text className="font-semibold text-lg" style={{ color: colors.primary }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>

      <SpiritualCompanion visible={true} />
    </ScreenContainer>
  );
}
