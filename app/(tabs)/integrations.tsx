import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { CredentialContainmentBoard } from "@/components/operations/credential-containment-board";
import { ExecutiveAutomationBoard } from "@/components/operations/executive-automation-board";
import { useColors } from "@/hooks/use-colors";
import { trpc } from "@/lib/trpc";

function evidenceTone(status: string): "success" | "primary" | "warning" | "muted" {
  if (status === "PRODUCTION VERIFIED" || status === "STAGING VERIFIED") return "success";
  if (status === "INTEGRATED" || status === "TESTED") return "primary";
  if (status === "BLOCKED") return "warning";
  return "muted";
}

export default function IntegrationsScreen() {
  const colors = useColors();
  const registryQuery = trpc.integrations.registry.useQuery();

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Integrations</Text>
            <Text className="text-sm text-muted">Verified connector evidence and governed execution readiness.</Text>
          </View>

          <View className="bg-surface rounded-xl p-4 border border-border">
            <Text className="text-foreground font-semibold">Approval boundary active</Text>
            <Text className="text-sm text-muted mt-1">
              Connector writes, webhook calls, messages, publications, permission changes, and payments are not initiated from this screen. They require a recorded, human-approved execution request.
            </Text>
          </View>

          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Integration Registry</Text>
            {registryQuery.isLoading && (
              <View className="items-center py-3">
                <ActivityIndicator color={colors.primary} />
              </View>
            )}
            {registryQuery.error && (
              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-foreground font-semibold">Registry unavailable</Text>
                <Text className="text-xs text-muted mt-1">No connection state is inferred while provider metadata cannot be loaded.</Text>
              </View>
            )}
            {registryQuery.data?.map((integration) => {
              const tone = evidenceTone(integration.evidenceStatus);
              const badgeClass = tone === "success"
                ? "bg-success"
                : tone === "primary"
                  ? "bg-primary"
                  : tone === "warning"
                    ? "bg-warning"
                    : "bg-border";
              const titleClass = tone === "primary" ? "text-primary" : "text-foreground";

              return (
              <View
                key={integration.id}
                className="rounded-lg p-4 border bg-surface border-border"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 gap-1">
                    <Text className={`font-semibold ${titleClass}`}>{integration.displayName}</Text>
                    <Text className="text-xs text-muted">{integration.description}</Text>
                    <Text className="text-xs text-muted mt-1">Mode: {integration.connectionMode}</Text>
                    <Text className="text-xs text-muted mt-1">
                      Last verification: {integration.lastVerifiedAt ?? "not yet verified"}
                    </Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${badgeClass}`}>
                    <Text className="text-xs font-semibold text-background">
                      {integration.evidenceStatus}
                    </Text>
                  </View>
                </View>
              </View>
              );
            })}
          </View>

          <ExecutiveAutomationBoard />

          <CredentialContainmentBoard />

          <View className="bg-surface rounded-lg p-4 border border-border mt-4">
            <Text className="text-primary font-semibold text-center">Evidence states: PLANNED · SCAFFOLDED · INTEGRATED · VERIFIED · BLOCKED</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
