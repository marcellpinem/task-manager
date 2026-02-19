"use client";

import { useState } from "react";
import { createProject } from "./actions";

export default function CreateProjectPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await createProject(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <a href="/dashboard/projects" className="text-gray-400 hover:text-gray-600 transition">
            Back
          </a>
          <h1 className="text-2xl font-bold">New Project</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <form action={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="e.g. Website Redesign"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>

              <textarea
                name="description"
                placeholder="What is this project about?"
                rows={4}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
