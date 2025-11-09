import "react-native-reanimated";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { HeaderActivity } from "@/components/molecules";
import { useColorScheme } from "@/hooks";
import { useStore } from "@/store";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { selected_task } = useStore();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="activity"
            options={{
              headerShown: true,
              header: () => <HeaderActivity data={selected_task} />,
            }}
          />
        </Stack>
        <StatusBar style="auto" />
        <Toast />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
