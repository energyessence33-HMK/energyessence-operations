import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface VideoTemplate {
  id: string;
  duration: string;
  name: string;
  description: string;
}

export default function VideoGeneratorScreen() {
  const colors = useColors();
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [scriptText, setScriptText] = useState("");
  const [videoTitle, setVideoTitle] = useState("");

  const videoTemplates: VideoTemplate[] = [
    {
      id: "1",
      duration: "1-min",
      name: "Quick Promo",
      description: "Fast-paced promotional video",
    },
    {
      id: "2",
      duration: "1-min",
      name: "Teaser",
      description: "Build anticipation and curiosity",
    },
    {
      id: "3",
      duration: "3-min",
      name: "Educational",
      description: "In-depth teaching and value delivery",
    },
    {
      id: "4",
      duration: "3-min",
      name: "Story",
      description: "Emotional storytelling and connection",
    },
    {
      id: "5",
      duration: "3-min",
      name: "Product Demo",
      description: "Showcase features and benefits",
    },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">
              Video Generator
            </Text>
            <Text className="text-sm text-muted">
              AI-powered professional video creation
            </Text>
          </View>

          {/* Premium Feature Badge */}
          <View className="bg-gradient-to-r from-primary to-primary bg-opacity-10 rounded-lg p-4 border border-primary border-opacity-30">
            <View className="flex-row items-center gap-2">
              <Text className="text-xl">🎬</Text>
              <View className="flex-1">
                <Text className="text-sm font-bold text-primary">
                  Professional Video Generation
                </Text>
                <Text className="text-xs text-muted">
                  1-min & 3-min videos with AI scenes and scripts
                </Text>
              </View>
            </View>
          </View>

          {!selectedDuration ? (
            <>
              {/* Video Duration Selection */}
              <View className="gap-3">
                <Text className="text-lg font-bold text-foreground">
                  Choose Video Length
                </Text>

                {/* 1-Minute Videos */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">
                    1-Minute Videos
                  </Text>
                  {videoTemplates
                    .filter((t) => t.duration === "1-min")
                    .map((template) => (
                      <TouchableOpacity
                        key={template.id}
                        onPress={() => setSelectedDuration(template.id)}
                        className="bg-surface rounded-lg p-4 border border-border"
                      >
                        <Text className="text-base font-semibold text-foreground">
                          {template.name}
                        </Text>
                        <Text className="text-sm text-muted mt-1">
                          {template.description}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>

                {/* 3-Minute Videos */}
                <View className="gap-2 mt-2">
                  <Text className="text-sm font-semibold text-foreground">
                    3-Minute Videos
                  </Text>
                  {videoTemplates
                    .filter((t) => t.duration === "3-min")
                    .map((template) => (
                      <TouchableOpacity
                        key={template.id}
                        onPress={() => setSelectedDuration(template.id)}
                        className="bg-surface rounded-lg p-4 border border-border"
                      >
                        <Text className="text-base font-semibold text-foreground">
                          {template.name}
                        </Text>
                        <Text className="text-sm text-muted mt-1">
                          {template.description}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            </>
          ) : (
            <>
              {/* Video Creator */}
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-foreground">
                    {videoTemplates.find((t) => t.id === selectedDuration)?.name}
                  </Text>
                  <TouchableOpacity onPress={() => setSelectedDuration(null)}>
                    <Text className="text-primary font-semibold">Back</Text>
                  </TouchableOpacity>
                </View>

                {/* Video Title */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">
                    Video Title
                  </Text>
                  <TextInput
                    className="bg-surface border border-border rounded-lg p-3 text-foreground"
                    placeholder="Enter video title"
                    placeholderTextColor={colors.muted}
                    value={videoTitle}
                    onChangeText={setVideoTitle}
                  />
                </View>

                {/* Script Input */}
                <View className="gap-2">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm font-semibold text-foreground">
                      Script or Content
                    </Text>
                    <TouchableOpacity className="bg-primary px-3 py-1 rounded-full">
                      <Text className="text-background text-xs font-semibold">
                        AI Generate
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    className="bg-surface border border-border rounded-lg p-3 text-foreground"
                    placeholder="Paste your script or describe the video content..."
                    placeholderTextColor={colors.muted}
                    value={scriptText}
                    onChangeText={setScriptText}
                    multiline
                    numberOfLines={6}
                  />
                </View>

                {/* Video Settings */}
                <View className="gap-3">
                  <Text className="text-sm font-semibold text-foreground">
                    Video Settings
                  </Text>

                  <View className="bg-surface rounded-lg p-4 border border-border gap-3">
                    <View className="gap-2">
                      <Text className="text-xs font-semibold text-foreground">
                        Scene Style
                      </Text>
                      <View className="flex-row gap-2">
                        {["Professional", "Creative", "Minimal"].map((style) => (
                          <TouchableOpacity
                            key={style}
                            className="flex-1 bg-background rounded-lg p-2 border border-border items-center"
                          >
                            <Text className="text-xs text-foreground font-medium">
                              {style}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    <View className="gap-2">
                      <Text className="text-xs font-semibold text-foreground">
                        Voiceover
                      </Text>
                      <View className="flex-row gap-2">
                        {["Male", "Female", "Narrator"].map((voice) => (
                          <TouchableOpacity
                            key={voice}
                            className="flex-1 bg-background rounded-lg p-2 border border-border items-center"
                          >
                            <Text className="text-xs text-foreground font-medium">
                              {voice}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    <View className="gap-2">
                      <Text className="text-xs font-semibold text-foreground">
                        Music
                      </Text>
                      <TouchableOpacity className="bg-background rounded-lg p-3 border border-border">
                        <Text className="text-xs text-muted">
                          Select from library
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Preview */}
                <View className="bg-surface rounded-lg p-6 border border-border items-center justify-center h-40">
                  <Text className="text-foreground text-center">
                    Video Preview
                  </Text>
                  <Text className="text-xs text-muted mt-2">
                    Preview will appear here
                  </Text>
                </View>

                {/* Generate Button */}
                <TouchableOpacity className="bg-primary rounded-lg p-4 items-center">
                  <Text className="text-background font-semibold">
                    Generate Video
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-surface rounded-lg p-4 items-center border border-border">
                  <Text className="text-foreground font-semibold">
                    Save Draft
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
