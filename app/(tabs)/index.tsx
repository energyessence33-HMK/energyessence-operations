import { ActivityIndicator, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useMemo } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useAuth } from "@/hooks/use-auth";
import { useColors } from "@/hooks/use-colors";
import { trpc } from "@/lib/trpc";

function formatEventTime(value: Date | string): string {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return "Timestamp unavailable";

  const elapsedMs = Math.max(0, Date.now() - timestamp);
  const elapsedMinutes = Math.floor(elapsedMs / 60000);
  if (elapsedMinutes < 1) return "Just now";
  if (elapsedMinutes < 60) return `${elapsedMinutes}m ago`;
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `${elapsedHours}h ago`;
  return `${Math.floor(elapsedHours / 24)}d ago`;
}

/**
 * Dashboard Screen - Kingdom Executor Studio
 *
 * Main entry point showing active ecosystem, quick stats, and recent activity.
 */
export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { isAuthenticated, loading: isAuthLoading } = useAuth();
  const workflowsQuery = trpc.workflows.list.useQuery(undefined, { enabled: isAuthenticated });
  const scheduledPostsQuery = trpc.scheduledPosts.list.useQuery(undefined, { enabled: isAuthenticated });
  const ecosystemsQuery = trpc.ecosystems.list.useQuery(undefined, { enabled: isAuthenticated });

  const isDataLoading = isAuthenticated && (
    workflowsQuery.isLoading || scheduledPostsQuery.isLoading || ecosystemsQuery.isLoading
  );
  const dataError = workflowsQuery.error || scheduledPostsQuery.error || ecosystemsQuery.error;
  const activeEcosystem = ecosystemsQuery.data?.find((ecosystem) => ecosystem.isActive)?.name;

  const stats = useMemo(() => [
    {
      label: "Active Workflows",
      value: isAuthenticated ? String(workflowsQuery.data?.filter((workflow) => workflow.status === "active").length ?? 0) : "—",
    },
    {
      label: "Scheduled Posts",
      value: isAuthenticated ? String(scheduledPostsQuery.data?.filter((post) => post.status === "scheduled").length ?? 0) : "—",
    },
    {
      label: "Registered Ecosystems",
      value: isAuthenticated ? String(ecosystemsQuery.data?.length ?? 0) : "—",
    },
  ], [ecosystemsQuery.data, isAuthenticated, scheduledPostsQuery.data, workflowsQuery.data]);

  const recentActivity = useMemo(() => {
    const workflowActivity = (workflowsQuery.data ?? []).map((workflow) => ({
      id: `workflow-${workflow.id}`,
      action: workflow.status === "completed" ? `Workflow completed: ${workflow.title}` : `Workflow updated: ${workflow.title}`,
      timestamp: workflow.updatedAt,
    }));
    const postActivity = (scheduledPostsQuery.data ?? []).map((post) => ({
      id: `post-${post.id}`,
      action: post.status === "published" ? "Post published" : "Post scheduled",
      timestamp: post.updatedAt,
    }));

    return [...workflowActivity, ...postActivity]
      .sort((left, right) => new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime())
      .slice(0, 3);
  }, [scheduledPostsQuery.data, workflowsQuery.data]);

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Active Ecosystem Indicator */}
          <View className="bg-primary rounded-full px-4 py-3 flex-row items-center justify-center">
            <View className={`w-2 h-2 rounded-full mr-2 ${activeEcosystem ? "bg-success" : "bg-warning"}`} />
            <Text className="text-background font-semibold text-center">
              {activeEcosystem ? "Active: " : "Status: "}
              <Text className="font-bold">{activeEcosystem ?? "No ecosystem selected"}</Text>
            </Text>
          </View>

          {!isAuthLoading && !isAuthenticated && (
            <View className="bg-surface rounded-xl p-4 border border-border">
              <Text className="text-foreground font-semibold">Sign in to load your live command data.</Text>
              <Text className="text-sm text-muted mt-1">
                Workflows, schedules, and your selected ecosystem are intentionally not represented by placeholder metrics.
              </Text>
            </View>
          )}

          {isDataLoading && (
            <View className="items-center py-2">
              <ActivityIndicator color={colors.primary} />
            </View>
          )}

          {dataError && (
            <View className="bg-surface rounded-xl p-4 border border-border">
              <Text className="text-foreground font-semibold">Live data is temporarily unavailable.</Text>
              <Text className="text-sm text-muted mt-1">No placeholder metrics are shown while the connection is unavailable.</Text>
            </View>
          )}

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
                  <Text className="text-2xl font-bold text-primary">
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
                onPress={() => router.push("/workflow")}
              >
                <Text className="text-background font-semibold">New Workflow</Text>
                <Text className="text-background text-lg">→</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-surface rounded-lg p-4 flex-row items-center justify-between border border-border"
                onPress={() => router.push("/scheduler")}
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
              {recentActivity.length > 0 ? recentActivity.map((item) => (
                <View key={item.id} className="bg-surface rounded-lg p-4 border border-border">
                  <Text className="text-foreground font-medium">{item.action}</Text>
                  <Text className="text-xs text-muted mt-1">{formatEventTime(item.timestamp)}</Text>
                </View>
              )) : (
                <View className="bg-surface rounded-lg p-4 border border-border">
                  <Text className="text-sm text-muted">No recorded activity is available yet.</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
