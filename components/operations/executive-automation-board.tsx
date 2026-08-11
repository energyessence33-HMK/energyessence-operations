import { Text, View } from "react-native";

import {
  EXECUTIVE_AUTOMATION_CONTROLS,
  canRunAutonomously,
  controlStateLabel,
} from "@/lib/gateway/automation-control";

export function ExecutiveAutomationBoard() {
  return (
    <View className="gap-3">
      <View className="gap-1">
        <Text className="text-lg font-bold text-foreground">Executive Automation Controls</Text>
        <Text className="text-sm text-muted">
          Every action is classified before it runs: preconditions first, external effect second, approval decision last.
        </Text>
      </View>

      <View className="bg-surface rounded-lg p-4 border border-border gap-2">
        <Text className="text-xs font-semibold text-primary uppercase tracking-wider">Operating rhythm</Text>
        <Text className="text-xs text-muted leading-5">
          Receive → understand → refine → verify → approve → execute → observe → audit → restore.
        </Text>
      </View>

      {EXECUTIVE_AUTOMATION_CONTROLS.map((control) => {
        const autonomous = canRunAutonomously(control);
        const badgeClass = autonomous
          ? "bg-success"
          : control.status === "blocked"
            ? "bg-warning"
            : "bg-primary";

        return (
          <View key={control.id} className="bg-surface rounded-lg p-4 border border-border gap-3">
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1 gap-1">
                <Text className="text-sm font-semibold text-foreground">{control.title}</Text>
                <Text className="text-xs text-muted">{control.provider} · {control.riskLevel}</Text>
              </View>
              <View className={`rounded-full px-2 py-1 ${badgeClass}`}>
                <Text className="text-[10px] font-bold text-background">{controlStateLabel(control)}</Text>
              </View>
            </View>
            <Text className="text-sm text-muted leading-5">{control.summary}</Text>
            <View className="gap-1">
              <Text className="text-xs font-semibold text-foreground">Preconditions</Text>
              {control.preconditions.map((precondition) => (
                <Text key={precondition} className="text-xs text-muted leading-5">• {precondition}</Text>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}
