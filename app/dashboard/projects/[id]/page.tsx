import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single();

  if (!project) {
    redirect("/dashboard/projects");
  }

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <a href="/dashboard/projects" className="text-gray-400 hover:text-gray-600 transition">
            ← Back
          </a>
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            {project.description && <p className="text-gray-500 mt-1">{project.description}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <a
            href={`/dashboard/projects/${id}/tasks/create`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            + New Task
          </a>
        </div>

        {tasks && tasks.length > 0 ? (
          <div className="grid gap-3">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{task.title}</h3>
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
                {task.description && <p className="text-gray-500 text-sm mt-1">{task.description}</p>}
                {task.due_date && (
                  <p className="text-gray-400 text-xs mt-2">Due: {new Date(task.due_date).toLocaleDateString()}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-lg">No tasks yet.</p>
            <p className="text-sm mt-1">Create your first task to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}
