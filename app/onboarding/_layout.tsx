import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="spiritual-identity" />
      <Stack.Screen name="brand-basics" />
      <Stack.Screen name="set-frequency" />
      <Stack.Screen name="first-video" />
    </Stack>
  );
}
