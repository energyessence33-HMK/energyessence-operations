import { ScrollView, Text, View, Switch, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

interface NavigationPreferences {
  sidebarVisible: boolean;
  sidebarCollapsed: boolean;
  showCategoryLabels: boolean;
  compactMode: boolean;
  animationsEnabled: boolean;
  notificationsEnabled: boolean;
  darkMode: boolean;
}

const DEFAULT_PREFERENCES: NavigationPreferences = {
  sidebarVisible: true,
  sidebarCollapsed: false,
  showCategoryLabels: true,
  compactMode: false,
  animationsEnabled: true,
  notificationsEnabled: true,
  darkMode: true,
};

export default function SettingsScreen() {
  const colors = useColors();
  const [preferences, setPreferences] = useState<NavigationPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);

  // Load preferences from storage
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const stored = await AsyncStorage.getItem("navigationPreferences");
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading preferences:", error);
      setLoading(false);
    }
  };

  const savePreferences = async (newPrefs: NavigationPreferences) => {
    try {
      await AsyncStorage.setItem("navigationPreferences", JSON.stringify(newPrefs));
      setPreferences(newPrefs);
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  const handleToggle = (key: keyof NavigationPreferences) => {
    const updated = { ...preferences, [key]: !preferences[key] };
    savePreferences(updated);
  };

  const resetToDefaults = async () => {
    await savePreferences(DEFAULT_PREFERENCES);
  };

  if (loading) {
    return (
      <ScreenContainer className="justify-center items-center">
        <Text className="text-foreground text-lg">Loading preferences...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-background">
        {/* Header */}
        <View className="px-6 pt-6 pb-4 border-b border-border">
          <Text className="text-3xl font-bold text-foreground">Settings</Text>
          <Text className="text-sm text-muted mt-2">Customize your navigation and app experience</Text>
        </View>

        {/* Navigation Preferences Section */}
        <View className="px-6 py-6 border-b border-border">
          <Text className="text-xl font-semibold text-foreground mb-4">Navigation Preferences</Text>

          {/* Sidebar Visibility */}
          <SettingRow
            icon="visibility"
            label="Show Sidebar"
            description="Display left navigation sidebar on desktop"
            value={preferences.sidebarVisible}
            onToggle={() => handleToggle("sidebarVisible")}
            colors={colors}
          />

          {/* Sidebar Collapse */}
          <SettingRow
            icon="unfold-less"
            label="Collapse Sidebar by Default"
            description="Start with sidebar in collapsed state"
            value={preferences.sidebarCollapsed}
            onToggle={() => handleToggle("sidebarCollapsed")}
            colors={colors}
          />

          {/* Category Labels */}
          <SettingRow
            icon="label"
            label="Show Category Labels"
            description="Display text labels in navigation items"
            value={preferences.showCategoryLabels}
            onToggle={() => handleToggle("showCategoryLabels")}
            colors={colors}
          />

          {/* Compact Mode */}
          <SettingRow
            icon="compress"
            label="Compact Mode"
            description="Reduce spacing and padding throughout the app"
            value={preferences.compactMode}
            onToggle={() => handleToggle("compactMode")}
            colors={colors}
          />
        </View>

        {/* Experience Section */}
        <View className="px-6 py-6 border-b border-border">
          <Text className="text-xl font-semibold text-foreground mb-4">Experience</Text>

          {/* Animations */}
          <SettingRow
            icon="movie"
            label="Enable Animations"
            description="Smooth transitions and micro-interactions"
            value={preferences.animationsEnabled}
            onToggle={() => handleToggle("animationsEnabled")}
            colors={colors}
          />

          {/* Notifications */}
          <SettingRow
            icon="notifications-active"
            label="Enable Notifications"
            description="Receive daily affirmations and updates"
            value={preferences.notificationsEnabled}
            onToggle={() => handleToggle("notificationsEnabled")}
            colors={colors}
          />

          {/* Dark Mode */}
          <SettingRow
            icon="brightness-4"
            label="Dark Mode"
            description="Use dark theme throughout the app"
            value={preferences.darkMode}
            onToggle={() => handleToggle("darkMode")}
            colors={colors}
          />
        </View>

        {/* Reset Section */}
        <View className="px-6 py-6">
          <TouchableOpacity
            onPress={resetToDefaults}
            style={{
              backgroundColor: colors.error,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <MaterialIcons name="restore" size={20} color={colors.background} />
            <Text style={{ color: colors.background, fontSize: 16, fontWeight: "600" }}>
              Reset to Defaults
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer Info */}
        <View className="px-6 py-4 bg-surface rounded-lg mx-6 mb-6">
          <Text className="text-xs text-muted text-center">
            Your preferences are automatically saved and synced across all devices when you{"'"}re logged in.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

interface SettingRowProps {
  icon: string;
  label: string;
  description: string;
  value: boolean;
  onToggle: () => void;
  colors: any;
}

function SettingRow({ icon, label, description, value, onToggle, colors }: SettingRowProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 8,
        backgroundColor: colors.surface,
        borderRadius: 8,
        borderColor: colors.border,
        borderWidth: 1,
      }}
    >
      <MaterialIcons name={icon as any} size={24} color={colors.primary} style={{ marginRight: 12 }} />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: colors.foreground }}>{label}</Text>
        <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{description}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={value ? colors.background : colors.muted}
      />
    </View>
  );
}
