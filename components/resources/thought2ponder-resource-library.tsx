import * as Linking from "expo-linking";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import {
  CONTENT_CLASS_LABELS,
  THOUGHT2PONDER_RESOURCES,
  type Thought2PonderResource,
} from "@/lib/content/thought2ponder-resource-catalog";
import { ENERGYESSENCE_EXPERIENCE_TRACKS } from "@/lib/content/energyessence-experience-catalog";

async function openPublisherDestination(resource: Thought2PonderResource) {
  const supported = await Linking.canOpenURL(resource.publisherUrl);

  if (!supported) {
    Alert.alert("Unable to open resource", "Your device could not open the publisher destination.");
    return;
  }

  await Linking.openURL(resource.publisherUrl);
}

export function Thought2PonderResourceLibrary() {
  return (
    <View className="gap-3">
      <View className="gap-1">
        <Text className="text-lg font-bold text-foreground">Thought2Ponder Library</Text>
        <Text className="text-sm text-muted">
          Owner-supplied reflection resources. The app catalogs each guide; access remains publisher-controlled.
        </Text>
      </View>

      <View className="bg-surface rounded-lg p-4 border border-border gap-2">
        <Text className="text-xs font-semibold text-primary uppercase tracking-wider">Content discernment</Text>
        <Text className="text-xs text-muted leading-5">
          Scripture, author interpretation, guided practice, technical fact, and AI inference are shown as distinct categories.
        </Text>
      </View>

      <View className="gap-2">
        {THOUGHT2PONDER_RESOURCES.map((resource) => (
          <View key={resource.id} className="bg-surface rounded-lg p-4 border border-border gap-3">
            <View className="gap-1">
              <Text className="text-base font-semibold text-foreground">{resource.title}</Text>
              <Text className="text-xs text-primary font-semibold">{resource.durationLabel}</Text>
              <Text className="text-sm text-muted leading-5">{resource.summary}</Text>
            </View>

            <View className="flex-row flex-wrap gap-1">
              {resource.classifications.map((classification) => (
                <View key={classification} className="bg-border rounded-full px-2 py-1">
                  <Text className="text-[10px] text-muted font-semibold">
                    {CONTENT_CLASS_LABELS[classification]}
                  </Text>
                </View>
              ))}
            </View>

            {resource.scriptureReferences?.length ? (
              <Text className="text-xs text-muted">
                Cited source: {resource.scriptureReferences.join(", ")}
              </Text>
            ) : null}

            {resource.safetyNote ? <Text className="text-xs text-muted leading-5">{resource.safetyNote}</Text> : null}

            <TouchableOpacity
              accessibilityRole="link"
              accessibilityLabel={`Open ${resource.title} at Thought2Ponder`}
              onPress={() => void openPublisherDestination(resource)}
              className="border border-primary rounded-lg px-3 py-3 items-center"
            >
              <Text className="text-primary font-semibold text-sm">Open at Thought2Ponder</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View className="gap-2 mt-2">
        <Text className="text-lg font-bold text-foreground">Energy Essence Operating Rhythm</Text>
        <Text className="text-sm text-muted">
          A claim-safe planning rhythm derived from the supplied landing-page structure, not product or health guidance.
        </Text>
        {ENERGYESSENCE_EXPERIENCE_TRACKS.map((track) => (
          <View key={track.id} className="bg-surface rounded-lg p-4 border border-border gap-1">
            <Text className="text-xs text-primary font-semibold uppercase tracking-wider">{track.planningFocus}</Text>
            <Text className="text-base font-semibold text-foreground">{track.name}</Text>
            <Text className="text-sm text-muted leading-5">{track.safeDescription}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
