import { Modal, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Toast from "react-native-toast-message";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/atoms";
import { useStore } from "@/store";

export const DeleteActivity = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { setDeleteTask, setSelectedTask, selected_task } = useStore(); 

  const handleDelete = () => {
    if (selected_task) {
      setDeleteTask({ id: selected_task.id });
      Toast.show({
        type: "success",
        text1: "Actividad eliminada",
        text2: "Se eliminó correctamente de tu lista.",
      });
    }
    setSelectedTask({ data: null });
    onClose();
  };

  const handleSkip = () => {
    setSelectedTask({ data: null });
    onClose();
  };

  return (
    <Modal transparent visible={open} animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.centerContainer}>
          <Card>
            <CardHeader>
              <CardTitle type="subtitle">Eliminar actividad</CardTitle>
              <CardDescription>
                Esta por eliminar una actividad. Esta acción es irreversible y
                se eliminará definitivamente.
              </CardDescription>
            </CardHeader>

            <CardFooter
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 12,
              }}
            >
              <TouchableHighlight
                onPress={handleSkip}
                underlayColor="#E0E7FF"
                style={styles.cancelBottom}
              >
                <Text
                  style={{
                    color: "#3B82F6",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Cancelar
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.acceptBottom}
                onPress={handleDelete}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Aceptar
                </Text>
              </TouchableHighlight>
            </CardFooter>
          </Card>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cancelBottom: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#3B82F6",
  },
  acceptBottom: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#3B82F6",
  },
});
