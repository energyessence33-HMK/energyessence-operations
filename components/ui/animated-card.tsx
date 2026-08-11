import { Animated, View, ViewProps } from "react-native";
import { useFadeIn, useSlideIn } from "@/hooks/use-animation";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends ViewProps {
  children: React.ReactNode;
  variant?: "elevated" | "outlined" | "filled";
  pressable?: boolean;
  onPress?: () => void;
  slideDirection?: "left" | "right" | "top" | "bottom";
  delay?: number;
}

export function AnimatedCard({
  children,
  variant = "elevated",
  pressable = false,
  onPress,
  slideDirection = "bottom",
  delay = 0,
  className,
  ...props
}: AnimatedCardProps) {
  const { opacity } = useFadeIn(300, true);
  const { getTransformStyle } = useSlideIn(slideDirection, 50, 400, true);

  const variantStyles = {
    elevated: "bg-surface border border-border shadow-sm",
    outlined: "bg-background border-2 border-border",
    filled: "bg-surface",
  };

  return (
    <Animated.View
      style={{
        opacity,
        ...getTransformStyle(),
      }}
      {...props}
    >
      <View
        className={cn(
          "rounded-xl p-4",
          variantStyles[variant],
          pressable && "active:opacity-80",
          className
        )}
        onTouchEnd={pressable ? onPress : undefined}
      >
        {children}
      </View>
    </Animated.View>
  );
}
