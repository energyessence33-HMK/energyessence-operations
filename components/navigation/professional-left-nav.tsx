import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  submenu?: NavItem[];
  badge?: number;
}

interface ProfessionalLeftNavProps {
  items: NavItem[];
  onItemPress?: (item: NavItem) => void;
  width?: number;
  isCollapsed?: boolean;
  onCollapse?: () => void;
}

export function ProfessionalLeftNav({
  items,
  onItemPress,
  width = 280,
  isCollapsed = false,
  onCollapse,
}: ProfessionalLeftNavProps) {
  const colors = useColors();
  const router = useRouter();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const hasActiveChild = useCallback((item: NavItem) =>
    item.submenu?.some((child) => child.route && pathname.includes(child.route.replace("/(tabs)", ""))) ?? false,
  [pathname]);

  useEffect(() => {
    const activeGroup = items.find((item) => hasActiveChild(item));
    if (activeGroup) {
      setExpandedItems((current) => current.has(activeGroup.id) ? current : new Set([activeGroup.id]));
    }
  }, [hasActiveChild, items]);

  const toggleSubmenu = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemPress = (item: NavItem) => {
    if (item.submenu && item.submenu.length > 0) {
      toggleSubmenu(item.id);
    } else if (item.route) {
      router.push(item.route as any);
    }

    if (onItemPress) {
      onItemPress(item);
    }
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const normalizedRoute = item.route?.replace("/(tabs)", "") ?? "";
    const isActive = item.route
      ? normalizedRoute === ""
        ? pathname === "/" || pathname === "/index"
        : pathname === normalizedRoute || pathname.startsWith(`${normalizedRoute}/`)
      : hasActiveChild(item);
    const paddingLeft = level * 16 + 16;

    return (
      <View key={item.id}>
        {/* Main Item */}
        <TouchableOpacity
          onPress={() => handleItemPress(item)}
          activeOpacity={0.7}
          className="flex-row items-center py-3 px-4 rounded-lg mx-2 mb-1"
          accessibilityRole="button"
          accessibilityLabel={item.label}
          accessibilityState={{ expanded: hasSubmenu ? isExpanded : undefined, selected: isActive }}
          style={{
            backgroundColor: isActive || isExpanded ? colors.primary + "16" : "transparent",
            paddingLeft,
          }}
        >
          <MaterialIcons
            name={item.icon as any}
            size={20}
            color={isActive || isExpanded ? colors.primary : colors.foreground}
          />

          <Text
            className="flex-1 ml-3 font-semibold text-sm"
            style={{
              color: isActive || isExpanded ? colors.primary : colors.foreground,
            }}
          >
            {item.label}
          </Text>

          {/* Submenu Arrow */}
          {hasSubmenu && (
            <MaterialIcons
              name={isExpanded ? "expand-less" : "expand-more"}
              size={20}
              color={colors.muted}
            />
          )}
        </TouchableOpacity>

        {/* Submenu Items */}
        {hasSubmenu && isExpanded && (
          <View className="bg-opacity-50">
            {item.submenu!.map((subitem) => renderNavItem(subitem, level + 1))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      className="flex-1 border-r"
      style={{
        width: isCollapsed ? 60 : width,
        backgroundColor: colors.background,
        borderRightColor: colors.border,
      }}
    >
      {/* Header */}
      <View className="p-4 border-b" style={{ borderBottomColor: colors.border }}>
        <View className="flex-row items-center gap-2">
          <View
            className="w-10 h-10 rounded-lg items-center justify-center"
            style={{ backgroundColor: colors.primary }}
          >
            <MaterialIcons name="star" size={24} color="white" />
          </View>
          {!isCollapsed && (
            <View className="flex-1">
              <Text
                className="font-bold text-sm"
                style={{ color: colors.foreground }}
              >
                Kingdom
              </Text>
              <Text
                className="text-xs"
                style={{ color: colors.muted }}
              >
                Executor
              </Text>
              </View>
          )}
          {onCollapse && (
            <TouchableOpacity
              onPress={onCollapse}
              accessibilityRole="button"
              accessibilityLabel={isCollapsed ? "Expand navigation" : "Collapse navigation"}
              className="w-8 h-8 rounded-lg items-center justify-center"
              style={{ backgroundColor: colors.surface }}
            >
              <MaterialIcons
                name={isCollapsed ? "chevron-right" : "chevron-left"}
                size={20}
                color={colors.foreground}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Navigation Items */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 8 }}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => renderNavItem(item))}
      </ScrollView>

      {/* Footer: utilities do not compete with primary work */}
      <View className="p-4 border-t" style={{ borderTopColor: colors.border }}>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/settings" as any)}
          accessibilityRole="button"
          accessibilityLabel="Open settings"
          className="flex-row items-center py-2 px-3 rounded-lg"
          style={{ backgroundColor: colors.surface }}
        >
          <MaterialIcons name="settings" size={18} color={colors.foreground} />
          {!isCollapsed && (
            <Text
              className="ml-3 text-sm font-semibold"
              style={{ color: colors.foreground }}
            >
              Settings
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export { TASK_FIRST_NAV_ITEMS as DEFAULT_NAV_ITEMS } from "@/lib/navigation/task-first-nav";
