import { View, Text, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { useColors } from "@/hooks/use-colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  useCompanionBreathing,
  useCompanionGlow,
  useCompanionFloat,
  useCompanionPulse,
  useCompanionBounce,
  useCompanionWave,
  useCompanionSparkle,
} from "@/lib/animations/companion-animations";
import { AFFIRMATIONS, getRandomAffirmation, getAffirmationOfTheDay } from "@/lib/data/affirmations";

interface EnhancedSpiritualCompanionProps {
  isVisible?: boolean;
  onClose?: () => void;
  showDaily?: boolean;
}

export function EnhancedSpiritualCompanion({
  isVisible = true,
  onClose,
  showDaily = false,
}: EnhancedSpiritualCompanionProps) {
  const colors = useColors();
  const [currentAffirmation, setCurrentAffirmation] = useState(getAffirmationOfTheDay());
  const [showAffirmation, setShowAffirmation] = useState(showDaily);
  const [animationMode, setAnimationMode] = useState<
    "breathing" | "floating" | "pulsing" | "bouncing" | "waving"
  >("breathing");

  const breathing = useCompanionBreathing();
  const glow = useCompanionGlow();
  const float = useCompanionFloat();
  const pulse = useCompanionPulse();
  const bounce = useCompanionBounce();
  const wave = useCompanionWave();
  const sparkle = useCompanionSparkle();

  useEffect(() => {
    if (isVisible) {
      breathing.startBreathing();
      glow.startGlow();
      float.startFloating();
    }
  }, [isVisible]);

  const handleNewAffirmation = () => {
    const newAffirmation = getRandomAffirmation();
    setCurrentAffirmation(newAffirmation);
    pulse.triggerPulse();
    sparkle.triggerSparkle();
  };

  const handleCompanionTap = () => {
    bounce.triggerBounce();
    wave.triggerWave();
  };

  const getAnimationStyle = () => {
    switch (animationMode) {
      case "floating":
        return float.animatedStyle;
      case "pulsing":
        return pulse.animatedStyle;
      case "bouncing":
        return bounce.animatedStyle;
      case "waving":
        return wave.animatedStyle;
      default:
        return breathing.animatedStyle;
    }
  };

  if (!isVisible) return null;

  return (
    <View className="flex-1 items-center justify-center px-4">
      {/* Glow Effect Background */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: 150,
            backgroundColor: colors.primary + "20",
          },
          glow.animatedStyle,
        ]}
      />

      {/* Main Companion Container */}
      <Animated.View
        style={[
          {
            alignItems: "center",
            zIndex: 10,
          },
          getAnimationStyle(),
        ]}
      >
        {/* Companion Character */}
        <TouchableOpacity
          onPress={handleCompanionTap}
          activeOpacity={0.8}
          className="items-center justify-center"
        >
          {/* Placeholder for pixel guardian - using icon */}
          <View
            className="w-32 h-32 rounded-full items-center justify-center"
            style={{
              backgroundColor: colors.primary + "30",
              borderWidth: 3,
              borderColor: colors.primary,
            }}
          >
            <MaterialIcons name="favorite" size={64} color={colors.primary} />
          </View>

          {/* Sparkle Effect */}
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 10,
                right: 10,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: "#FFD700",
              },
              sparkle.animatedStyle,
            ]}
          />
        </TouchableOpacity>

        {/* Companion Name */}
        <Text
          className="text-xl font-bold mt-6 text-center"
          style={{ color: colors.foreground }}
        >
          Divine Guide
        </Text>
        <Text
          className="text-xs text-center mt-1"
          style={{ color: colors.muted }}
        >
          Your Spiritual Companion
        </Text>
      </Animated.View>

      {/* Affirmation Display */}
      {showAffirmation && currentAffirmation && (
        <View className="mt-12 w-full max-w-sm">
          <View
            className="p-6 rounded-2xl border-2"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.primary + "50",
            }}
          >
            <View className="flex-row items-center mb-3">
              <MaterialIcons name="lightbulb" size={20} color={colors.primary} />
              <Text
                className="ml-2 font-semibold text-sm"
                style={{ color: colors.primary }}
              >
                {currentAffirmation.category.toUpperCase()}
              </Text>
            </View>

            <Text
              className="text-base leading-relaxed text-center font-semibold"
              style={{ color: colors.foreground }}
            >
              "{currentAffirmation.text}"
            </Text>

            {currentAffirmation.scriptureRef && (
              <Text
                className="text-xs text-center mt-3"
                style={{ color: colors.muted }}
              >
                {currentAffirmation.scriptureRef}
              </Text>
            )}
          </View>

          {/* Affirmation Actions */}
          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity
              onPress={handleNewAffirmation}
              className="flex-1 py-3 rounded-lg items-center"
              style={{ backgroundColor: colors.primary }}
            >
              <Text className="text-white font-semibold text-sm">New Affirmation</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 py-3 rounded-lg items-center border"
              style={{ borderColor: colors.border }}
            >
              <MaterialIcons name="bookmark" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Animation Mode Selector */}
      <View className="mt-8 w-full">
        <Text
          className="text-xs font-semibold mb-3 text-center"
          style={{ color: colors.muted }}
        >
          COMPANION MODE
        </Text>
        <View className="flex-row gap-2 justify-center flex-wrap">
          {(
            ["breathing", "floating", "pulsing", "bouncing", "waving"] as const
          ).map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => setAnimationMode(mode)}
              className="px-3 py-2 rounded-full"
              style={{
                backgroundColor: animationMode === mode ? colors.primary : colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text
                className="text-xs font-semibold capitalize"
                style={{
                  color: animationMode === mode ? "white" : colors.foreground,
                }}
              >
                {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Toggle Affirmation Display */}
      <View className="mt-6 w-full flex-row gap-3">
        <TouchableOpacity
          onPress={() => setShowAffirmation(!showAffirmation)}
          className="flex-1 py-3 rounded-lg items-center border"
          style={{ borderColor: colors.border }}
        >
          <Text
            className="font-semibold text-sm"
            style={{ color: colors.foreground }}
          >
            {showAffirmation ? "Hide" : "Show"} Affirmation
          </Text>
        </TouchableOpacity>

        {onClose && (
          <TouchableOpacity
            onPress={onClose}
            className="flex-1 py-3 rounded-lg items-center"
            style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }}
          >
            <MaterialIcons name="close" size={20} color={colors.foreground} />
          </TouchableOpacity>
        )}
      </View>

      {/* Companion Stats */}
      <View className="mt-8 w-full p-4 rounded-xl" style={{ backgroundColor: colors.surface }}>
        <View className="flex-row justify-around">
          <View className="items-center">
            <Text
              className="text-2xl font-bold"
              style={{ color: colors.primary }}
            >
              {AFFIRMATIONS.length}
            </Text>
            <Text
              className="text-xs mt-1"
              style={{ color: colors.muted }}
            >
              Affirmations
            </Text>
          </View>
          <View className="items-center">
            <Text
              className="text-2xl font-bold"
              style={{ color: colors.primary }}
            >
              6
            </Text>
            <Text
              className="text-xs mt-1"
              style={{ color: colors.muted }}
            >
              Categories
            </Text>
          </View>
          <View className="items-center">
            <Text
              className="text-2xl font-bold"
              style={{ color: colors.primary }}
            >
              ∞
            </Text>
            <Text
              className="text-xs mt-1"
              style={{ color: colors.muted }}
            >
              Guidance
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
