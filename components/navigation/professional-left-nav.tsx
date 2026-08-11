import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

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
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

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
    const paddingLeft = level * 16 + 16;

    return (
      <View key={item.id}>
        {/* Main Item */}
        <TouchableOpacity
          onPress={() => handleItemPress(item)}
          activeOpacity={0.7}
          className="flex-row items-center py-3 px-4 rounded-lg mx-2 mb-1"
          style={{
            backgroundColor: isExpanded ? colors.primary + "20" : "transparent",
            paddingLeft,
          }}
        >
          <MaterialIcons
            name={item.icon as any}
            size={20}
            color={isExpanded ? colors.primary : colors.foreground}
          />

          <Text
            className="flex-1 ml-3 font-semibold text-sm"
            style={{
              color: isExpanded ? colors.primary : colors.foreground,
            }}
          >
            {item.label}
          </Text>

          {/* Badge */}
          {item.badge && item.badge > 0 && (
            <View
              className="px-2 py-1 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <Text className="text-white text-xs font-bold">{item.badge}</Text>
            </View>
          )}

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

      {/* Footer */}
      <View className="p-4 border-t" style={{ borderTopColor: colors.border }}>
        <TouchableOpacity
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

        <TouchableOpacity
          className="flex-row items-center py-2 px-3 rounded-lg mt-2"
          style={{ backgroundColor: colors.surface }}
        >
          <MaterialIcons name="logout" size={18} color={colors.error} />
          {!isCollapsed && (
            <Text
              className="ml-3 text-sm font-semibold"
              style={{ color: colors.error }}
            >
              Logout
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Default navigation items
export const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
    route: "/(tabs)",
  },
  {
    id: "spiritual",
    label: "Spiritual Foundation",
    icon: "favorite",
    submenu: [
      {
        id: "identity",
        label: "Spiritual Identity",
        icon: "person",
        route: "/(tabs)/spiritual-identity",
      },
      {
        id: "affirmations",
        label: "Daily Affirmations",
        icon: "lightbulb",
        route: "/(tabs)/affirmations",
      },
      {
        id: "guidance",
        label: "Spiritual Guidance",
        icon: "help",
        route: "/(tabs)/guidance",
      },
    ],
  },
  {
    id: "brand",
    label: "Brand Studio",
    icon: "palette",
    submenu: [
      {
        id: "brand-strategy",
        label: "Brand Strategy",
        icon: "assignment",
        route: "/(tabs)/brand-studio",
      },
      {
        id: "visual-identity",
        label: "Visual Identity",
        icon: "image",
        route: "/(tabs)/brand-studio",
      },
      {
        id: "voice",
        label: "Brand Voice",
        icon: "mic",
        route: "/(tabs)/brand-studio",
      },
    ],
  },
  {
    id: "content",
    label: "Content Creation",
    icon: "videocam",
    submenu: [
      {
        id: "video-gen",
        label: "Video Generator",
        icon: "movie",
        route: "/(tabs)/video-generator",
        badge: 2,
      },
      {
        id: "templates",
        label: "Templates",
        icon: "layers",
        route: "/(tabs)/video-generator",
      },
      {
        id: "library",
        label: "Content Library",
        icon: "library-books",
        route: "/(tabs)/video-generator",
      },
    ],
  },
  {
    id: "psychology",
    label: "Psychology & Sales",
    icon: "psychology",
    submenu: [
      {
        id: "emotions",
        label: "Emotional Triggers",
        icon: "sentiment-satisfied",
        route: "/(tabs)/psychology-module",
      },
      {
        id: "copywriting",
        label: "Copywriting Mastery",
        icon: "edit",
        route: "/(tabs)/psychology-module",
      },
      {
        id: "conversion",
        label: "Conversion Optimization",
        icon: "trending-up",
        route: "/(tabs)/psychology-module",
      },
    ],
  },
  {
    id: "learning",
    label: "Learn & Grow",
    icon: "school",
    submenu: [
      {
        id: "courses",
        label: "Courses",
        icon: "video-library",
        route: "/(tabs)/learn-grow",
        badge: 3,
      },
      {
        id: "certifications",
        label: "Certifications",
        icon: "verified",
        route: "/(tabs)/learn-grow",
      },
      {
        id: "resources",
        label: "Resources",
        icon: "folder",
        route: "/(tabs)/learn-grow",
      },
    ],
  },
  {
    id: "monetize",
    label: "Monetization",
    icon: "attach-money",
    submenu: [
      {
        id: "revenue",
        label: "Revenue Streams",
        icon: "trending-up",
        route: "/(tabs)/monetize",
      },
      {
        id: "pricing",
        label: "Pricing Strategy",
        icon: "price-check",
        route: "/(tabs)/monetize",
      },
      {
        id: "analytics",
        label: "Earnings Analytics",
        icon: "analytics",
        route: "/(tabs)/monetize",
      },
    ],
  },
  {
    id: "community",
    label: "Community",
    icon: "people",
    submenu: [
      {
        id: "forums",
        label: "Forums",
        icon: "forum",
        route: "/(tabs)/community",
        badge: 5,
      },
      {
        id: "stories",
        label: "Success Stories",
        icon: "star",
        route: "/(tabs)/community",
      },
      {
        id: "members",
        label: "Members",
        icon: "group",
        route: "/(tabs)/community",
      },
    ],
  },
  {
    id: "tools",
    label: "Kingdom Tools",
    icon: "build",
    submenu: [
      {
        id: "scheduler",
        label: "Post Scheduler",
        icon: "schedule",
        route: "/(tabs)/scheduler",
      },
      {
        id: "integrations",
        label: "Integrations",
        icon: "link",
        route: "/(tabs)/integrations",
      },
      {
        id: "analytics-tools",
        label: "Analytics",
        icon: "bar-chart",
        route: "/(tabs)/admin-dashboard",
      },
    ],
  },
];
