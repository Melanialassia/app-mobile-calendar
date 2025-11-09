import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  ViewStyle,
} from "react-native";
import { CustomeCalendar, ThemedView } from "@/components/atoms";

export const FloatingCalendar = ({
  positionBottom,
  positionCalendar,
}: {
  positionBottom?: ViewStyle;
  positionCalendar?: ViewStyle;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <TouchableHighlight
        onPress={() => setOpen(!open)}
        style={[
          styles.floatingButton,
          { backgroundColor: "#3B82F6" },
          positionBottom,
        ]}
      >
        <Ionicons name="calendar-clear-outline" size={24} color="#fff" />
      </TouchableHighlight>
      {open && (
        <ThemedView style={[styles.calendar, positionCalendar]}>
          <CustomeCalendar setOpen={setOpen} />
        </ThemedView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 5,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  calendar: {
    position: "absolute",
    bottom: 80,
    right: 5,
    width: 300,
    height: 350,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1000,
  },
});
