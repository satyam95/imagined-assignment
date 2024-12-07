"use client";

import { useState } from "react";
import CalendarStrip from "@/components/CalendarStrip";
import { CalendarX2 } from "lucide-react";
import TodoItem from "@/components/TodoItem";
import AddTodoDialog from "@/components/AddTodoDialog";

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  date: Date;
}

const initialTodos: Todo[] = [
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
    description: "After lifting the curse and depriving him of immortality",
    completed: false,
    date: new Date(),
  },
];

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const filteredTodos = todos.filter(
    (todo) => todo.date.toDateString() === selectedDate.toDateString()
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
              filteredTodos.map((todo) => <TodoItem key={todo.id} {...todo} />)
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <CalendarX2 className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium">No to-do's found</p>
                <p className="text-sm">Add a new task for this day</p>
              </div>
            )}
          </div>
        </div>
        <AddTodoDialog />
      </div>
    </main>
  );
}
