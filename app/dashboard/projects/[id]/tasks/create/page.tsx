"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { createTask } from "./actions";

export default function CreateTaskPage() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await createTask(id, formData);
    if (result?.error) {
      setError(error);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <a href={`/dashboard/projects/${id}`} className="text-gray-400 hover:text-gray-600 transition">
            Back
          </a>

          <h1 className="text-2xl font-bold">New Task</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <form action={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Design homepage"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>

              <textarea
                name="description"
                placeholder="Task details..."
                rows={3}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>

              <select
                name="priority"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                name="due_date"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
