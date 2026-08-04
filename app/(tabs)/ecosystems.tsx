import { ScrollView, View, Text, TouchableOpacity, Pressable } from "react-native";
// import { FlatList } from "react-native"; // Flat list component
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Ecosystem {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export default function EcosystemsScreen() {
  // const colors = useColors(); // Theme colors
  const [ecosystems, setEcosystems] = useState<Ecosystem[]>([
    {
      id: "1",
      name: "EnergyEssence",
      description: "High-frequency content for spiritual alignment",
      isActive: true,
    },
    {
      id: "2",
      name: "HitmaKING",
      description: "Direct action and execution framework",
      isActive: false,
    },
    {
      id: "3",
      name: "THOUGHT2PONDER",
      description: "Philosophical and reflective content",
      isActive: false,
    },
  ]);

  const handleSetActive = (id: string) => {
    setEcosystems(
      ecosystems.map((eco) => ({
        ...eco,
        isActive: eco.id === id,
      }))
    );
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Ecosystems</Text>
            <Text className="text-sm text-muted">Manage your content ecosystems</Text>
          </View>

          <View className="gap-3">
            {ecosystems.map((ecosystem) => (
              <TouchableOpacity
                key={ecosystem.id}
                onPress={() => handleSetActive(ecosystem.id)}
                className={`rounded-xl p-4 border ${
                  ecosystem.isActive
                    ? "bg-primary border-primary"
                    : "bg-surface border-border"
                }`}
              >
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 gap-2">
                    <Text
                      className={`text-lg font-bold ${
                        ecosystem.isActive ? "text-background" : "text-foreground"
                      }`}
                    >
                      {ecosystem.name}
                    </Text>
                    <Text
                      className={`text-sm ${
                        ecosystem.isActive ? "text-background opacity-80" : "text-muted"
                      }`}
                    >
                      {ecosystem.description}
                    </Text>
                  </View>
                  {ecosystem.isActive && (
                    <View className="w-3 h-3 bg-success rounded-full mt-1" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity className="bg-primary rounded-lg p-4 items-center mt-4">
            <Text className="text-background font-semibold">Add New Ecosystem</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
