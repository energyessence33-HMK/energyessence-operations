import { Image, Text, View } from "react-native";

import { INSTAGRAM_TEST_POST_DRAFT } from "@/lib/social/instagram-test-post-draft";

export function InstagramTestPostDraft() {
  const draft = INSTAGRAM_TEST_POST_DRAFT;

  return (
    <View className="bg-surface rounded-xl p-4 border border-border gap-3">
      <View className="flex-row items-center justify-between gap-3">
        <View className="flex-1 gap-1">
          <Text className="text-base font-bold text-foreground">Instagram test-post draft</Text>
          <Text className="text-xs text-muted">{draft.handle} · TS-003 · L3 publication boundary</Text>
        </View>
        <View className="rounded-full bg-warning px-3 py-1">
          <Text className="text-xs font-semibold text-background">NOT PUBLIC</Text>
        </View>
      </View>

      <View className="rounded-lg border border-border p-3 gap-2">
        <Image
          accessibilityLabel={draft.altText}
          source={{ uri: draft.mediaUrl }}
          className="w-full rounded-lg bg-background"
          style={{ aspectRatio: 4 / 5 }}
          resizeMode="cover"
        />
        <Text className="text-sm font-semibold text-foreground">{draft.title}</Text>
        <Text className="text-sm leading-5 text-muted">{draft.caption}</Text>
      </View>

      <View className="gap-1">
        <Text className="text-xs font-semibold text-foreground">Visual and accessibility brief</Text>
        <Text className="text-xs leading-5 text-muted">{draft.visualBrief}</Text>
        <Text className="text-xs leading-5 text-muted mt-1">Alt text: {draft.altText}</Text>
      </View>

      <View className="rounded-lg bg-background p-3 gap-1 border border-border">
        <Text className="text-xs font-semibold text-foreground">Publication remains blocked</Text>
        {draft.blockers.map((blocker) => (
          <Text className="text-xs leading-5 text-muted" key={blocker}>• {blocker}</Text>
        ))}
      </View>
    </View>
  );
}
