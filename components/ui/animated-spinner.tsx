import { Animated, View } from "react-native";
import { useRotate } from "@/hooks/use-animation";
import { useColors } from "@/hooks/use-colors";

interface AnimatedSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export function AnimatedSpinner({ size = "md", color }: AnimatedSpinnerProps) {
  const { rotateInterpolate } = useRotate(2000, true);
  const colors = useColors();

  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 60,
  };

  const spinnerSize = sizeMap[size];

  return (
    <View className="items-center justify-center" style={{ width: spinnerSize, height: spinnerSize }}>
      <Animated.View
        style={{
          width: spinnerSize,
          height: spinnerSize,
          borderRadius: spinnerSize / 2,
          borderWidth: size === "sm" ? 2 : 3,
          borderColor: (color || colors.primary) + "20",
          borderTopColor: color || colors.primary,
          transform: [{ rotate: rotateInterpolate }],
        }}
      />
    </View>
  );
}
