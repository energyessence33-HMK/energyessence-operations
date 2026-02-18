import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { SpiritualCompanion } from "@/components/ui/spiritual-companion";
import { MaterialIcons } from "@expo/vector-icons";

export default function WelcomeScreen() {
  const router = useRouter();
  const colors = useColors();

  return (
    <ScreenContainer className="justify-between">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center px-6 py-12">
          {/* Logo */}
          <View
            className="w-20 h-20 rounded-2xl items-center justify-center mb-8"
            style={{ backgroundColor: colors.primary }}
          >
            <MaterialIcons name="auto-awesome" size={48} color={colors.foreground} />
          </View>

          {/* Title */}
          <Text
            className="text-4xl font-bold text-center mb-4"
            style={{ color: colors.foreground }}
          >
            Welcome to Kingdom Executor
          </Text>

          {/* Subtitle */}
          <Text
            className="text-lg text-center mb-8 leading-relaxed"
            style={{ color: colors.muted }}
          >
            Your Divine Platform for Brand Mastery, Content Creation, and Spiritual Alignment
          </Text>

          {/* Features */}
          <View className="w-full gap-4 mb-12">
            {[
              {
                icon: "favorite",
                title: "Spiritual Foundation",
                desc: "Align with Christ consciousness",
              },
              {
                icon: "palette",
                title: "Brand Mastery",
                desc: "Create your divine brand identity",
              },
              {
                icon: "videocam",
                title: "AI Video Creation",
                desc: "Generate professional content instantly",
              },
              {
                icon: "trending-up",
                title: "Monetization",
                desc: "Learn to get paid for your essence",
              },
            ].map((feature, idx) => (
              <View
                key={idx}
                className="flex-row items-start gap-4 p-4 rounded-xl"
                style={{ backgroundColor: colors.surface }}
              >
                <View
                  className="w-12 h-12 rounded-lg items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: colors.primary + "33" }}
                >
                  <MaterialIcons name={feature.icon as any} size={24} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold mb-1"
                    style={{ color: colors.foreground }}
                  >
                    {feature.title}
                  </Text>
                  <Text
                    className="text-sm"
                    style={{ color: colors.muted }}
                  >
                    {feature.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* CTA Button */}
      <View className="px-6 pb-8 gap-3">
        <TouchableOpacity
          onPress={() => router.push("/onboarding/spiritual-identity" as any)}
          className="w-full py-4 rounded-xl items-center justify-center"
          style={{ backgroundColor: colors.primary }}
        >
          <Text className="text-white font-bold text-lg">Begin Your Journey</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)" as any)}
          className="w-full py-4 rounded-xl items-center justify-center border-2"
          style={{ borderColor: colors.primary }}
        >
          <Text className="font-semibold text-lg" style={{ color: colors.primary }}>
            Skip for Now
          </Text>
        </TouchableOpacity>
      </View>

      {/* Spiritual Companion */}
      <SpiritualCompanion visible={true} />
    </ScreenContainer>
  );
}
