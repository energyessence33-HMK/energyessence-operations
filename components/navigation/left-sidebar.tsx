import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { MaterialIcons } from "@expo/vector-icons";

interface NavItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: "home", label: "Home", route: "/" },
  { icon: "favorite", label: "Spiritual", route: "/spiritual-identity" },
  { icon: "palette", label: "Brand Studio", route: "/brand-studio" },
  { icon: "videocam", label: "Video Gen", route: "/video-generator-enhanced" },
  { icon: "psychology", label: "Psychology", route: "/psychology-module" },
  { icon: "school", label: "Learn", route: "/learn-grow" },
  { icon: "trending-up", label: "Monetize", route: "/monetize" },
  { icon: "settings", label: "Settings", route: "/settings" },
];

interface LeftSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  activeRoute?: string;
}

export function LeftSidebar({
  isOpen = true,
  onClose,
  activeRoute = "/",
}: LeftSidebarProps) {
  const router = useRouter();
  const colors = useColors();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNavigation = (route: string) => {
    router.push(route as any);
    onClose?.();
  };

  return (
    <View
      className={cn(
        "h-full bg-surface border-r border-border transition-all duration-300",
        isOpen ? "w-64" : "w-20"
      )}
      style={{ backgroundColor: colors.surface }}
    >
      {/* Header */}
      <View className="p-4 border-b border-border">
        <View className="flex-row items-center gap-3">
          <View
            className="w-10 h-10 rounded-lg items-center justify-center"
            style={{ backgroundColor: colors.primary }}
          >
            <MaterialIcons name="home" size={24} color={colors.foreground} />
          </View>
          {isOpen && (
            <View className="flex-1">
              <Text
                className="text-sm font-bold"
                style={{ color: colors.foreground }}
              >
                KINGDOM
              </Text>
              <Text
                className="text-xs"
                style={{ color: colors.muted }}
              >
                Executor
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Navigation Items */}
      <ScrollView className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive = activeRoute === item.route;
          const isHovered = hoveredItem === item.route;

          return (
            <TouchableOpacity
              key={item.route}
              onPress={() => handleNavigation(item.route)}
              className={cn(
                "flex-row items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200",
                isActive ? "bg-primary" : ""
              )}
              style={{
                backgroundColor: isActive ? colors.primary : "transparent",
              }}
            >
              <MaterialIcons
                name={item.icon as any}
                size={24}
                color={isActive ? colors.foreground : colors.muted}
              />
              {isOpen && (
                <View className="flex-1">
                  <Text
                    className="text-sm font-semibold"
                    style={{
                      color: isActive ? colors.foreground : colors.muted,
                    }}
                  >
                    {item.label}
                  </Text>
                </View>
              )}
              {item.badge && isOpen && (
                <View
                  className="px-2 py-1 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Text className="text-xs font-bold text-white">
                    {item.badge}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Footer - User Profile */}
      {isOpen && (
        <View className="border-t border-border p-4">
          <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg bg-primary/10">
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <MaterialIcons name="person" size={20} color={colors.foreground} />
            </View>
            <View className="flex-1">
              <Text
                className="text-sm font-semibold"
                style={{ color: colors.foreground }}
              >
                Profile
              </Text>
              <Text
                className="text-xs"
                style={{ color: colors.muted }}
              >
                Tap to edit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
