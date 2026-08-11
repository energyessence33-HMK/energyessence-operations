import { View, Platform, useWindowDimensions } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { ProfessionalLeftNav, DEFAULT_NAV_ITEMS } from "@/components/navigation/professional-left-nav";
import { useState } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  // Animated value for sidebar width
  const sidebarWidth = useSharedValue(280);

  // Determine layout based on screen size
  const isMobile = Platform.OS === "web" ? width < 768 : true;
  // const isTablet = Platform.OS === "web" ? width >= 768 && width < 1024 : false; // Tablet detection
  // const isDesktop = Platform.OS === "web" ? width >= 1024 : false; // Desktop detection
  const showLeftNav = !isMobile; // Show left nav on tablet and desktop

  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  // Handle sidebar collapse with animation
  const handleCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
    sidebarWidth.value = withTiming(isNavCollapsed ? 280 : 60, {
      duration: 300,
    });
  };

  // Animated sidebar style
  const animatedSidebarStyle = useAnimatedStyle(() => ({
    width: sidebarWidth.value,
  }));

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: colors.background }}>
      {/* Left Navigation Sidebar - Desktop/Tablet Only */}
      {showLeftNav && (
        <Animated.View
          style={[
            {
              backgroundColor: colors.background,
              borderRightColor: colors.border,
              borderRightWidth: 1,
              overflow: "hidden",
            },
            animatedSidebarStyle,
          ]}
        >
          <ProfessionalLeftNav
            items={DEFAULT_NAV_ITEMS}
            width={280}
            isCollapsed={isNavCollapsed}
            onCollapse={handleCollapse}
          />
        </Animated.View>
      )}

      {/* Main Tabs Content */}
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.muted,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarStyle: {
              paddingTop: 8,
              paddingBottom: bottomPadding,
              height: tabBarHeight,
              backgroundColor: colors.background,
              borderTopColor: colors.border,
              borderTopWidth: 0.5,
              // Position tab bar at bottom on mobile, or hide on desktop if left nav is visible
              display: isMobile ? "flex" : showLeftNav ? "none" : "flex",
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="spiritual-identity"
            options={{
              title: "Identity",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="sparkles" color={color} />,
            }}
          />
          <Tabs.Screen
            name="brand-studio"
            options={{
              title: "Create",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.grid.2x2" color={color} />,
            }}
          />
          <Tabs.Screen
            name="video-generator"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="learn-grow"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="monetize"
            options={{
              title: "Commerce",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
            }}
          />
          <Tabs.Screen
            name="psychology-module"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="community"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="subscription"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="admin-dashboard"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name="integrations"
            options={{
              title: "Operate",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.left.forwardslash.chevron.right" color={color} />,
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}
