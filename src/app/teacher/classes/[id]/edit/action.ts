'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function updateClass(
  formData: FormData
) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const level = formData.get("level") as string;

  const classId = formData.get("class_id") as string;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { error: updateError } = await supabase
    .from("classes")
    .update({
      title,
      description,
      level,
    })
    .eq("id", classId);

  if (updateError) {
    throw updateError;
  }

  redirect(`/teacher/classes/${classId}`);
}