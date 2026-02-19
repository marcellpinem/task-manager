"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleTask(taskId: string, isCompleted: boolean, projectId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("tasks").update({ is_completed: !isCompleted }).eq("id", taskId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/projects/${projectId}`);
}
