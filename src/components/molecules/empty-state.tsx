import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "@/components/atoms";

export const EmptyState = ({
  title,
  description,
  content,
}: {
  title: string;
  description?: string;
  content?: React.ReactNode;
}) => (
  <ThemedView style={styles.emptyContainer}>
    <Image
      source={require("@/assets/empty-state.png")}
      style={styles.emptyImage}
    />
    <ThemedText style={styles.emptyTitle}>{title}</ThemedText>
    {description && (
      <ThemedText style={styles.emptySubtitle}>{description}</ThemedText>
    )}
    {content && content}
  </ThemedView>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  emptyImage: {
    width: 180,
    height: 180,
    marginBottom: 16,
    opacity: 0.8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});
