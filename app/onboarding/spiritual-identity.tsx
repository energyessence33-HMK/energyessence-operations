import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { SpiritualCompanion } from "@/components/ui/spiritual-companion";
import { MaterialIcons } from "@expo/vector-icons";

export default function SpiritualIdentityScreen() {
  const router = useRouter();
  const colors = useColors();
  const [purpose, setPurpose] = useState("");
  const [values, setValues] = useState<string[]>([]);

  const coreValues = [
    "Integrity",
    "Authenticity",
    "Service",
    "Excellence",
    "Wisdom",
    "Compassion",
    "Creativity",
    "Growth",
  ];

  const toggleValue = (value: string) => {
    setValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

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
              style={{ backgroundColor: colors.border }}
            />
            <View
              className="flex-1 h-1 rounded-full"
              style={{ backgroundColor: colors.border }}
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
            Spiritual Foundation
          </Text>
          <Text
            className="text-base mb-8"
            style={{ color: colors.muted }}
          >
            Align with your divine purpose and core values
          </Text>

          {/* Purpose Section */}
          <View className="mb-8">
            <Text
              className="text-lg font-semibold mb-4"
              style={{ color: colors.foreground }}
            >
              Your Divine Purpose
            </Text>
            <TextInput
              placeholder="What is your purpose in this kingdom?"
              placeholderTextColor={colors.muted}
              value={purpose}
              onChangeText={setPurpose}
              multiline
              numberOfLines={4}
              className="p-4 rounded-xl border border-border text-foreground"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.foreground,
              }}
            />
          </View>

          {/* Core Values Section */}
          <View className="mb-8">
            <Text
              className="text-lg font-semibold mb-4"
              style={{ color: colors.foreground }}
            >
              Select Your Core Values
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {coreValues.map((value) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => toggleValue(value)}
                  className={`px-4 py-2 rounded-full border-2 ${
                    values.includes(value)
                      ? "border-primary"
                      : "border-border"
                  }`}
                  style={{
                    backgroundColor: values.includes(value)
                      ? colors.primary + "33"
                      : "transparent",
                  }}
                >
                  <Text
                    className="font-semibold"
                    style={{
                      color: values.includes(value)
                        ? colors.primary
                        : colors.muted,
                    }}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Affirmation */}
          <View
            className="p-6 rounded-xl border border-primary/30 mb-8"
            style={{ backgroundColor: colors.surface }}
          >
            <View className="flex-row items-start gap-3">
              <MaterialIcons name="auto-awesome" size={24} color={colors.primary} />
              <View className="flex-1">
                <Text
                  className="text-sm font-semibold mb-2"
                  style={{ color: colors.primary }}
                >
                  Divine Truth
                </Text>
                <Text
                  className="text-sm leading-relaxed"
                  style={{ color: colors.foreground }}
                >
                  You are a unique expression of divine consciousness. Your gifts are needed in this world.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="px-6 pb-8 gap-3">
        <TouchableOpacity
          onPress={() => router.push("/onboarding/brand-basics" as any)}
          disabled={!purpose || values.length === 0}
          className="w-full py-4 rounded-xl items-center justify-center"
          style={{
            backgroundColor:
              purpose && values.length > 0 ? colors.primary : colors.border,
          }}
        >
          <Text className="text-white font-bold text-lg">Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/onboarding/welcome" as any)}
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
