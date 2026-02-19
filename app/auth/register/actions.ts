"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const supabase = await createClient();

  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user && data.user.identities?.length === 0) {
    return { error: "Email already registered. Please login instead." };
  }

  redirect("/auth/verify-email");
}
