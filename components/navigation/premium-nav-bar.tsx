import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { cn } from "@/lib/utils";
import { useColors } from "@/hooks/use-colors";
import { MaterialIcons } from "@expo/vector-icons";

export type NavRoute = "dashboard" | "spiritual-identity" | "brand-studio" | "video-generator" | "psychology-module" | "learn-grow" | "monetize";

interface NavItem {
  label: string;
  route: NavRoute;
  icon: string;
  badge?: number;
}

export function PremiumNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const colors = useColors();
  const { width } = useWindowDimensions();

  const navItems: NavItem[] = [
    { label: "Home", route: "dashboard", icon: "home" },
    { label: "Spirit", route: "spiritual-identity", icon: "favorite" },
    { label: "Brand", route: "brand-studio", icon: "palette" },
    { label: "Video", route: "video-generator", icon: "videocam" },
    { label: "Mind", route: "psychology-module", icon: "psychology" },
    { label: "Learn", route: "learn-grow", icon: "school" },
    { label: "Earn", route: "monetize", icon: "trending-up" },
  ];

  const isActive = (route: NavRoute) => pathname.includes(route);

  const handleNavigation = (route: NavRoute) => {
    router.push(`/(tabs)/${route}` as any);
  };

  const itemWidth = width / navItems.length;

  return (
    <View className="border-t border-border bg-surface">
      {/* Navigation Items Container */}
      <View className="flex-row items-center justify-between px-1 py-2">
        {navItems.map((item) => {
          const active = isActive(item.route);

          return (
            <TouchableOpacity
              key={item.route}
              onPress={() => handleNavigation(item.route)}
              style={{ width: itemWidth }}
              className="items-center justify-center py-3"
            >
              {/* Icon Container with Premium Styling */}
              <View className="relative items-center">
                <View
                  className={cn(
                    "w-10 h-10 rounded-lg items-center justify-center",
                    active ? "bg-primary/10" : "bg-transparent"
                  )}
                >
                  <MaterialIcons
                    name={item.icon as any}
                    size={24}
                    color={active ? colors.primary : colors.muted}
                  />
                </View>

                {/* Badge */}
                {item.badge && (
                  <View
                    className="absolute -top-2 -right-2 rounded-full items-center justify-center"
                    style={{
                      width: 18,
                      height: 18,
                      backgroundColor: colors.error,
                    }}
                  >
                    <Text
                      className="text-xs font-bold"
                      style={{ color: colors.background }}
                    >
                      {item.badge}
                    </Text>
                  </View>
                )}
              </View>

              {/* Label with Premium Typography */}
              <Text
                className={cn(
                  "text-xs mt-1.5 font-semibold tracking-tight",
                  active ? "text-primary" : "text-muted"
                )}
                numberOfLines={1}
              >
                {item.label}
              </Text>

              {/* Active Underline with Glow */}
              {active && (
                <View
                  className="absolute bottom-0 h-1 rounded-full"
                  style={{
                    width: 28,
                    backgroundColor: colors.primary,
                    opacity: 0.8,
                    shadowColor: colors.primary,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Divider */}
      <View
        className="h-px"
        style={{ backgroundColor: colors.border }}
      />
    </View>
  );
}
