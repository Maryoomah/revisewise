"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ReviewPage(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const submissionId = formData.get("submission_id") as string;
  const feedback = formData.get("feedback") as string;
  const scoreValue = formData.get("score") as string;
  const classId = formData.get("class_id") as string;
  const assignmentId = formData.get("assignment_id") as string;

  const score = scoreValue ? Number(scoreValue) : null;

  // Get the current submission
  const { data: submission, error: submissionError } = await supabase
    .from("submissions")
    .select("response, feedback, score")
    .eq("id", submissionId)
    .single();

  if (submissionError || !submission) {
    throw new Error("Submission not found");
  }

  // Save the current version to revision history
  const { error: revisionError } = await supabase
    .from("submission_revisions")
    .insert({
      submission_id: submissionId,
      response: submission.response,
      feedback,
      score,
    });

  if (revisionError) {
    throw revisionError;
  }

  // Update the submission with the current review
  const { error: updateError } = await supabase
    .from("submissions")
    .update({
      feedback,
      score,
      status: "reviewed",
    })
    .eq("id", submissionId);

  if (updateError) {
    throw updateError;
  }

  redirect(
    `/teacher/classes/${classId}/assignments/${assignmentId}/submissions`
  );
}