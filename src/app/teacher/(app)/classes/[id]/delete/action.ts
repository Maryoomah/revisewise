'use server';

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function deleteClass(formData: FormData) {
  const supabase = await createClient();

  const classId = formData.get("class_id") as string;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { error: deleteError } = await supabase
    .from("classes")
    .delete()
    .eq("id", classId);

  if (deleteError) {
    throw deleteError;
  }

  redirect("/teacher/classes");
}