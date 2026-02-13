import { ScrollView, Text, View, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { klingAI } from "@/lib/services/kling-ai";
import { stateManager } from "@/lib/services/state-manager";
import { psychologyEngine } from "@/lib/services/psychology-engine";

interface VideoTemplate {
  id: string;
  duration: "1_min" | "3_min";
  name: string;
  description: string;
}

interface GeneratedVideo {
  id: string;
  title: string;
  duration: "1_min" | "3_min";
  status: "draft" | "processing" | "completed" | "failed";
  script: string;
  url?: string;
  createdAt: string;
}

export default function VideoGeneratorEnhancedScreen() {
  const colors = useColors();
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [scriptText, setScriptText] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideos, setGeneratedVideos] = useState<GeneratedVideo[]>([]);
  const [psychologyScore, setPsychologyScore] = useState<number | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("professional");
  const [selectedVoice, setSelectedVoice] = useState("narrator");

  const videoTemplates: VideoTemplate[] = [
    {
      id: "1",
      duration: "1_min",
      name: "Quick Promo",
      description: "Fast-paced promotional video",
    },
    {
      id: "2",
      duration: "1_min",
      name: "Teaser",
      description: "Build anticipation and curiosity",
    },
    {
      id: "3",
      duration: "3_min",
      name: "Educational",
      description: "In-depth teaching and value delivery",
    },
    {
      id: "4",
      duration: "3_min",
      name: "Story",
      description: "Emotional storytelling and connection",
    },
    {
      id: "5",
      duration: "3_min",
      name: "Product Demo",
      description: "Showcase features and benefits",
    },
  ];

  /**
   * Analyze script for psychology and emotional impact
   */
  const analyzeScriptPsychology = () => {
    if (!scriptText) return;
    const analysis = psychologyEngine.analyzeContent(scriptText);
    setPsychologyScore(analysis.conversionPotential);
  };

  /**
   * Generate video using Kling AI
   */
  const generateVideo = async () => {
    if (!videoTitle || !scriptText || !selectedDuration) {
      alert("Please fill in all fields");
      return;
    }

    setIsGenerating(true);

    try {
      // Generate professional script
      const { script } = klingAI.generateScript(
        scriptText,
        selectedDuration as "1_min" | "3_min"
      );

      // Call Kling AI to generate video
      const response = await klingAI.generateVideo({
        prompt: script,
        duration: selectedDuration as "1_min" | "3_min",
        style: selectedStyle as "professional" | "creative" | "minimal",
        voiceover: selectedVoice as "male" | "female" | "narrator",
      });

      if (response.status === "processing" || response.status === "completed") {
        const newVideo: GeneratedVideo = {
          id: response.video_id,
          title: videoTitle,
          duration: selectedDuration as "1_min" | "3_min",
          status: response.status === "processing" ? "processing" : "completed",
          script,
          url: response.url,
          createdAt: new Date().toISOString(),
        };

        // Save to state
        await stateManager.addVideo(newVideo);
        setGeneratedVideos([...generatedVideos, newVideo]);

        // Reset form
        setVideoTitle("");
        setScriptText("");
        setSelectedDuration(null);
        setPsychologyScore(null);

        alert(
          response.status === "processing"
            ? "Video generation started! Check back soon."
            : "Video generated successfully!"
        );
      } else {
        alert(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error("Video generation error:", error);
      alert("Failed to generate video. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

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

          {/* Premium Badge */}
          <View className="bg-gradient-to-r from-primary to-primary bg-opacity-10 rounded-lg p-4 border border-primary border-opacity-30">
            <View className="flex-row items-center gap-2">
              <Text className="text-xl">🎬</Text>
              <View className="flex-1">
                <Text className="text-sm font-bold text-primary">
                  Kling AI Integration
                </Text>
                <Text className="text-xs text-muted">
                  Professional video generation with AI scenes
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
                    .filter((t) => t.duration === "1_min")
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
                    .filter((t) => t.duration === "3_min")
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

              {/* Recent Videos */}
              {generatedVideos.length > 0 && (
                <View className="gap-3">
                  <Text className="text-lg font-bold text-foreground">
                    Recent Videos
                  </Text>
                  {generatedVideos.map((video) => (
                    <View
                      key={video.id}
                      className="bg-surface rounded-lg p-4 border border-border"
                    >
                      <View className="flex-row items-start justify-between">
                        <View className="flex-1 gap-1">
                          <Text className="text-base font-semibold text-foreground">
                            {video.title}
                          </Text>
                          <Text className="text-sm text-muted">
                            {video.duration} • {video.status}
                          </Text>
                        </View>
                        <View
                          className={`px-2 py-1 rounded-full ${
                            video.status === "completed"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        >
                          <Text className="text-xs font-bold text-background">
                            {video.status === "completed" ? "✓" : "⏳"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
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
                    <TouchableOpacity
                      onPress={analyzeScriptPsychology}
                      className="bg-primary px-3 py-1 rounded-full"
                    >
                      <Text className="text-background text-xs font-semibold">
                        Analyze
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

                {/* Psychology Score */}
                {psychologyScore !== null && (
                  <View className="bg-surface rounded-lg p-4 border border-border gap-2">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-sm font-semibold text-foreground">
                        Emotional Impact Score
                      </Text>
                      <Text className="text-2xl font-bold text-primary">
                        {psychologyScore}%
                      </Text>
                    </View>
                    <View className="h-2 bg-border rounded-full overflow-hidden">
                      <View
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${psychologyScore}%` }}
                      />
                    </View>
                    <Text className="text-xs text-muted">
                      {psychologyScore >= 80
                        ? "Excellent emotional resonance!"
                        : psychologyScore >= 60
                          ? "Good emotional impact"
                          : "Consider adding more emotional triggers"}
                    </Text>
                  </View>
                )}

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
                        {["professional", "creative", "minimal"].map((style) => (
                          <TouchableOpacity
                            key={style}
                            onPress={() => setSelectedStyle(style)}
                            className={`flex-1 rounded-lg p-2 border items-center ${
                              selectedStyle === style
                                ? "bg-primary border-primary"
                                : "bg-background border-border"
                            }`}
                          >
                            <Text
                              className={`text-xs font-medium ${
                                selectedStyle === style
                                  ? "text-background"
                                  : "text-foreground"
                              }`}
                            >
                              {style.charAt(0).toUpperCase() + style.slice(1)}
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
                        {["male", "female", "narrator"].map((voice) => (
                          <TouchableOpacity
                            key={voice}
                            onPress={() => setSelectedVoice(voice)}
                            className={`flex-1 rounded-lg p-2 border items-center ${
                              selectedVoice === voice
                                ? "bg-primary border-primary"
                                : "bg-background border-border"
                            }`}
                          >
                            <Text
                              className={`text-xs font-medium ${
                                selectedVoice === voice
                                  ? "text-background"
                                  : "text-foreground"
                              }`}
                            >
                              {voice.charAt(0).toUpperCase() + voice.slice(1)}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>

                {/* Generate Button */}
                <TouchableOpacity
                  onPress={generateVideo}
                  disabled={isGenerating}
                  className={`rounded-lg p-4 items-center justify-center flex-row gap-2 ${
                    isGenerating ? "bg-primary opacity-60" : "bg-primary"
                  }`}
                >
                  {isGenerating && (
                    <ActivityIndicator color={colors.background} />
                  )}
                  <Text className="text-background font-semibold">
                    {isGenerating ? "Generating..." : "Generate Video"}
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
