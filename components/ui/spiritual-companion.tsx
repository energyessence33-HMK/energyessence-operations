import { useState } from "react";
import { Animated, View, Text, TouchableOpacity, Image } from "react-native";
import { usePulse } from "@/hooks/use-animation";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { MaterialIcons } from "@expo/vector-icons";

interface SpiritualCompanionProps {
  visible?: boolean;
  onToggle?: () => void;
  guidance?: string;
}

const guidanceMessages = [
  "Return to your Essence.",
  "Move with Heaven's Precision.",
  "You are guided.",
  "Align with your Divine Purpose.",
  "Breathe in Truth, Exhale Illusion.",
  "Your Kingdom awaits.",
  "Rise in Christ Consciousness.",
  "Divine Order is your Foundation.",
  "Be the Light you seek.",
  "Your Frequency attracts your Reality.",
];

export function SpiritualCompanion({
  visible = true,
  onToggle,
  guidance,
}: SpiritualCompanionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentGuidance, setCurrentGuidance] = useState(
    guidance || guidanceMessages[0]
  );
  const { opacity } = usePulse(0.6, 1, 3000, visible);
  const colors = useColors();

  const handleGetGuidance = () => {
    const randomMessage =
      guidanceMessages[Math.floor(Math.random() * guidanceMessages.length)];
    setCurrentGuidance(randomMessage);
  };

  if (!visible) return null;

  return (
    <View className="absolute bottom-24 right-4 z-50">
      {/* Expanded Guidance Panel */}
      {isExpanded && (
        <View
          className="mb-4 rounded-2xl p-4 border border-primary/30"
          style={{ backgroundColor: colors.surface }}
        >
          <Text
            className="text-sm font-semibold mb-3"
            style={{ color: colors.primary }}
          >
            Divine Guidance
          </Text>
          <Text
            className="text-base leading-relaxed mb-4"
            style={{ color: colors.foreground }}
          >
            {currentGuidance}
          </Text>
          <TouchableOpacity
            onPress={handleGetGuidance}
            className="bg-primary rounded-lg py-2 px-4 items-center"
          >
            <Text className="text-white font-semibold text-sm">
              Receive Guidance
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Guardian Character Button */}
      <Animated.View style={{ opacity }}>
        <TouchableOpacity
          onPress={() => setIsExpanded(!isExpanded)}
          onLongPress={onToggle}
          className="items-center justify-center"
        >
          {/* Glow Effect */}
          <View
            className="absolute w-24 h-24 rounded-full"
            style={{
              backgroundColor: colors.primary + "15",
              top: -12,
              left: -12,
            }}
          />

          {/* Guardian Image Container */}
          <View className="w-20 h-20 rounded-full items-center justify-center border-2 border-primary overflow-hidden">
            {/* Placeholder for pixel guardian image */}
            <View
              className="w-full h-full items-center justify-center"
              style={{ backgroundColor: colors.surface }}
            >
              <MaterialIcons name="auto-awesome" size={40} color={colors.primary} />
            </View>
          </View>

          {/* Status Indicator */}
          <View
            className="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-surface"
            style={{ backgroundColor: colors.success }}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Hint Text */}
      {!isExpanded && (
        <Text
          className="text-xs text-center mt-2"
          style={{ color: colors.muted }}
        >
          Tap for guidance
        </Text>
      )}
    </View>
  );
}
