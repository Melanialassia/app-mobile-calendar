import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { TASK_LIST } from "@/constants";
import { formatDate } from "@/utils";
import { TaskT } from "@/types";

type Actions = {
  setSelectedDay: ({ day }: { day: string }) => void;
  setAddTask: ({ data }: { data: TaskT }) => void;
  setEditTask: ({ data }: { data: TaskT }) => void;
  setDeleteTask: ({ id }: { id: number }) => void;
  setSelectedTask: ({ data }: { data: TaskT | null }) => void;
  setFilterUrgency: (value: "Todas" | "Alta" | "Media" | "Baja") => void;
};

type State = {
  selected_day: string;
  tasks: TaskT[];
  selected_task: TaskT | null;
  filter_urgency: "Todas" | "Alta" | "Media" | "Baja";
};

type AppStore = State & Actions;

export const INITIAL_STATE = {
  selectedDay: formatDate(new Date()),
  tasks: TASK_LIST,
  selected_task: null,
  filter_urgency: "Todas",
};

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      setSelectedDay: ({ day }: { day: string }) => {
        set({ selected_day: day });
      },
      setAddTask: ({ data }: { data: TaskT }) => {
        const state = get();

        const GET_LAST_ID =
          state.tasks.length > 0
            ? Math.max(...state.tasks?.map((task: TaskT) => task.id))
            : 0;

        const NEW_TASK = { ...data, id: GET_LAST_ID + 1 };

        set({ tasks: [...state.tasks, NEW_TASK] });
      },
      setEditTask: ({ data }: { data: TaskT }) => {
        const state = get();
        set({
          tasks: state.tasks.map((task: TaskT) =>
            task.id === data.id ? { ...task, ...data } : task
          ),
        });
      },
      setDeleteTask: ({ id }: { id: number }) => {
        const state = get();
        set({
          tasks: state.tasks.filter((task: TaskT) => task.id !== id),
        });
      },
      setSelectedTask: ({ data }: { data: TaskT | null }) => {
        set({ selected_task: data });
      },
      setFilterUrgency: (value: "Todas" | "Alta" | "Media" | "Baja") =>
        set({ filter_urgency: value }),
    }),
    {
      name: "store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state: any) => ({
        data: state.tasks,
        selected_task: state.selected_task,
        selected_day: state.selected_day,
        filter_urgency: state.filter_urgency,
      }),
    }
  )
);
