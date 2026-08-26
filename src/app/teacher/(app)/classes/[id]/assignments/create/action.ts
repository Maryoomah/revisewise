"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function createAssignment(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const instructions = formData.get("instructions") as string;
  const due_date = formData.get("due_date") as string;
  const class_id = formData.get("class_id") as string;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/login");
  }

  const { error: insertError } = await supabase
    .from("assignments")
    .insert({
      title,
      instructions,
      due_date,
      class_id,
    })
    .eq("class_id", user.id);
  if (insertError) {
    throw insertError;
  }

  redirect(`/teacher/classes/${class_id}`);
}
