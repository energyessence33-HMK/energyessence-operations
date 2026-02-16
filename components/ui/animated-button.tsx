import { Animated, TouchableOpacity, View, Text } from "react-native";
import { useScalePress } from "@/hooks/use-animation";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { MaterialIcons } from "@expo/vector-icons";

interface AnimatedButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function AnimatedButton({
  label,
  onPress,
  variant = "primary",
  size = "md",
  icon,
  disabled = false,
  loading = false,
  fullWidth = false,
}: AnimatedButtonProps) {
  const { scale, onPressIn, onPressOut } = useScalePress();
  const colors = useColors();

  const sizeStyles = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  };

  const variantStyles = {
    primary: `bg-primary`,
    secondary: `bg-secondary`,
    outline: `border-2 border-primary`,
    ghost: `bg-transparent`,
  };

  const textColorStyles = {
    primary: "text-background",
    secondary: "text-background",
    outline: "text-primary",
    ghost: "text-primary",
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled || loading}
        className={cn(
          "flex-row items-center justify-center gap-2 rounded-lg",
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && "w-full",
          (disabled || loading) && "opacity-50"
        )}
      >
        {loading ? (
          <MaterialIcons
            name="hourglass-empty"
            size={20}
            color={colors[variant === "outline" || variant === "ghost" ? "primary" : "background"]}
          />
        ) : icon ? (
          <MaterialIcons
            name={icon as any}
            size={20}
            color={colors[variant === "outline" || variant === "ghost" ? "primary" : "background"]}
          />
        ) : null}

        <Text
          className={cn(
            "font-semibold",
            size === "sm" && "text-sm",
            size === "md" && "text-base",
            size === "lg" && "text-lg",
            textColorStyles[variant]
          )}
        >
          {loading ? "Loading..." : label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
