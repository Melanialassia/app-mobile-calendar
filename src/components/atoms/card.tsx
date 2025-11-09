import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ThemedText, ThemedView } from "@/components/atoms";

export const Card = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return <ThemedView style={[styles.card, style]}>{children}</ThemedView>;
};

export const CardHeader = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return <ThemedView style={[styles.header, style]}>{children}</ThemedView>;
};

export const CardTitle = ({
  children,
  style,
  type = "title",
}: {
  children: React.ReactNode;
  style?: TextStyle;
  type?: "title" | "default" | "defaultSemiBold" | "subtitle" | "link";
}) => {
  return (
    <ThemedText style={style} type={type}>
      {children}
    </ThemedText>
  );
};

export const CardDescription = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: TextStyle;
}) => {
  return (
    <ThemedText style={[styles.description, style]}>{children}</ThemedText>
  );
};

export const CardContent = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return <ThemedView style={[styles.content, style]} >{children}</ThemedView>;
};

export const CardFooter = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return <ThemedView style={[styles.footer, style]}>{children}</ThemedView>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    overflow: "hidden",
    padding: 20,
  },
  header: {
    padding: 5,
  },
  description: {
    fontSize: 14,
    marginTop: 2,
  },
  content: {
    padding: 14,
  },
  footer: {
    padding: 14,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
