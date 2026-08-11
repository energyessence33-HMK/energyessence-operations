import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface ScheduledPost {
  id: string;
  title: string;
  ecosystem: string;
  publishTime: string;
  status: "scheduled" | "blocked" | "published";
  content: string;
}

export default function SchedulerScreen() {
  const colors = useColors();
  const [posts] = useState<ScheduledPost[]>([
    {
      id: "1",
      title: "Morning Inspiration",
      ecosystem: "EnergyEssence",
      publishTime: "Today at 9:00 AM",
      status: "scheduled",
      content: "Start your day with positive energy...",
    },
    {
      id: "2",
      title: "Action Alert",
      ecosystem: "HitmaKING",
      publishTime: "Today at 2:00 PM",
      status: "scheduled",
      content: "Take decisive action today...",
    },
    {
      id: "3",
      title: "Reflective Moment",
      ecosystem: "THOUGHT2PONDER",
      publishTime: "Today at 6:00 PM",
      status: "blocked",
      content: "Pause and reflect on your journey...",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return colors.success;
      case "blocked":
        return colors.error;
      case "published":
        return colors.muted;
      default:
        return colors.muted;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Ready";
      case "blocked":
        return "Blocked";
      case "published":
        return "Published";
      default:
        return status;
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Scheduler</Text>
            <Text className="text-sm text-muted">Queue and manage scheduled posts</Text>
          </View>

          {/* Hard-Law Blocks Info */}
          <View className="bg-warning bg-opacity-10 rounded-lg p-4 border border-warning">
            <Text className="text-sm font-semibold text-warning">
              Hard-Law Blocks Active
            </Text>
            <Text className="text-xs text-warning opacity-80 mt-1">
              Posts are checked against governance rules before publishing
            </Text>
          </View>

          {/* Scheduled Posts */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Scheduled Posts</Text>
            {posts.map((post) => (
              <TouchableOpacity
                key={post.id}
                className="bg-surface rounded-lg p-4 border border-border"
              >
                <View className="gap-2">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">
                        {post.title}
                      </Text>
                      <Text className="text-xs text-muted mt-1">{post.ecosystem}</Text>
                    </View>
                    <View
                      className="px-2 py-1 rounded-full"
                      style={{ backgroundColor: getStatusColor(post.status) }}
                    >
                      <Text className="text-xs font-semibold text-background">
                        {getStatusLabel(post.status)}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-sm text-foreground">{post.content}</Text>
                  <View className="flex-row items-center justify-between mt-2">
                    <Text className="text-xs text-muted">{post.publishTime}</Text>
                    {post.status === "blocked" && (
                      <Text className="text-xs text-error font-semibold">
                        Violates governance rules
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Actions */}
          <View className="gap-2 mt-4">
            <TouchableOpacity className="bg-primary rounded-lg p-4 items-center">
              <Text className="text-background font-semibold">Schedule New Post</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-surface rounded-lg p-4 items-center border border-border">
              <Text className="text-foreground font-semibold">Export as CSV</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
