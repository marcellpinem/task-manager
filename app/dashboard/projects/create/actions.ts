"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const { error } = await supabase.from("projects").insert({
    name,
    description,
    user_id: user.id,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard/projects");
}
