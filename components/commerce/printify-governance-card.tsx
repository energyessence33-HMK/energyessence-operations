import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function PrintifyGovernanceCard() {
  const [showRequirements, setShowRequirements] = useState(false);

  return (
    <View className="gap-3">
      <View className="gap-1">
        <Text className="text-lg font-bold text-foreground">Printify Fulfilment Governance</Text>
        <Text className="text-sm text-muted">
          A protected operational boundary for the owner-supplied Printify storefront context.
        </Text>
      </View>

      <View className="bg-surface rounded-lg p-4 border border-border gap-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-foreground">Provider connection</Text>
          <View className="bg-warning rounded-full px-2 py-1">
            <Text className="text-[10px] text-background font-bold">NOT CONFIGURED</Text>
          </View>
        </View>

        <View className="gap-2">
          <View className="flex-row justify-between gap-3">
            <Text className="text-xs text-muted flex-1">Credentials</Text>
            <Text className="text-xs text-foreground text-right">Server-side only; never shown</Text>
          </View>
          <View className="flex-row justify-between gap-3">
            <Text className="text-xs text-muted flex-1">Payout and personal data</Text>
            <Text className="text-xs text-foreground text-right">Excluded from the app</Text>
          </View>
          <View className="flex-row justify-between gap-3">
            <Text className="text-xs text-muted flex-1">Permitted next action</Text>
            <Text className="text-xs text-foreground text-right">Owner-approved server adapter</Text>
          </View>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={{ expanded: showRequirements }}
          onPress={() => setShowRequirements((current) => !current)}
          className="border border-primary rounded-lg px-3 py-3 items-center"
        >
          <Text className="text-primary font-semibold text-sm">
            {showRequirements ? "Hide integration controls" : "Review integration controls"}
          </Text>
        </TouchableOpacity>

        {showRequirements ? (
          <View className="bg-background rounded-lg p-3 gap-2 border border-border">
            <Text className="text-xs font-semibold text-foreground">Required before activation</Text>
            <Text className="text-xs text-muted leading-5">
              1. Rotate or revoke values exposed in uploaded operational screenshots through the provider dashboard.
            </Text>
            <Text className="text-xs text-muted leading-5">
              2. Place replacement credentials in a server-side secret store; never in source, assets, client state, or logs.
            </Text>
            <Text className="text-xs text-muted leading-5">
              3. Approve a scoped adapter with read-only health checks before enabling catalog, order, or fulfilment actions.
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
