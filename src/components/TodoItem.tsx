import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Edit2, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

interface TodoItemProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TodoItem = ({
  id,
  title,
  description,
  completed,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) => {
  return (
    <div className="bg-white flex items-start gap-3 p-3 rounded-lg shadow-sm">
      <button className="mt-1" onClick={() => onToggle(id)}>
        {completed ? (
          <CheckCircle2 className="h-5 w-5 text-primary" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      <div className="flex-1">
        <h3
          className={cn(
            "font-medium",
            completed && "line-through text-muted-foreground"
          )}
        >
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => onEdit(id)}>
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
