import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface WorkflowTask {
  id: string;
  name: string;
  ecosystem: string;
  status: "active" | "pending" | "completed";
  dependencies: string[];
  createdAt: string;
}

export default function WorkflowScreen() {
  const colors = useColors();
  const [tasks, setTasks] = useState<WorkflowTask[]>([
    {
      id: "1",
      name: "Create brand guidelines",
      ecosystem: "EnergyEssence",
      status: "active",
      dependencies: [],
      createdAt: "2 hours ago",
    },
    {
      id: "2",
      name: "Design ad templates",
      ecosystem: "EnergyEssence",
      status: "active",
      dependencies: ["1"],
      createdAt: "1 hour ago",
    },
    {
      id: "3",
      name: "Generate copy variations",
      ecosystem: "HitmaKING",
      status: "pending",
      dependencies: [],
      createdAt: "30 minutes ago",
    },
  ]);

  const activeTasks = tasks.filter((t) => t.status === "active");
  const maxActiveTasks = 3;
  const canAddMore = activeTasks.length < maxActiveTasks;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return colors.success;
      case "pending":
        return colors.warning;
      case "completed":
        return colors.muted;
      default:
        return colors.muted;
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Workflow</Text>
            <Text className="text-sm text-muted">
              Active: {activeTasks.length}/{maxActiveTasks}
            </Text>
          </View>

          {/* Governor Status */}
          <View className="bg-surface rounded-xl p-4 border border-border">
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">Active Task Limit</Text>
              <View className="flex-row gap-2">
                {Array.from({ length: maxActiveTasks }).map((_, i) => (
                  <View
                    key={i}
                    className="flex-1 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        i < activeTasks.length ? colors.primary : colors.border,
                    }}
                  />
                ))}
              </View>
              <Text className="text-xs text-muted">
                {canAddMore ? "You can add more tasks" : "Limit reached"}
              </Text>
            </View>
          </View>

          {/* Active Tasks */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Active Tasks</Text>
            {activeTasks.length === 0 ? (
              <View className="bg-surface rounded-lg p-6 items-center">
                <Text className="text-muted text-center">No active tasks</Text>
              </View>
            ) : (
              activeTasks.map((task) => (
                <TouchableOpacity
                  key={task.id}
                  className="bg-surface rounded-lg p-4 border border-border"
                >
                  <View className="gap-2">
                    <View className="flex-row items-start justify-between">
                      <Text className="text-base font-semibold text-foreground flex-1">
                        {task.name}
                      </Text>
                      <View
                        className="px-2 py-1 rounded-full"
                        style={{ backgroundColor: getStatusColor(task.status) }}
                      >
                        <Text className="text-xs font-semibold text-background capitalize">
                          {task.status}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-xs text-muted">{task.ecosystem}</Text>
                    <Text className="text-xs text-muted">{task.createdAt}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>

          {/* Pending Tasks */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Pending Tasks</Text>
            {tasks.filter((t) => t.status === "pending").length === 0 ? (
              <View className="bg-surface rounded-lg p-6 items-center">
                <Text className="text-muted text-center">No pending tasks</Text>
              </View>
            ) : (
              tasks
                .filter((t) => t.status === "pending")
                .map((task) => (
                  <TouchableOpacity
                    key={task.id}
                    className="bg-surface rounded-lg p-4 border border-border opacity-60"
                  >
                    <View className="gap-2">
                      <Text className="text-base font-semibold text-foreground">
                        {task.name}
                      </Text>
                      <Text className="text-xs text-muted">{task.ecosystem}</Text>
                    </View>
                  </TouchableOpacity>
                ))
            )}
          </View>

          <TouchableOpacity className="bg-primary rounded-lg p-4 items-center mt-4">
            <Text className="text-background font-semibold">
              {canAddMore ? "Add New Task" : "Queue Task"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
