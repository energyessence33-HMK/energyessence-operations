import { View, Platform, useWindowDimensions } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { ProfessionalLeftNav, DEFAULT_NAV_ITEMS } from "@/components/navigation/professional-left-nav";
import { useState, ReactNode } from "react";

interface MainLayoutWithNavProps {
  children: ReactNode;
  showNavigation?: boolean;
  collapsedOnMobile?: boolean;
}

export function MainLayoutWithNav({
  children,
  showNavigation = true,
  collapsedOnMobile = true,
}: MainLayoutWithNavProps) {
  const colors = useColors();
  const { width } = useWindowDimensions();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  // Determine if we should show navigation based on platform and screen size
  const isMobile = Platform.OS === "web" ? width < 768 : true;
  const shouldShowNav = showNavigation && (!isMobile || !collapsedOnMobile);
  const navWidth = isNavCollapsed ? 60 : 280;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: colors.background,
      }}
    >
      {/* Left Navigation Sidebar */}
      {shouldShowNav && (
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

      {/* Main Content Area */}
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        {children}
      </View>

      {/* Mobile Navigation Toggle Button */}
      {isMobile && showNavigation && (
        <View
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 1000,
          }}
        >
          {/* Navigation toggle can be added here if needed */}
        </View>
      )}
    </View>
  );
}

/**
 * Hook to use main layout context
 * Provides navigation state and utilities
 */
export function useMainLayout() {
  const { width } = useWindowDimensions();
  const isMobile = Platform.OS === "web" ? width < 768 : true;
  const isTablet = Platform.OS === "web" ? width >= 768 && width < 1024 : false;
  const isDesktop = Platform.OS === "web" ? width >= 1024 : false;

  return {
    isMobile,
    isTablet,
    isDesktop,
    screenWidth: width,
    shouldShowSidebar: !isMobile,
  };
}
