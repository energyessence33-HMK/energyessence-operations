import { ScrollView, Text, View, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

/**
 * Dashboard Screen - Kingdom Executor Studio
 *
 * Main entry point showing active ecosystem, quick stats, and recent activity.
 */
export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();

  // Mock data - will be replaced with state management
  const activeEcosystem = "EnergyEssence";
  const stats = [
    { label: "Active Workflows", value: "2", color: colors.primary },
    { label: "Scheduled Posts", value: "5", color: colors.warning },
    { label: "Blueprints", value: "3", color: colors.success },
  ];

  const recentActivity = [
    { id: "1", action: "Workflow completed", time: "2 hours ago" },
    { id: "2", action: "Post scheduled", time: "4 hours ago" },
    { id: "3", action: "Blueprint uploaded", time: "1 day ago" },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Active Ecosystem Indicator */}
          <View className="bg-primary rounded-full px-4 py-3 flex-row items-center justify-center">
            <View className="w-2 h-2 bg-success rounded-full mr-2" />
            <Text className="text-background font-semibold text-center">
              Active: <Text className="font-bold">{activeEcosystem}</Text>
            </Text>
          </View>

          {/* Quick Stats */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Overview</Text>
            <View className="gap-3">
              {stats.map((stat) => (
                <View
                  key={stat.label}
                  className="flex-row items-center justify-between bg-surface rounded-xl p-4 border border-border"
                >
                  <Text className="text-sm text-muted">{stat.label}</Text>
                  <Text className="text-2xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Quick Actions</Text>
            <View className="gap-2">
              <TouchableOpacity
                className="bg-primary rounded-lg p-4 flex-row items-center justify-between"
                onPress={() => router.push("/(tabs)")}
              >
                <Text className="text-background font-semibold">New Workflow</Text>
                <Text className="text-background text-lg">→</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-surface rounded-lg p-4 flex-row items-center justify-between border border-border"
                onPress={() => router.push("/(tabs)")}
              >
                <Text className="text-foreground font-semibold">Schedule Post</Text>
                <Text className="text-foreground text-lg">→</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Activity */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Recent Activity</Text>
            <View className="gap-2">
              {recentActivity.map((item) => (
                <View key={item.id} className="bg-surface rounded-lg p-4 border border-border">
                  <Text className="text-foreground font-medium">{item.action}</Text>
                  <Text className="text-xs text-muted mt-1">{item.time}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
