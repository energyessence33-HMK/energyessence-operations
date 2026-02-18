import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { SpiritualCompanion } from "@/components/ui/spiritual-companion";
import { MaterialIcons } from "@expo/vector-icons";

export default function FirstVideoScreen() {
  const router = useRouter();
  const colors = useColors();

  const steps = [
    {
      icon: "edit",
      title: "Write Your Script",
      description: "Compose a compelling message aligned with your brand",
    },
    {
      icon: "videocam",
      title: "Generate Video",
      description: "AI creates professional 1-min or 3-min videos instantly",
    },
    {
      icon: "share",
      title: "Share & Monetize",
      description: "Post to social media and start earning from your content",
    },
  ];

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
              style={{ backgroundColor: colors.primary }}
            />
          </View>

          {/* Header */}
          <Text
            className="text-3xl font-bold mb-2"
            style={{ color: colors.foreground }}
          >
            Create Your First Video
          </Text>
          <Text
            className="text-base mb-8"
            style={{ color: colors.muted }}
          >
            Transform your message into professional video content
          </Text>

          {/* Video Preview */}
          <View
            className="w-full h-48 rounded-xl items-center justify-center mb-8 border-2 border-dashed"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.primary,
            }}
          >
            <MaterialIcons name="videocam" size={64} color={colors.primary} />
            <Text
              className="text-sm mt-4"
              style={{ color: colors.muted }}
            >
              Your first video will appear here
            </Text>
          </View>

          {/* Steps */}
          <View className="mb-8">
            <Text
              className="text-lg font-semibold mb-4"
              style={{ color: colors.foreground }}
            >
              How It Works
            </Text>
            {steps.map((step, idx) => (
              <View key={idx} className="flex-row gap-4 mb-4">
                <View
                  className="w-12 h-12 rounded-lg items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.primary + "33" }}
                >
                  <Text
                    className="font-bold text-lg"
                    style={{ color: colors.primary }}
                  >
                    {idx + 1}
                  </Text>
                </View>
                <View className="flex-1 justify-center">
                  <Text
                    className="font-semibold mb-1"
                    style={{ color: colors.foreground }}
                  >
                    {step.title}
                  </Text>
                  <Text
                    className="text-sm"
                    style={{ color: colors.muted }}
                  >
                    {step.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Benefits */}
          <View
            className="p-6 rounded-xl border border-primary/30 mb-8"
            style={{ backgroundColor: colors.surface }}
          >
            <View className="flex-row items-start gap-3">
              <MaterialIcons name="star" size={24} color={colors.primary} />
              <View className="flex-1">
                <Text
                  className="text-sm font-semibold mb-2"
                  style={{ color: colors.primary }}
                >
                  Why Video?
                </Text>
                <Text
                  className="text-sm leading-relaxed"
                  style={{ color: colors.foreground }}
                >
                  Video is the most powerful medium for emotional connection. It increases engagement by 1200% and conversion by 80%.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="px-6 pb-8 gap-3">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/video-generator-enhanced" as any)}
          className="w-full py-4 rounded-xl items-center justify-center"
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="text-white font-bold text-lg">Create Your First Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/" as any)}
          className="w-full py-4 rounded-xl items-center justify-center border-2"
          style={{ borderColor: colors.primary }}
        >
          <Text className="font-semibold text-lg" style={{ color: colors.primary }}>
            Skip to Dashboard
          </Text>
        </TouchableOpacity>
      </View>

      <SpiritualCompanion visible={true} />
    </ScreenContainer>
  );
}
