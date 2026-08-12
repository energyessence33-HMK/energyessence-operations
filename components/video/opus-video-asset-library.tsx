import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { OPUS_VIDEO_ASSET_CATALOG, OPUS_THEME_TOKENS, type OpusVideoAsset } from "@/lib/content/opus-video-asset-catalog";

export function OpusVideoAssetLibrary() {
  const [selectedAsset, setSelectedAsset] = useState<OpusVideoAsset>(OPUS_VIDEO_ASSET_CATALOG[0]);
  const [activeTab, setActiveTab] = useState<"library" | "governance" | "frequencies">("library");

  return (
    <View className="flex-1 bg-[#06090F] p-4">
      {/* Header */}
      <View className="mb-6 rounded-2xl bg-[#102A62] p-5 border border-[#D9B458]/30">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-xs font-semibold uppercase tracking-widest text-[#D9B458]">
            Agent Opus &middot; God Mode Video Studio
          </Text>
          <View className="bg-[#35BFC1]/20 px-2.5 py-1 rounded-full border border-[#35BFC1]/40">
            <Text className="text-[10px] font-bold text-[#35BFC1]">HIGH FREQUENCY READY</Text>
          </View>
        </View>
        <Text className="text-2xl font-bold text-white mb-1">
          Branded Video Asset Library
        </Text>
        <Text className="text-sm text-[#94A3B8] leading-relaxed">
          Production-ready 9:16 shorts, reels, and commercials engineered with the 3-second rule, anime-pixel sacred geometry aesthetics, and Christ-consciousness frequency alignment.
        </Text>
      </View>

      {/* Navigation Tabs */}
      <View className="flex-row gap-2 mb-4">
        {[
          { key: "library", label: "Asset Library" },
          { key: "governance", label: "Opus & 3S Rules" },
          { key: "frequencies", label: "Vibration Tones" }
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2.5 rounded-xl items-center border ${
              activeTab === tab.key
                ? "bg-[#D9B458] border-[#D9B458]"
                : "bg-[#102A62]/40 border-[#1E293B]"
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                activeTab === tab.key ? "text-[#06090F]" : "text-[#94A3B8]"
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {activeTab === "library" && (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="gap-3 pb-6">
            {OPUS_VIDEO_ASSET_CATALOG.map((asset) => {
              const isSelected = selectedAsset.id === asset.id;
              return (
                <TouchableOpacity
                  key={asset.id}
                  onPress={() => setSelectedAsset(asset)}
                  className={`rounded-2xl p-4 border transition-all ${
                    isSelected
                      ? "bg-[#102A62] border-[#D9B458]"
                      : "bg-[#0B132B]/85 border-[#1E293B]"
                  }`}
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center gap-2">
                      <View className="bg-[#35BFC1]/20 px-2 py-0.5 rounded border border-[#35BFC1]/40">
                        <Text className="text-[10px] font-bold text-[#35BFC1]">{asset.category}</Text>
                      </View>
                      <Text className="text-xs text-[#94A3B8]">{asset.durationSeconds}s &middot; {asset.aspectRatio}</Text>
                    </View>
                    <Text className="text-[10px] font-mono text-[#D9B458]">{asset.id}</Text>
                  </View>

                  <Text className="text-lg font-bold text-white mb-1">{asset.title}</Text>
                  <Text className="text-xs text-[#D9B458] mb-3">{asset.frequencyVibrationTag}</Text>

                  <View className="bg-[#06090F]/60 rounded-xl p-3 border border-[#1E293B] mb-3">
                    <Text className="text-xs font-semibold text-[#35BFC1] mb-1">Hook (3-Second Rule):</Text>
                    <Text className="text-xs text-white leading-relaxed">{asset.hookThreeSecondRule}</Text>
                  </View>

                  <View className="flex-row items-center justify-between pt-2 border-t border-[#1E293B]/50">
                    <Text className="text-[11px] text-[#94A3B8]">Status: <Text className="text-white font-medium">{asset.status}</Text></Text>
                    <Text className="text-xs font-bold text-[#D9B458]">
                      {isSelected ? "Selected for Opus Pipeline" : "Tap to Inspect →"}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}

      {activeTab === "governance" && (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="bg-[#0B132B] rounded-2xl p-5 border border-[#1E293B] gap-4 mb-6">
            <Text className="text-lg font-bold text-white">Agent Opus Production Standards</Text>
            <Text className="text-sm text-[#94A3B8] leading-relaxed">
              Every video asset generated within Kingdom Executor Studio must adhere to strict non-negotiable governance rules:
            </Text>
            
            <View className="gap-3">
              {[
                { title: "1. The 3-Second Rule", desc: "Every clip must hook the viewer within 3 seconds using high-frequency visual contrast, sacred geometry alignment, or stark minimalist typography." },
                { title: "2. Christ-Consciousness & Truth", desc: "Strict separation between Scripture, spiritual interpretation, AI inference, and technical facts. Zero sensational or supernatural claims." },
                { title: "3. Anime-Pixel Divine Palette", desc: "Enforced color spectrum: Midnight Black (#06090F), Deep Sapphire (#102A62), Radiant Gold (#D9B458), and Muted Turquoise (#35BFC1)." },
                { title: "4. Approval-Gated Publishing", desc: "No automated publishing or external sending occurs without explicit L3/L4 human sign-off." }
              ].map((rule, idx) => (
                <View key={idx} className="bg-[#06090F] p-3 rounded-xl border border-[#1E293B]">
                  <Text className="text-xs font-bold text-[#D9B458] mb-1">{rule.title}</Text>
                  <Text className="text-xs text-white leading-relaxed">{rule.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {activeTab === "frequencies" && (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="bg-[#0B132B] rounded-2xl p-5 border border-[#1E293B] gap-4 mb-6">
            <Text className="text-lg font-bold text-white">Vibrational Frequency Alignment</Text>
            <Text className="text-sm text-[#94A3B8] leading-relaxed">
              Audio and visual assets are harmonized to specific resonant frequencies to evoke calm, intentional focus and sovereign clarity.
            </Text>

            <View className="gap-3">
              {OPUS_THEME_TOKENS.highFrequencyVibrations.map((item, idx) => (
                <View key={idx} className="bg-[#06090F] p-4 rounded-xl border border-[#D9B458]/30 flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-sm font-bold text-[#D9B458] mb-1">{item.freq}</Text>
                    <Text className="text-xs text-white">{item.intent}</Text>
                  </View>
                  <View className="bg-[#35BFC1]/20 px-3 py-1.5 rounded-lg border border-[#35BFC1]/40">
                    <Text className="text-[10px] font-bold text-[#35BFC1]">ACTIVE SYNC</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
