import { View, Platform, useWindowDimensions } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { ProfessionalLeftNav, DEFAULT_NAV_ITEMS } from "@/components/navigation/professional-left-nav";
import { useState } from "react";

export default function TabLayoutWithNav() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [isNavCollapsed] = useState(false); // Navigation collapse state

  // Determine layout based on screen size
  const isMobile = Platform.OS === "web" ? width < 768 : true;
  // const isTablet = Platform.OS === "web" ? width >= 768 && width < 1024 : false; // Tablet detection
  // const isDesktop = Platform.OS === "web" ? width >= 1024 : false; // Desktop detection
  const showLeftNav = !isMobile; // Show left nav on tablet and desktop

  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;
  const navWidth = isNavCollapsed ? 60 : 280;

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: colors.background }}>
      {/* Left Navigation Sidebar - Desktop/Tablet Only */}
      {showLeftNav && (
      <View
        style={{
          width: navWidth,
          backgroundColor: colors.background,
          borderRightColor: colors.border,
          borderRightWidth: 1,
        }}
      >
          <ProfessionalLeftNav
            items={DEFAULT_NAV_ITEMS}
            width={280}
            isCollapsed={isNavCollapsed}
          />
        </View>
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
              title: "Brand",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="square.grid.2x2" color={color} />,
            }}
          />
          <Tabs.Screen
            name="video-generator"
            options={{
              title: "Video",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="learn-grow"
            options={{
              title: "Learn",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="checkmark.circle" color={color} />,
            }}
          />
          <Tabs.Screen
            name="monetize"
            options={{
              title: "Monetize",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
            }}
          />
          <Tabs.Screen
            name="psychology-module"
            options={{
              title: "Psychology",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="brain" color={color} />,
            }}
          />
          <Tabs.Screen
            name="community"
            options={{
              title: "Community",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.3.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="subscription"
            options={{
              title: "Premium",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="admin-dashboard"
            options={{
              title: "Admin",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}
