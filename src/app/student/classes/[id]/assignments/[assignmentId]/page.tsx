import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import NavLink from "@/components/navlink";
import submitAssignment from "./action";
export default async function AssignmentPage({
  params,
}: {
  params: Promise<{ id: string, assignmentId : string }>;
}) {
  const {id, assignmentId} = await params;

  const supabase = await createClient ();

   const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      redirect("/login");
    }
  
 const { data: assignment, error: assignmentError } = await supabase
    .from("assignments")
    .select("*")
.eq("id", assignmentId)    .single();
if (assignmentError) {
  throw assignmentError;
}

const {data: submission , error:submissionError} = await supabase
.from ("submissions")
.select ("*")
  .eq("assignment_id", assignmentId)
  .eq("student_id", user.id)
  .maybeSingle();
  
  if (submissionError) {
    throw submissionError;
  }

  
  return (
  <main className="min-h-screen bg-gray-50 p-6 md:p-8">
    <section className="mx-auto w-full max-w-4xl">

      <NavLink href={`/student/classes/${id}`}>
        ← Back to Class
      </NavLink>

      {/* Assignment Header */}
      <section className="mt-6 mb-8">
        <p className="text-sm font-medium text-blue-900">
          Assignment
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
          {assignment.title}
        </h1>

        <p className="mt-3 text-gray-600">
          Due{" "}
          <span className="font-semibold text-gray-900">
            {new Date(assignment.due_date).toLocaleDateString()}
          </span>
        </p>
      </section>

      {/* Instructions */}
      <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900">
          Instructions
        </h2>

        <p className="mt-3 leading-7 text-gray-600">
          {assignment.instructions}
        </p>
      </section>

      {/* Submission */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-gray-900">
            Your Submission
          </h2>

        </div>

        <form action={submitAssignment} className="space-y-5">

          <input
            type="hidden"
            name="assignment_id"
            value={assignmentId}
          />

          <div>
            <label
              htmlFor="response"
              className="block text-sm font-medium text-gray-700"
            >
              Your response
            </label>

            <textarea
              id="response"
              name="response"
              rows={15}
              required
              defaultValue={submission?.response ?? ""}
              placeholder="Write your response here..."
              className="mt-2 min-h-100 w-full rounded-xl border border-gray-300 p-4 leading-7 focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              {submission ? "Update Submission" : "Submit Assignment"}
            </button>
          </div>

        </form>
      </section>

      {/* Feedback */}
      {submission?.feedback && (
        <section className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-lg font-bold text-gray-900">
            Teacher Feedback
          </h2>

          <p className="mt-3 leading-7 text-gray-700">
            {submission.feedback}
          </p>
             <p className="mt-3 leading-7 text-gray-700">
          Score:  {submission.score}
          </p>
        </section>
      )}

    </section>
  </main>
);
}
