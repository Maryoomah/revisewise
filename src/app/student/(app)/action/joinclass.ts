"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function joinClass(formData: FormData) {
  const supabase = await createClient();

  const class_code = formData.get("class_code") as string;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/login");
  }
  const { data: classItem, error: selectError } = await supabase
    .from("classes")
    .select("*")
    .eq("join_code", class_code)
    .single();
  if (selectError) {
    throw selectError;
  }
  if (!classItem) {
    throw new Error("Invalid class code.");
  }
  const { error: insertError } = await supabase.from("enrolments").insert({
    student_id: user.id,
    class_id: classItem.id,
  });
  if (insertError?.code === "23505") {
    throw new Error("You have already joined this class.");
  }
  if (insertError) {
    throw insertError;
  }

  redirect("/student");
}
