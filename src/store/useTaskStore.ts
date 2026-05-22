import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  addTask as apiAddTask,
  deleteTask as apiDeleteTask,
  getAllTasks,
  TaskItem,
  updateTask as apiUpdateTask,
} from '../utils/handle-api';

interface TaskStoreState {
  tasks: TaskItem[];
  loading: boolean;
  fetchTasks: () => void;
  addTask: (
    text: string,
    completed: boolean,
    dueDate: string | null,
    onSuccess: () => void
  ) => void;
  updateTask: (
    taskId: string,
    text: string,
    completed: boolean,
    dueDate: string | null,
    onSuccess: () => void
  ) => void;
  deleteTask: (id: string) => void;
  clearTasks: () => void;
}

export const useTaskStore = create<TaskStoreState>()(
  persist(
    (set) => ({
      tasks: [],
      loading: false,

      fetchTasks: () => {
        set({ loading: true });
        getAllTasks(
          (tasks) => set({ tasks }),
          (loading) => set({ loading })
        );
      },

      addTask: (text, completed, dueDate, onSuccess) => {
        apiAddTask(text, completed, dueDate, (tasks) => set({ tasks }), onSuccess);
      },

      updateTask: (taskId, text, completed, dueDate, onSuccess) => {
        apiUpdateTask(taskId, text, completed, dueDate, (tasks) => set({ tasks }), onSuccess);
      },

      deleteTask: (id) => {
        apiDeleteTask(id, (tasks) => set({ tasks }));
      },

      clearTasks: () => set({ tasks: [] }),
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);
