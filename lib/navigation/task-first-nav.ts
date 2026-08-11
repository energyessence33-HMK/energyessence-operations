import type { NavItem } from "@/components/navigation/professional-left-nav";

/**
 * Navigation is intentionally limited to five durable user jobs. Secondary
 * capabilities remain reachable through their owning group rather than
 * competing as permanent top-level destinations.
 */
export const TASK_FIRST_NAV_ITEMS: NavItem[] = [
  {
    id: "command",
    label: "Command",
    icon: "dashboard",
    route: "/(tabs)",
  },
  {
    id: "create",
    label: "Create",
    icon: "palette",
    submenu: [
      { id: "brand-studio", label: "Brand Studio", icon: "palette", route: "/(tabs)/brand-studio" },
      { id: "video-studio", label: "Video Studio", icon: "movie", route: "/(tabs)/video-generator" },
    ],
  },
  {
    id: "grow",
    label: "Grow",
    icon: "favorite",
    submenu: [
      { id: "identity", label: "Identity", icon: "person", route: "/(tabs)/spiritual-identity" },
      { id: "learn", label: "Learn & Resources", icon: "school", route: "/(tabs)/learn-grow" },
      { id: "insights", label: "Audience Insights", icon: "psychology", route: "/(tabs)/psychology-module" },
    ],
  },
  {
    id: "commerce",
    label: "Commerce",
    icon: "attach-money",
    submenu: [
      { id: "monetize", label: "Monetize", icon: "trending-up", route: "/(tabs)/monetize" },
      { id: "community", label: "Community", icon: "people", route: "/(tabs)/community" },
    ],
  },
  {
    id: "operate",
    label: "Operate",
    icon: "tune",
    submenu: [
      { id: "ecosystems", label: "Ecosystems", icon: "hub", route: "/(tabs)/ecosystems" },
      { id: "workflows", label: "Workflows", icon: "account-tree", route: "/(tabs)/workflow" },
      { id: "scheduler", label: "Scheduler", icon: "schedule", route: "/(tabs)/scheduler" },
      { id: "integrations", label: "Integrations", icon: "link", route: "/(tabs)/integrations" },
      { id: "analytics", label: "Analytics", icon: "bar-chart", route: "/(tabs)/admin-dashboard" },
    ],
  },
];

export const MOBILE_PRIMARY_TABS = [
  "index",
  "brand-studio",
  "spiritual-identity",
  "monetize",
  "integrations",
] as const;
