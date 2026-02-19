import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: projects } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Projects</h1>
          <a
            href="/dashboard/projects/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            + New Project
          </a>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold">{project.name}</h2>
                {project.description && <p className="text-gray-500 mt-1">{project.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-lg">No projects yet.</p>
            <p className="text-sm mt-1">Create your first project to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}
