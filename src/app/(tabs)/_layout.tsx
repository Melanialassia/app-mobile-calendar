import { Tabs } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { HapticTab } from "@/components/haptic-tab";
import { HeaderHome } from "@/components/molecules";
import { useColorScheme } from "@/hooks";
import { Colors } from "@/constants";
import { useStore } from "@/store";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { setSelectedTask } = useStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          headerShown: true,
          header: () => <HeaderHome />,
        }}
      />
      <Tabs.Screen
        name="add-activity"
        listeners={({}) => ({
          tabPress: (e) => {
            setSelectedTask({ data: null });
          },
        })}
        options={{
          title: "Agregar actividad",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
