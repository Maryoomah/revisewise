import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
export default async function TeacherSubmissionsPage({
  params,
}: {
  params: Promise<{ id: string; assignmentId: string }>;
}) {
  const { id, assignmentId } = await params;

  const supabase = await createClient();
const {
  data: { user },
  error,
} = await supabase.auth.getUser();

if (error || !user) {
  redirect("/login");
} 

const { data: assignment, error: assignmentError } = await supabase
  .from("assignments")
.select(
    `*,
    classes (
      title
    )`
    )
    
  .eq("id", assignmentId)
  .single();

if (assignmentError) {
  throw assignmentError;
}
const { data: submissions, error: submissionsError } = await supabase
  .from("submissions")
.select(`
  *,
  profiles(
    full_name
  )
`)  .eq("assignment_id", assignmentId);

if (submissionsError) {
  throw submissionsError;
}


return (
  <main className="min-h-screen px-6 py-10">
  <div className="mx-auto max-w-6xl">

    <Link
      href={`/teacher/classes/${id}`}
      className="mb-6 inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-900"
    >
      ← Back to class
    </Link>

    {/* Header */}
    <div className="mb-8">
      <p className="text-sm font-medium text-blue-700">
        {assignment.classes.title}
      </p>

      <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {assignment.title}
          </h1>

          <p className="mt-2 text-gray-600">
            Review and provide feedback on student submissions.
          </p>
        </div>

        <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Submissions
          </p>
          <p className="text-2xl font-bold text-blue-900">
            {submissions.length}
          </p>
        </div>
      </div>
    </div>

    {/* Submissions */}
    {submissions.length === 0 ? (
  <section className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
    <div className="mx-auto max-w-md">
      <h2 className="text-xl font-bold text-gray-900">
        No submissions yet
      </h2>

      <p className="mt-2 text-gray-500">
        Students haven't submitted this assignment yet.
        Check back here when submissions start coming in.
      </p>
    </div>
  </section>
) : (
  <div className="space-y-4">
    {submissions.map((submission) => (
      <section
        key={submission.id}
        className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-gray-900">
                {submission.profiles.full_name}
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  submission.status === "submitted"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {submission.status}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              {submission.response.slice(0, 180)}
              {submission.response.length > 180 ? "..." : ""}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href={`/teacher/classes/${id}/assignments/${assignmentId}/submissions/${submission.id}`}
              className="inline-flex items-center rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
            >
              Review →
            </Link>
          </div>

        </div>
      </section>
    ))}
  </div>
)}

  </div>
</main>

)
}