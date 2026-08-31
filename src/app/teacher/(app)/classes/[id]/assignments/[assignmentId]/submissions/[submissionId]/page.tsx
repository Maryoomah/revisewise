import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ReviewPage from "./action";
export default async function SubmissionReviewPage({
  params,
}: {
  params: Promise<{
    id: string;
    assignmentId: string;
    submissionId: string;
  }>;
}) {
  const { id, assignmentId, submissionId } = await params;

  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { data: submission, error: submissionError } = await supabase
    .from("submissions")
    .select(
      `
    *,
    profiles (
      full_name
    )
  `,
    )
    .eq("id", submissionId)
    .single();

  if (submissionError) {
    throw submissionError;
  }
  
  const { data: previousRevision, error: revisionError } = await supabase
  .from("submission_revisions")
  .select("response, feedback, score, created_at")
  .eq("submission_id", submissionId)
  .order("created_at", { ascending: false })
  .limit(1)
  .maybeSingle();

if (revisionError) {
  throw revisionError;
}

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
 <Link
  href={`/teacher/classes/${id}/assignments/${assignmentId}/submissions`}
  className="mb-6 inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-900"
>
  ← Back to submissions
</Link>
  <h1 className="mt-1 text-3xl font-bold text-gray-900">
    Review Student Submission
  </h1>

  <p className="mt-2 text-gray-600">
    Review the student's response, provide feedback, and assign a score.
  </p>
</div>
<div className="grid gap-6 lg:grid-cols-2">
  <div className="mb-6 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">Student</p>
      <h2 className="text-xl font-bold text-gray-900">
        {submission.profiles.full_name}
      </h2>
    </div>

    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
      {submission.status}
    </span>
  </div>

  <div className="border-t pt-6">
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
      Response
    </h3>

    <div className="whitespace-pre-wrap leading-7 text-gray-700">
      {submission.response}
    </div>
  </div>
{previousRevision && (
  <section>
    <h2 className="text-xl font-bold text-gray-900">
      Previous Review
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      Feedback from the student's previous submission.
    </p>

    <div className="mt-6 space-y-5">
      <div>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Previous Response
        </h3>

        <div className="rounded-xl bg-gray-50 p-4 whitespace-pre-wrap leading-7 text-gray-700">
          {previousRevision.response}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Previous Feedback
        </h3>

        <div className="rounded-xl bg-blue-50 p-4 whitespace-pre-wrap text-gray-700">
          {previousRevision.feedback || "No feedback was provided."}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Previous Score
        </h3>

        <p className="mt-1 font-semibold text-gray-900">
          {previousRevision.score ?? "Not scored"}
        </p>
      </div>
    </div>
  </section>
)}
<section className="h-fit rounded-2xl bg-white p-6 shadow-sm">
  <h2 className="text-xl font-bold text-gray-900">
    Feedback & Grade
  </h2>

  <p className="mt-1 mb-6 text-sm text-gray-500">
    Give the student feedback to help them improve their work.
  </p>

        <form action={ReviewPage} className="space-y-6">
          <input type="hidden" name="class_id" value={id} />
          <input type="hidden" name="assignment_id" value={assignmentId} />
          <input type="hidden" name="submission_id" value={submissionId} />
        {/* feedback */}
<div>
  <label
    htmlFor="feedback"
    className="mb-2 block text-sm font-semibold text-gray-700"
  >
    Feedback
  </label>

  <textarea
    id="feedback"
    name="feedback"
    defaultValue={submission.feedback ?? ""}
    rows={10}
    placeholder="Write constructive feedback for the student..."
    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
  />
</div>

         {/* score */}
         <div>
  <label
    htmlFor="score"
    className="mb-2 block text-sm font-semibold text-gray-700"
  >
    Score
  </label>

  <input
    id="score"
    name="score"
    type="number"
    defaultValue={submission.score ?? ""}
    placeholder="e.g. 85"
    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
  />
</div>

         <button
  type="submit"
  className="w-full rounded-xl bg-blue-800 px-6 py-3 font-semibold text-white transition hover:bg-blue-900"
>
  Save Feedback
</button>
        </form>
</section>
</div>
        
      </div>
    </main>
  );
}
