import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText, ThemedView } from "@/components/atoms";
import { getUrgencyBadgeStyle } from "@/utils";
import { TaskT } from "@/types";


export const HeaderActivity  = ({ data }: { data: TaskT | null }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const BADGET = getUrgencyBadgeStyle(data?.urgency ?? "Baja");
[]
  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} color="#3B82F6" />
      </TouchableOpacity>
      <ThemedText
        style={{
          fontWeight: "bold",
          fontSize: 20,
          marginLeft: 16,
        }}
      >
        {data?.date}-{data?.hour}
      </ThemedText>
      <ThemedView
        style={[
          styles.containerBadget,
          {
            backgroundColor: BADGET?.backgroundColor,
            borderColor: BADGET?.borderColor,
          },
        ]}
      >
        <ThemedText
          style={[
            styles.textBadget,
            {
              color: BADGET.textColor,
            },
          ]}
        >
          {data?.urgency}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  containerBadget: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  textBadget: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
  },
});
