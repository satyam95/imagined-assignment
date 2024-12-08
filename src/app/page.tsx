"use client";

import { useState } from "react";
import CalendarStrip from "@/components/CalendarStrip";
import { CalendarX2 } from "lucide-react";
import TodoItem from "@/components/TodoItem";
import AddTodoDialog from "@/components/AddTodoDialog";
import { useTodoStore, Todo } from "@/lib/store";


type TodoInput = {
  id?: string;
  title: string;
  description?: string;
};

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const editTodo = useTodoStore((state) => state.editTodo);

  const handleSaveTodo = (data: TodoInput) => {
    if (data.id) {
      editTodo(data.id, data.title, data.description);
    } else {
      addTodo(data.title, selectedDate, data.description, );
    }
    setDialogOpen(false);
    setEditingTodo(null);
  };

  const filteredTodos = todos.filter(
    (todo) =>
      todo.date.toISOString().split("T")[0] ===
      selectedDate.toISOString().split("T")[0]
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-[425px] mx-auto relative">
        <div className="bg-white shadow-xl rounded-b-2xl">
          <div className="pt-6 px-4">
            <h1 className="text-4xl text-black font-semibold">onday</h1>
          </div>
          <CalendarStrip
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>
        <div className="p-4 pb-28">
          <h2 className="text-xl text-black font-semibold">Today</h2>
          <div className="mt-4 space-y-4">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={() => {
                    setEditingTodo(todo);
                    setDialogOpen(true);
                  }}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <CalendarX2 className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium">No to-do&apos;s found</p>
                <p className="text-sm">Add a new task for this day</p>
              </div>
            )}
          </div>
        </div>
        <AddTodoDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          todo={editingTodo ?? undefined}
          onSave={handleSaveTodo}
        />
      </div>
    </main>
  );
}
