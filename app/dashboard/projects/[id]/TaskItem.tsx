"use client";

import { toggleTask } from "./actions";

interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  due_date: string | null;
  is_completed: boolean;
}

interface Props {
  task: Task;
  projectId: string;
}

export default function TaskItem({ task, projectId }: Props) {
  async function handleToggle() {
    await toggleTask(task.id, task.is_completed, projectId);
  }

  return (
    <div
      className={`bg-white p-5 rounded-lg shadow-sm border transition
      ${task.is_completed ? "border-green-200 opacity-60" : "border-gray-200"}
    `}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={handleToggle}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          <h3 className={`font-semibold ${task.is_completed ? "line-through text-gray-400" : ""}`}>{task.title}</h3>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium
          ${task.priority === "high" ? "bg-red-100 text-red-600" : ""}
          ${task.priority === "medium" ? "bg-yellow-100 text-yellow-600" : ""}
          ${task.priority === "low" ? "bg-green-100 text-green-600" : ""}
        `}
        >
          {task.priority}
        </span>
      </div>
      {task.description && <p className="text-gray-500 text-sm mt-2 ml-7">{task.description}</p>}
      {task.due_date && (
        <p className="text-gray-400 text-xs mt-2 ml-7">Due: {new Date(task.due_date).toLocaleDateString()}</p>
      )}
    </div>
  );
}
