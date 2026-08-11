"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function createClass(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const level = formData.get("level") as string;
  const prefix = title.replace(/\s+/g, "").toUpperCase();
  const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const join_code = `${prefix}-${randomCode}`;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/login");
  }

  const { error: insertError } = await supabase.from("classes").insert({
    title,
    description,
    level,
    teacher_id: user.id,
    join_code,
  });
  if (insertError) {
    throw insertError;
  }

  redirect("/teacher/classes");
}
