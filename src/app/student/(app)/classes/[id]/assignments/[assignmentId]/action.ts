'use server'
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function submitAssignment (formData: FormData){
    const supabase = await createClient();
    const {data:{user}, error} = await supabase.auth.getUser()
    if (error || !user) {
    redirect("/login");
  }

  const assignmentId= formData.get("assignment_id") as string 
  const response = formData.get("response") as string


  const { data: assignment, error: assignmentError } = await supabase
  .from("assignments")
  .select("class_id")
  .eq("id", assignmentId)
  .single();
if (assignmentError || !assignment) {
  throw new Error("Assignment not found");
}
  const { data: enrolment, error: enrolmentError } = await supabase
  .from("enrolments")
  .select("id")
  .eq("class_id", assignment.class_id)
  .eq("student_id", user.id)
  .maybeSingle();
if (enrolmentError) {
  throw enrolmentError;
}

if (!enrolment) {
  throw new Error("You are not enrolled in this class");
}
  const { data: submission, error: submissionError } = await supabase
  .from("submissions")
  .select("*")
  .eq("assignment_id", assignmentId)
  .eq("student_id", user.id)
  .maybeSingle();

  if (!submission) {
  const { error: insertError } = await supabase
    .from("submissions")
    .insert({
      assignment_id: assignmentId,
      student_id: user.id,
      response: response,
    });

  if (insertError) {
    throw insertError;
  }
} else {
 const { error: updateError } = await supabase
  .from("submissions")
  .update({
    response,
    status: "submitted",
    feedback: null,
    score: null,
    updated_at: new Date().toISOString(),
  })
  .eq("assignment_id", assignmentId)
  .eq("student_id", user.id);

  if (updateError) {
    throw updateError;
  }
}
redirect(`/student/classes/${assignment.class_id}/assignments/${assignmentId}`);
}