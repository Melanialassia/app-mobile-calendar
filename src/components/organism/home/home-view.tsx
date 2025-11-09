import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, TouchableHighlight } from "react-native";
import { Card, CardContent, ThemedText, ThemedView } from "@/components/atoms";
import { EmptyState, FloatingCalendar } from "@/components/molecules";
import { DeleteActivity } from "@/components/organism";
import { getUrgencyBadgeStyle } from "@/utils";
import { useStore } from "@/store";

export const HomeView = () => {
  const navigation = useNavigation<any>();
  const { selected_day, setSelectedTask, tasks, filter_urgency } = useStore();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const FILTER_DATA = tasks
    ?.filter((t) => t.date === selected_day)
    ?.filter((t) =>
      filter_urgency === "Todas" ? true : t.urgency === filter_urgency
    );
  const SORT_DATA = FILTER_DATA?.sort((a, b) => a.hour.localeCompare(b.hour));

  return (
    <ThemedView style={[styles.container]}>
      <FlatList
        contentContainerStyle={styles.listCardContetn}
        data={SORT_DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const BADGET = getUrgencyBadgeStyle(item.urgency);

          return (
            <Card
              style={{
                borderLeftWidth: 3,
                borderLeftColor: BADGET.borderColor,
              }}
            >
              <CardContent style={styles.contentCard}>
                <Ionicons name="time-outline" size={24} color="#3B82F6" />
                <TouchableHighlight
                  style={{ flex: 1 }}
                  onPress={() => {
                    setSelectedTask({ data: item });
                    navigation.navigate("activity");
                  }}
                >
                  <ThemedView style={styles.ThemedText}>
                    <ThemedText style={styles.hour}>{item.hour}</ThemedText>
                    <ThemedText style={styles.title}>
                      {item.title.length > 21
                        ? item.title.slice(0, 21) + "…"
                        : item.title}
                    </ThemedText>
                  </ThemedView>
                </TouchableHighlight>
                <ThemedView style={styles.iconContainer}>
                  <TouchableHighlight
                    onPress={() => {
                      setSelectedTask({ data: item });
                      navigation.navigate("add-activity");
                    }}
                  >
                    <MaterialIcons name="edit" size={24} color="#93C5FD" />
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => {
                      setSelectedTask({ data: item });
                      setOpenModal(true);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={24}
                      color="#EF4444"
                      underlayColor="#ec3a3aff"
                    />
                  </TouchableHighlight>
                </ThemedView>
              </CardContent>
            </Card>
          );
        }}
        ListEmptyComponent={
          <EmptyState
            title="No hay actividades este día"
            description="¿Querés agregar una nueva actividad?"
            content={
              <TouchableHighlight
                style={styles.addActivity}
                onPress={() => {
                  setSelectedTask({ data: null });
                  navigation.navigate("add-activity");
                }}
              >
                <ThemedText
                  style={{
                    color: "#fff",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Agregar actividad
                </ThemedText>
              </TouchableHighlight>
            }
          />
        }
      />
      <DeleteActivity open={openModal} onClose={() => setOpenModal(false)} />
      <FloatingCalendar />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  contentCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 8,
    gap: 12,
  },
  ThemedText: {
    flex: 1,
    flexDirection: "column",
  },
  hour: {
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
  },
  listCardContetn: {
    paddingHorizontal: 5,
    gap: 8,
  },
  addActivity: {
    marginTop: 20,
    backgroundColor: "#3B82F6",
    padding: 15,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
