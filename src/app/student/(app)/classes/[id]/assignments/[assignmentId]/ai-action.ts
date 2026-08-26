"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { GoogleGenAI } from "@google/genai";
export default async function getAIGuidance(
  submissionId: string,
  assignmentId: string,
  classId: string,
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // Get the student's submission
  const { data: submission, error: submissionError } = await supabase
    .from("submissions")
    .select("id")
    .eq("id", submissionId)
    .eq("student_id", user.id)
    .single();

  if (submissionError || !submission) {
    throw new Error("Submission not found");
  }

  // Get the latest teacher-reviewed revision
  const { data: revision, error: revisionError } = await supabase
    .from("submission_revisions")
    .select("id, response, feedback, score, created_at")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (revisionError) {
    throw revisionError;
  }

  if (!revision) {
    throw new Error("No reviewed revision found");
  }

  // Check whether AI guidance already exists for this revision
  const { data: existingGuidance, error: guidanceError } = await supabase
    .from("ai_guidance")
    .select("guidance")
    .eq("revision_id", revision.id)
    .maybeSingle();

  if (guidanceError) {
    throw guidanceError;
  }

  // Don't generate another response if guidance already exists
  if (existingGuidance) {
    return existingGuidance.guidance;
  }

  // Get assignment instructions
  const { data: assignment, error: assignmentError } = await supabase
    .from("assignments")
    .select("title, instructions")
    .eq("id", assignmentId)
    .single();

  if (assignmentError || !assignment) {
    throw new Error("Assignment not found");
  }

  const prompt = `
ROLE

You are a revision coach. Your role is to help students understand and act on teacher feedback so they can revise their own writing confidently and independently.

TASK

Use the assignment, student's response, and teacher's feedback to explain what the feedback means, identify where the student should focus, and provide practical guidance for revision.

Help the student get started without writing the revision for them.

INPUTS

Assignment:
${assignment.title}

Instructions:
${assignment.instructions}

Student response:
${revision.response}

Teacher feedback:
${revision.feedback}

RULES

- Do not rewrite any part of the student's response.
- Do not provide replacement sentences, paragraphs, or complete ideas that the student can copy.
- Do not generate a revised version of the student's writing.
- Do not assign or change a grade.
- Do not contradict or replace the teacher's feedback.
- Encourage the student to make their own decisions and revisions.
- You may provide prompts, questions, strategies, and examples of the type of change the student could make, but not the actual wording they should use.

OUTPUT

Return valid JSON with exactly these fields:

{
  "whatTeacherMeans": "...",
  "whereToFocus": "...",
  "howToGetStarted": "...",
  "questionsToConsider": ["...", "...", "..."],
  "revisionChecklist": ["...", "...", "..."]
}
`;

  // Gemini call
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const response = await ai.models.generateContent({
model: "gemini-3.1-flash-lite",  contents: prompt,
  config: {
    responseMimeType: "application/json",
  },
});

const text = response.text;

if (!text) {
  throw new Error("No response received from Gemini");
}

let guidance;

try {
  guidance = JSON.parse(text);
} catch {
  throw new Error("Gemini returned invalid JSON");
}
const { error: insertError } = await supabase
  .from("ai_guidance")
  .insert({
    revision_id: revision.id,
    guidance,
  });

if (insertError) {
  throw insertError;
}
redirect(`/student/classes/${classId}/assignments/${assignmentId}`);

}