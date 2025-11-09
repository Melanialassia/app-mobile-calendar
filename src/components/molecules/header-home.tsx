import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText, ThemedView } from "@/components/atoms";
import { FILTERS_BADGE } from "@/constants";
import { useStore } from "@/store";

export const HeaderHome = () => {
  const { filter_urgency, setFilterUrgency } = useStore();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <ThemedView style={styles.containerLabel}>
        {FILTERS_BADGE?.map((item) => {
          const IS_SELECTED = filter_urgency === item.label;

          return (
            <TouchableOpacity
              key={item.label}
              onPress={() => setFilterUrgency(item.label as any)}
              style={[
                styles.button,
                {
                  backgroundColor: IS_SELECTED ? item.color : "transparent",
                  borderColor: item.color,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.label,
                  {
                    color: IS_SELECTED ? "#fff" : item.color,
                  },
                ]}
              >
                {item.label}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    gap: 10,
  },
  containerLabel: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,

    borderWidth: 1,

    alignItems: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
  },
});
