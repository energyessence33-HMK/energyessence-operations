import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Integration {
  id: string;
  name: string;
  status: "connected" | "disconnected";
  description: string;
}

export default function IntegrationsScreen() {
  const colors = useColors();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "1",
      name: "Zapier",
      status: "connected",
      description: "Automate workflows with Zapier",
    },
    {
      id: "2",
      name: "Make",
      status: "disconnected",
      description: "Connect with Make automation",
    },
    {
      id: "3",
      name: "Buffer",
      status: "disconnected",
      description: "Social media scheduling",
    },
    {
      id: "4",
      name: "Hootsuite",
      status: "disconnected",
      description: "Social media management",
    },
    {
      id: "5",
      name: "Notion",
      status: "disconnected",
      description: "Database and wiki integration",
    },
    {
      id: "6",
      name: "Google Sheets",
      status: "disconnected",
      description: "Spreadsheet integration",
    },
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(
      integrations.map((int) =>
        int.id === id
          ? {
              ...int,
              status:
                int.status === "connected" ? "disconnected" : "connected",
            }
          : int
      )
    );
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Integrations</Text>
            <Text className="text-sm text-muted">Connect external services</Text>
          </View>

          {/* Webhook Configuration */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Webhook URL</Text>
            <View className="gap-2">
              <TextInput
                className="bg-surface border border-border rounded-lg p-3 text-foreground text-xs"
                placeholder="https://your-webhook-url.com/..."
                placeholderTextColor={colors.muted}
                value={webhookUrl}
                onChangeText={setWebhookUrl}
              />
              <TouchableOpacity className="bg-primary rounded-lg p-3 items-center">
                <Text className="text-background font-semibold text-sm">Test Webhook</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Available Services */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Services</Text>
            {integrations.map((integration) => (
              <TouchableOpacity
                key={integration.id}
                onPress={() => toggleIntegration(integration.id)}
                className={`rounded-lg p-4 border ${
                  integration.status === "connected"
                    ? "bg-primary bg-opacity-10 border-primary"
                    : "bg-surface border-border"
                }`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 gap-1">
                    <Text
                      className={`font-semibold ${
                        integration.status === "connected"
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {integration.name}
                    </Text>
                    <Text className="text-xs text-muted">{integration.description}</Text>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      integration.status === "connected"
                        ? "bg-success"
                        : "bg-border"
                    }`}
                  >
                    <Text className="text-xs font-semibold text-background capitalize">
                      {integration.status === "connected" ? "On" : "Off"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Documentation Link */}
          <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border items-center mt-4">
            <Text className="text-primary font-semibold">View Integration Docs</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
