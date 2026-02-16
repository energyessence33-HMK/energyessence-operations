import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { cn } from "@/lib/utils";
import { useColors } from "@/hooks/use-colors";
import { smartRouter, type NavigationRoute } from "@/lib/navigation/smart-router";
import { useEffect, useState } from "react";

interface NavItem {
  name: string;
  route: NavigationRoute;
  icon: string;
  badge?: number;
  isNew?: boolean;
}

export function SmartNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const colors = useColors();
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [recommendedAction, setRecommendedAction] = useState<any>(null);

  useEffect(() => {
    loadNavigation();
  }, []);

  const loadNavigation = async () => {
    // Get recommended action
    const action = await smartRouter.getRecommendedAction();
    setRecommendedAction(action);

    // Build navigation items based on user access
    const potentialItems: NavItem[] = [
      { name: "Home", route: "dashboard", icon: "house.fill" },
      { name: "Spiritual", route: "spiritual-identity", icon: "sparkles" },
      { name: "Brand", route: "brand-studio", icon: "square.grid.2x2" },
      { name: "Video", route: "video-generator", icon: "paperplane.fill" },
      { name: "Psychology", route: "psychology-module", icon: "brain.head.profile" },
      { name: "Learn", route: "learn-grow", icon: "checkmark.circle" },
      { name: "Monetize", route: "monetize", icon: "calendar" },
    ];

    // Filter items based on access
    const accessibleItems: NavItem[] = [];
    for (const item of potentialItems) {
      const canAccess = await smartRouter.canAccessRoute(item.route);
      if (canAccess) {
        // Add badge to recommended action
        if (item.route === recommendedAction?.route) {
          item.badge = 1;
          item.isNew = true;
        }
        accessibleItems.push(item);
      }
    }

    setNavItems(accessibleItems);
  };

  const handleNavigation = async (route: NavigationRoute) => {
    const currentRoute = pathname.split("/").pop() as NavigationRoute;
    await smartRouter.trackNavigation(currentRoute, route);
    router.push(`/(tabs)/${route}` as any);
  };

  const isActive = (route: NavigationRoute) => {
    return pathname.includes(route);
  };

  return (
    <View className="bg-surface border-t border-border">
      {/* Recommended Action Banner */}
      {recommendedAction && (
        <TouchableOpacity
          onPress={() => handleNavigation(recommendedAction.route)}
          className={cn(
            "px-4 py-3 mx-2 mt-2 rounded-lg border-l-4",
            recommendedAction.urgency === "high"
              ? "bg-error/10 border-error"
              : recommendedAction.urgency === "medium"
              ? "bg-warning/10 border-warning"
              : "bg-primary/10 border-primary"
          )}
        >
          <Text className="text-xs font-semibold text-foreground">
            {recommendedAction.title}
          </Text>
          <Text className="text-xs text-muted mt-1">
            {recommendedAction.description}
          </Text>
        </TouchableOpacity>
      )}

      {/* Navigation Items */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-2 py-3"
        contentContainerStyle={{ gap: 8 }}
      >
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.route}
            onPress={() => handleNavigation(item.route)}
            className={cn(
              "flex-row items-center gap-2 px-4 py-2 rounded-full border",
              isActive(item.route)
                ? "bg-primary border-primary"
                : "bg-background border-border"
            )}
          >
            <Text
              className={cn(
                "text-sm font-semibold",
                isActive(item.route) ? "text-background" : "text-foreground"
              )}
            >
              {item.name}
            </Text>

            {/* Badge */}
            {item.badge && (
              <View className="bg-error rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-xs font-bold text-background">
                  {item.badge}
                </Text>
              </View>
            )}

            {/* New Indicator */}
            {item.isNew && (
              <View className="w-2 h-2 rounded-full bg-success" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Smart Tips */}
      <View className="px-4 py-2 bg-background/50">
        <Text className="text-xs text-muted">
          💡 Tip: Follow the recommended action for optimal progress
        </Text>
      </View>
    </View>
  );
}
