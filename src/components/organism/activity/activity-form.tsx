import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { format, toZonedTime } from "date-fns-tz";
import { useRouter } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { LABEL } from "@/constants";
import {
  CardHeader,
  CardTitle,
  Select,
  ThemedText,
  ThemedView,
} from "@/components/atoms";
import { ActivityFormErrors, ActivityFormT } from "@/types";
import { parseDateTime } from "@/utils";
import { useStore } from "@/store";
import { validateActivityForm } from "./validations";

export const ActivityForm = () => {
  const router = useRouter();
  const { selected_task, setSelectedTask, setAddTask, setEditTask, tasks } =
    useStore();
  const insets = useSafeAreaInsets();
  const [errors, setErrors] = useState<ActivityFormErrors>({});
  const [form, setForm] = useState<ActivityFormT>({
    id: 0,
    title: "",
    description: "",
    date: new Date(),
    hour: new Date(),
    urgency: "Media",
  });

  const { title, description, date, hour, urgency } = form;

  const onChange = <K extends keyof ActivityFormT>(
    key: K,
    value: ActivityFormT[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    const validation = validateActivityForm({ ...form, [key]: value });
    setErrors(validation.errors);
  };

  const onSubmit = () => {
    const validation = validateActivityForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return Toast.show({
        type: "error",
        text1: "Ups! ocurrio un error",
        text2: "Asegurese de que los campos este correctamente completados.",
      });
    } else {
      const NEW_OBJECT = {
        ...form,
        date: format(
          toZonedTime(form.date, "America/Argentina/Buenos_Aires"),
          "yyyy-MM-dd"
        ),
        hour: format(
          toZonedTime(form.hour, "America/Argentina/Buenos_Aires"),
          "HH:mm"
        ),
      };
      const isDuplicate = tasks?.some(
        (task) =>
          task.date === NEW_OBJECT.date &&
          task.hour === NEW_OBJECT.hour &&
          task.id !== form.id
      );
      if (isDuplicate) {
        return Toast.show({
          type: "error",
          text1: "Ya existe un evento en esa fecha y hora",
          text2:"Elija otra fecha o puede editar el evento ya existente"
        });
      } else {
        if (selected_task && selected_task?.id) {
          setEditTask({
            data: NEW_OBJECT,
          });
          Toast.show({
            type: "success",
            text1: "Actividad modificada con exito",
          });
          setErrors({});
        } else {
          setAddTask({
            data: NEW_OBJECT,
          });
          Toast.show({
            type: "success",
            text1: "Actividad creada con exito",
          });
          setErrors({});
        }
      }
    }
  };

  useEffect(() => {
    if (selected_task) {
      setForm({
        id: selected_task.id,
        title: selected_task.title,
        description: selected_task.description,
        date: parseDateTime(selected_task.date),
        hour: parseDateTime(selected_task.date, selected_task.hour),
        urgency: selected_task.urgency,
      });
      setErrors({});
    } else {
      setForm({
        id: 0,
        title: "",
        description: "",
        date: new Date(),
        hour: new Date(),
        urgency: "Media",
      });
      setErrors({});
    }
  }, [selected_task, selected_task?.id]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView
          style={{
            flex: 1,
            padding: 20,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          <CardHeader>
            <CardTitle>
              {selected_task ? "Modificar actividad" : "Agregar actividad"}
            </CardTitle>
          </CardHeader>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 10, gap: 10 }}
            keyboardShouldPersistTaps="handled"
          >
            <ThemedText style={styles.label}>Título</ThemedText>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(text) => onChange("title", text)}
              placeholder="Agregar título"
              placeholderTextColor="#9CA3AF"
            />
            {errors.title && (
              <ThemedText style={styles.error}>{errors.title}</ThemedText>
            )}
            <ThemedView
              style={{
                gap: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ThemedView style={{ alignItems: "flex-start", display: "flex" }}>
                <ThemedText style={styles.label}>Seleccionar fecha</ThemedText>
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(_, selected) => {
                    if (selected) onChange("date", selected);
                  }}
                />
              </ThemedView>

              <ThemedView style={{ alignItems: "flex-start", display: "flex" }}>
                <ThemedText style={styles.label}>Seleccionar hora</ThemedText>
                <DateTimePicker
                  value={hour}
                  mode="time"
                  display="default"
                  onChange={(_, selected) => {
                    if (selected) onChange("hour", selected);
                  }}
                />
              </ThemedView>
            </ThemedView>

            <ThemedText style={styles.label}>Descripción</ThemedText>
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={description}
              onChangeText={(text) => onChange("description", text)}
              placeholder="Agregar descripción"
              placeholderTextColor="#9CA3AF"
              multiline
            />
            {errors.description && (
              <ThemedText style={styles.error}>{errors.description}</ThemedText>
            )}

            <ThemedText style={styles.label}>Prioridad</ThemedText>
            <Select
              list={LABEL}
              value={urgency}
              onChange={(val: "Alta" | "Media" | "Baja") =>
                onChange("urgency", val)
              }
            />
          </ScrollView>

          <Pressable style={styles.submitButton} onPress={onSubmit}>
            <ThemedText
              style={{ color: "#fff", fontWeight: "700", textAlign: "center" }}
            >
              Guardar Actividad
            </ThemedText>
          </Pressable>
        </ThemedView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  label: {
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 12,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    padding: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    marginBottom: 8,
  },
  urgencyContainer: { flexDirection: "row", gap: 8, marginVertical: 8 },
  urgencyButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
  },
  urgencyText: { fontWeight: "500" },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#3B82F6",
    padding: 15,
    borderRadius: 8,
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
});
