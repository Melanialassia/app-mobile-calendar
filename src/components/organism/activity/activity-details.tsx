import Toast from "react-native-toast-message";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { ThemedText, ThemedView } from "@/components/atoms";
import { validateActivityForm } from "./validations";

export const ActivityDetailsView = () => {
  const scheme = useColorScheme();
  const { selected_task, setEditTask } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<{
    title: string;
    description: string;
  }>({
    title: selected_task?.title ?? "",
    description: selected_task?.description ?? "",
  });

  const onChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = () => {
    if (isEditing && selected_task) {
      const validation = validateActivityForm(form);
      if (!validation.valid) {
        return Toast.show({
          type: "error",
          text1: "Ups! ocurrio un error",
          text2: "Asegurese de que los campos este correctamente completados.",
        });
      } else {
        setEditTask({ data: { ...selected_task, ...form } });
        setIsEditing(!isEditing);
        return Toast.show({
          type: "success",
          text1: "Actividad modificada con exito",
        });
      }
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    setForm({
      title: selected_task?.title ?? "",
      description: selected_task?.description ?? "",
    });
  }, [selected_task]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView
          style={{
            flex: 1,
            padding: 20,
          }}
        >
          {isEditing ? (
            <TextInput
              value={form.title}
              onChangeText={(text) => onChange("title", text)}
              style={{
                fontSize: 32,
                fontWeight: "700",
                marginBottom: 10,
                color: scheme === "dark" ? "#fff" : "#000",
              }}
            />
          ) : (
            <ThemedText type="title">{form.title}</ThemedText>
          )}

          <ScrollView
            style={{ flex: 1, marginTop: 10 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {isEditing ? (
              <TextInput
                value={form.description}
                onChangeText={(text) => onChange("description", text)}
                multiline
                autoCorrect
                style={{
                  fontSize: 18,
                  lineHeight: 26,
                  textAlignVertical: "top",
                  color: scheme === "dark" ? "#fff" : "#000",
                }}
              />
            ) : (
              <ThemedText style={{ fontSize: 18, lineHeight: 26 }}>
                {form.description}
              </ThemedText>
            )}
          </ScrollView>

          <TouchableOpacity
            onPress={onSubmit}
            style={{
              padding: 15,
              backgroundColor: "#3B82F6",
              borderRadius: 8,
              margin: 20,
            }}
            disabled={
              isEditing &&
              (form.title.trim() === "" || form.description.trim() === "")
            }
          >
            <ThemedText
              style={{ color: "#fff", fontWeight: "700", textAlign: "center" }}
            >
              {isEditing ? "Guardar cambios" : "Editar actividad"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
