import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TaskItem from "./TaskItem";

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
              <TaskItem key={task.id} task={task} projectId={id} />
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
