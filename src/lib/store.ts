import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  date: Date; // Changed to Date
}

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string, date: Date, description?: string) => void; // Reordered parameters
  editTodo: (id: string, title: string, description?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [
        {
          id: "1",
          title: "Meet Jack Sparrow",
          description: "Free him from the prison in Port Royal",
          completed: true,
          date: new Date(),
        },
        {
          id: "2",
          title: "Head for Tortuga",
          description: "Assemble a crew there",
          completed: false,
          date: new Date(),
        },
        {
          id: "3",
          title: "Chase The Pearl",
          description: "All the way up to Isle de Muerta",
          completed: false,
          date: new Date(),
        },
        {
          id: "4",
          title: "Find Elizabeth",
          description: "Prevent Barbossa from hurting her",
          completed: false,
          date: new Date(),
        },
        {
          id: "5",
          title: "Shoot Barbossa",
          description:
            "After lifting the curse and depriving him of immortality",
          completed: false,
          date: new Date(),
        },
      ],
      addTodo: (title, date, description) => {
        if (!title.trim()) throw new Error("Title cannot be empty");
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              title,
              description,
              completed: false,
              date,
            },
          ],
        }));
      },
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      editTodo: (id, title, description) => {
        if (!title.trim()) throw new Error("Title cannot be empty");
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, title, description: description || todo.description }
              : todo
          ),
        }));
      },
    }),
    {
      name: "todo-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.todos) {
          state.todos = state.todos.map((todo) => ({
            ...todo,
            date: new Date(todo.date as unknown as string), // Ensure `date` is Date
          }));
        }
      },
    }
  )
);
