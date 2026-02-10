import { ScrollView, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Template {
  id: string;
  name: string;
  description: string;
}

export default function GeneratorScreen() {
  const colors = useColors();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [adText, setAdText] = useState("");

  const templates: Template[] = [
    { id: "1", name: "Hero Banner", description: "Large headline + CTA" },
    { id: "2", name: "Product Card", description: "Image + title + price" },
    { id: "3", name: "Testimonial", description: "Quote + author + image" },
    { id: "4", name: "Carousel", description: "Multi-image carousel" },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Ad Generator</Text>
            <Text className="text-sm text-muted">Create branded ads with templates</Text>
          </View>

          {!selectedTemplate ? (
            <>
              {/* Template Selection */}
              <View className="gap-3">
                <Text className="text-lg font-bold text-foreground">Choose Template</Text>
                {templates.map((template) => (
                  <TouchableOpacity
                    key={template.id}
                    onPress={() => setSelectedTemplate(template.id)}
                    className="bg-surface rounded-lg p-4 border border-border"
                  >
                    <Text className="text-base font-semibold text-foreground">
                      {template.name}
                    </Text>
                    <Text className="text-sm text-muted mt-1">{template.description}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <>
              {/* Template Editor */}
              <View className="gap-3">
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-foreground">
                    {templates.find((t) => t.id === selectedTemplate)?.name}
                  </Text>
                  <TouchableOpacity onPress={() => setSelectedTemplate(null)}>
                    <Text className="text-primary font-semibold">Change</Text>
                  </TouchableOpacity>
                </View>

                {/* Preview */}
                <View className="bg-surface rounded-lg p-6 border border-border items-center justify-center h-48">
                  <Text className="text-foreground font-bold text-center text-lg">
                    {adText || "Your ad preview"}
                  </Text>
                </View>

                {/* Text Editor */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">Headline</Text>
                  <TextInput
                    className="bg-surface border border-border rounded-lg p-3 text-foreground"
                    placeholder="Enter headline text"
                    placeholderTextColor={colors.muted}
                    value={adText}
                    onChangeText={setAdText}
                    multiline
                  />
                </View>

                {/* Tools */}
                <View className="gap-2">
                  <Text className="text-sm font-semibold text-foreground">Tools</Text>
                  <View className="gap-2">
                    <TouchableOpacity className="bg-surface rounded-lg p-3 border border-border">
                      <Text className="text-foreground text-center">Upload Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-surface rounded-lg p-3 border border-border">
                      <Text className="text-foreground text-center">Neutralize Background</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-surface rounded-lg p-3 border border-border">
                      <Text className="text-foreground text-center">Safe Crop</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Actions */}
                <View className="gap-2 mt-4">
                  <TouchableOpacity className="bg-primary rounded-lg p-4 items-center">
                    <Text className="text-background font-semibold">Save to Library</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-surface rounded-lg p-4 items-center border border-border">
                    <Text className="text-foreground font-semibold">Export</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
