import { Animated, View, Text } from "react-native";
import { useFadeIn } from "@/hooks/use-animation";
import { useColors } from "@/hooks/use-colors";
import { MaterialIcons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

interface AnimatedToastProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  onDismiss?: () => void;
}

export function AnimatedToast({
  message,
  type,
  duration = 3000,
  onDismiss,
}: AnimatedToastProps) {
  const { opacity } = useFadeIn(300, true);
  const colors = useColors();

  const typeConfig = {
    success: {
      icon: "check-circle",
      bgColor: colors.success,
      textColor: colors.background,
    },
    error: {
      icon: "error",
      bgColor: colors.error,
      textColor: colors.background,
    },
    warning: {
      icon: "warning",
      bgColor: colors.warning,
      textColor: colors.background,
    },
    info: {
      icon: "info",
      bgColor: colors.primary,
      textColor: colors.background,
    },
  };

  const config = typeConfig[type];

  // Auto dismiss after duration
  if (duration && onDismiss) {
    setTimeout(() => {
      onDismiss();
    }, duration);
  }

  return (
    <Animated.View
      style={{ opacity }}
      className="absolute bottom-8 left-4 right-4 rounded-lg overflow-hidden"
    >
      <View
        className="flex-row items-center gap-3 p-4"
        style={{ backgroundColor: config.bgColor }}
      >
        <MaterialIcons
          name={config.icon as any}
          size={24}
          color={config.textColor}
        />
        <Text
          className="flex-1 font-semibold"
          style={{ color: config.textColor }}
          numberOfLines={2}
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}
