import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { ThemedText, ThemedView } from "@/components/atoms";
import { useThemeColor } from "@/hooks";
import { useStore } from "@/store";


export const CustomeCalendar = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {
  const { setSelectedDay, selected_day } = useStore();
  const BG_COLOR = useThemeColor({ light: "#fff", dark: "#111" }, "background");
  const TEXT_COLOR = useThemeColor({ light: "#000", dark: "#fff" }, "text");
  const SELECTED_DAY = useThemeColor(
    { light: "#3B82F6", dark: "#2563EB" },
    "tint"
  );

  return (
    <Calendar
      current={selected_day}
      onDayPress={(day) => {
        setSelectedDay({ day: day.dateString });
        setOpen(false);
      }}
      customHeader={(props: any) => {
        const DATE = new Date(props.month);
        const MONTH = DATE.toLocaleString("es-ES", {
          month: "long",
        }).toUpperCase();
        const YEAR = DATE.getFullYear();

        return (
          <ThemedView>
            <ThemedView
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 0,
              }}
            >
              <TouchableOpacity onPress={() => props.addMonth(-1)}>
                <Ionicons name="chevron-back" size={22} color="#3B82F6" />
              </TouchableOpacity>

              <ThemedText
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#3B82F6",
                }}
              >
                {MONTH} {YEAR}
              </ThemedText>

              <TouchableOpacity onPress={() => props.addMonth(1)}>
                <Ionicons name="chevron-forward" size={22} color="#3B82F6" />
              </TouchableOpacity>
            </ThemedView>
            <ThemedView
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingVertical: 6,
              }}
            >
              {["LU", "MA", "MI", "JU", "VI", "SA", "DO"].map((day) => (
                <ThemedText
                  key={day}
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#3B82F6",
                  }}
                >
                  {day}
                </ThemedText>
              ))}
            </ThemedView>
          </ThemedView>
        );
      }}
      markedDates={{
        [selected_day]: {
          selected: true,
          selectedColor: "#3B82F6",
        },
      }}
      style={{ borderRadius: 10, width: "100%", height: "100%", padding: 10 }}
      theme={{
        textSectionTitleDisabledColor: "#d9e1e8",
        selectedDayBackgroundColor: "blue",
        selectedDayTextColor: "#fff",
        textDisabledColor: "#d9e1e8",
        dotColor: "blue",
        selectedDotColor: "#fff",
        textDayFontSize: 14,
        textMonthFontSize: 12,
        textDayHeaderFontSize: 12,
        backgroundColor: TEXT_COLOR,
        calendarBackground: BG_COLOR,
        textSectionTitleColor: TEXT_COLOR,
        todayTextColor: "#3B82F6",
        dayTextColor: TEXT_COLOR,
        arrowColor: SELECTED_DAY,
        monthTextColor: SELECTED_DAY,
      }}
    />
  );
};
