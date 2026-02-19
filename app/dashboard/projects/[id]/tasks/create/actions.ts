"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createTask(projectId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;
  const due_date = formData.get("due_date") as string;

  const { error } = await supabase.from("tasks").insert({
    title,
    description,
    priority,
    due_date: due_date || null,
    project_id: projectId || null,
    user_id: user.id,
  });

  if (error) {
    return { error: error.message };
  }

  redirect(`/dashboard/projects/${projectId}`);
}
