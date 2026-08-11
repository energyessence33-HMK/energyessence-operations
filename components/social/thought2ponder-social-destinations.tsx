import { Text, View } from "react-native";

import { THOUGHT2PONDER_SOCIAL_DESTINATIONS } from "@/lib/social/thought2ponder-social-destinations";

export function Thought2PonderSocialDestinations() {
  return (
    <View className="gap-3">
      <View className="gap-1">
        <Text className="text-lg font-bold text-foreground">Thought2Ponder Social Destinations</Text>
        <Text className="text-sm text-muted">Profiles are registered as governed destinations; connection and publishing remain separate decisions.</Text>
      </View>
      {THOUGHT2PONDER_SOCIAL_DESTINATIONS.map((destination) => (
        <View key={destination.id} className="bg-surface rounded-lg p-4 border border-border gap-2">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-semibold text-foreground">{destination.platform === "instagram" ? "Instagram" : "TikTok"}</Text>
              <Text className="text-xs text-muted">{destination.handle}</Text>
            </View>
            <View className="rounded-full px-2 py-1 bg-warning">
              <Text className="text-[10px] font-bold text-background">{destination.evidenceStatus}</Text>
            </View>
          </View>
          <Text className="text-xs text-muted leading-5">{destination.blockingReason}</Text>
          <Text className="text-xs text-muted leading-5">Safe scope: {destination.safeScope.join(" · ")}</Text>
        </View>
      ))}
    </View>
  );
}
