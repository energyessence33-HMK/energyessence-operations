import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { SpiritualCompanion } from "@/components/ui/spiritual-companion";
import { MaterialIcons } from "@expo/vector-icons";

export default function BrandBasicsScreen() {
  const router = useRouter();
  const colors = useColors();
  const [brandName, setBrandName] = useState("");
  const [tagline, setTagline] = useState("");
  const [audience, setAudience] = useState("");

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
            Brand Basics
          </Text>
          <Text
            className="text-base mb-8"
            style={{ color: colors.muted }}
          >
            Define your brand identity and market position
          </Text>

          {/* Brand Name */}
          <View className="mb-6">
            <Text
              className="text-sm font-semibold mb-2"
              style={{ color: colors.foreground }}
            >
              Brand Name
            </Text>
            <TextInput
              placeholder="Your brand name"
              placeholderTextColor={colors.muted}
              value={brandName}
              onChangeText={setBrandName}
              className="p-4 rounded-xl border border-border text-foreground"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.foreground,
              }}
            />
          </View>

          {/* Tagline */}
          <View className="mb-6">
            <Text
              className="text-sm font-semibold mb-2"
              style={{ color: colors.foreground }}
            >
              Brand Tagline
            </Text>
            <TextInput
              placeholder="Your brand promise in one line"
              placeholderTextColor={colors.muted}
              value={tagline}
              onChangeText={setTagline}
              className="p-4 rounded-xl border border-border text-foreground"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.foreground,
              }}
            />
          </View>

          {/* Target Audience */}
          <View className="mb-8">
            <Text
              className="text-sm font-semibold mb-2"
              style={{ color: colors.foreground }}
            >
              Target Audience
            </Text>
            <TextInput
              placeholder="Who do you serve?"
              placeholderTextColor={colors.muted}
              value={audience}
              onChangeText={setAudience}
              multiline
              numberOfLines={3}
              className="p-4 rounded-xl border border-border text-foreground"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.foreground,
              }}
            />
          </View>

          {/* Tip */}
          <View
            className="p-6 rounded-xl border border-primary/30 mb-8"
            style={{ backgroundColor: colors.surface }}
          >
            <View className="flex-row items-start gap-3">
              <MaterialIcons name="lightbulb" size={24} color={colors.primary} />
              <View className="flex-1">
                <Text
                  className="text-sm font-semibold mb-2"
                  style={{ color: colors.primary }}
                >
                  Pro Tip
                </Text>
                <Text
                  className="text-sm leading-relaxed"
                  style={{ color: colors.foreground }}
                >
                  Your brand is not what you say, it's what people feel when they interact with you.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="px-6 pb-8 gap-3">
        <TouchableOpacity
          onPress={() => router.push("/onboarding/set-frequency" as any)}
          disabled={!brandName || !tagline || !audience}
          className="w-full py-4 rounded-xl items-center justify-center"
          style={{
            backgroundColor:
              brandName && tagline && audience ? colors.primary : colors.border,
          }}
        >
          <Text className="text-white font-bold text-lg">Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/onboarding/spiritual-identity" as any)}
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
