import {
  Alert,
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
  type ListRenderItem,
} from "react-native";
import { useCallback, useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import {
  BRAND_DOMAINS,
  UNIFIED_ECOSYSTEM_ASSET,
  type BrandDomain,
} from "@/lib/domains/domain-config";

export default function EcosystemsScreen() {
  const colors = useColors();
  const [activeDomainId, setActiveDomainId] = useState(BRAND_DOMAINS[0].id);

  const openDomain = useCallback(async (domain: BrandDomain) => {
    try {
      await Linking.openURL(domain.href);
    } catch {
      Alert.alert("Unable to open domain", `Please try ${domain.domain} again.`);
    }
  }, []);

  const renderDomain: ListRenderItem<BrandDomain> = useCallback(
    ({ item: domain }) => {
      const isActive = domain.id === activeDomainId;

      return (
        <View
          className="mb-4 overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: colors.surface,
            borderColor: isActive ? domain.accent : colors.border,
            borderWidth: isActive ? 1.5 : 1,
          }}
        >
          <Image
            source={{ uri: domain.asset }}
            accessibilityLabel={`${domain.name} brand visual`}
            resizeMode="cover"
            style={{ height: 132, width: "100%", opacity: isActive ? 1 : 0.78 }}
          />
          <View className="gap-3 p-4">
            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1 gap-1">
                <Text className="text-lg font-bold" style={{ color: colors.foreground }}>
                  {domain.name}
                </Text>
                <Text className="text-xs font-semibold uppercase" style={{ color: domain.accent }}>
                  {domain.domain}
                </Text>
              </View>
              {isActive && (
                <View
                  className="rounded-full px-3 py-1"
                  style={{ backgroundColor: `${domain.accent}22` }}
                >
                  <Text className="text-xs font-semibold" style={{ color: domain.accent }}>
                    Active
                  </Text>
                </View>
              )}
            </View>

            <Text className="text-xs font-semibold" style={{ color: colors.muted }}>
              {domain.role}
            </Text>
            <Text className="text-sm leading-5" style={{ color: colors.foreground }}>
              {domain.description}
            </Text>

            <View className="flex-row flex-wrap gap-2">
              {domain.tags.map((tag) => (
                <View
                  key={tag}
                  className="rounded-full px-2.5 py-1"
                  style={{ backgroundColor: colors.background }}
                >
                  <Text className="text-xs" style={{ color: colors.muted }}>
                    {tag}
                  </Text>
                </View>
              ))}
            </View>

            <View className="flex-row gap-2 pt-1">
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={`Set ${domain.name} as active ecosystem`}
                onPress={() => setActiveDomainId(domain.id)}
                activeOpacity={0.78}
                style={{
                  flex: 1,
                  alignItems: "center",
                  borderColor: domain.accent,
                  borderRadius: 10,
                  borderWidth: 1,
                  paddingVertical: 11,
                }}
              >
                <Text className="text-sm font-semibold" style={{ color: domain.accent }}>
                  {isActive ? "Selected" : "Select"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityRole="link"
                accessibilityLabel={`Open ${domain.domain}`}
                onPress={() => void openDomain(domain)}
                activeOpacity={0.78}
                style={{
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: domain.accent,
                  borderRadius: 10,
                  paddingVertical: 11,
                }}
              >
                <Text className="text-sm font-semibold" style={{ color: "#0F172A" }}>
                  {domain.cta}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    },
    [activeDomainId, colors, openDomain]
  );

  return (
    <ScreenContainer className="p-4">
      <FlatList
        data={BRAND_DOMAINS}
        keyExtractor={(domain) => domain.id}
        renderItem={renderDomain}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="mb-5 gap-4">
            <View className="overflow-hidden rounded-2xl border" style={{ borderColor: colors.border }}>
              <Image
                source={{ uri: UNIFIED_ECOSYSTEM_ASSET }}
                accessibilityLabel="Unified sacred geometry ecosystem banner"
                resizeMode="cover"
                style={{ height: 150, width: "100%" }}
              />
              <View className="absolute inset-x-0 bottom-0 p-4" style={{ backgroundColor: "#0F172ACC" }}>
                <Text className="text-2xl font-bold" style={{ color: "#F8FAFC" }}>
                  Your aligned ecosystem
                </Text>
                <Text className="mt-1 text-sm" style={{ color: "#BAE6FD" }}>
                  Four distinct expressions. One coherent operating system.
                </Text>
              </View>
            </View>
            <View className="gap-2">
              <Text className="text-sm font-semibold uppercase" style={{ color: colors.primary }}>
                Domain command center
              </Text>
              <Text className="text-sm leading-5" style={{ color: colors.muted }}>
                Activate one ecosystem at a time, then move directly into its live storefront or reflection practice.
              </Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <View className="mb-8 rounded-2xl border p-4" style={{ borderColor: colors.border, backgroundColor: colors.surface }}>
            <Text className="text-sm font-semibold" style={{ color: colors.foreground }}>
              Alignment standard
            </Text>
            <Text className="mt-2 text-xs leading-5" style={{ color: colors.muted }}>
              Keep identity, commerce, reflection, and execution connected. Each domain should feel distinct while remaining truthful to the same stewardship-led standard.
            </Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}
