import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

type Submission = {
  id: string;
  assignment_id: string;
  status: string;
  response: string;
  feedback: string | null;
  score: number | null;
  profiles: {
    full_name: string;
  }[];
  assignments: {
    title: string;
    class_id: string;
    classes: {
      title: string;
    }[];
  }[];
};

export default async function TeacherSubmissionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Get the teacher's classes
  const { data: classes, error: classesError } = await supabase
    .from("classes")
    .select("id")
    .eq("teacher_id", user.id);

  if (classesError) {
    throw classesError;
  }

  const classIds = classes.map((classItem) => classItem.id);

  let submissions: Submission[] = [];

  if (classIds.length > 0) {
    // Get assignments belonging to those classes
    const { data: assignments, error: assignmentsError } = await supabase
      .from("assignments")
      .select("id")
      .in("class_id", classIds);

    if (assignmentsError) {
      throw assignmentsError;
    }

    const assignmentIds = assignments.map(
      (assignment) => assignment.id
    );

    if (assignmentIds.length > 0) {
      const { data, error: submissionsError } = await supabase
        .from("submissions")
        .select(`
          id,
          assignment_id,
          status,
          response,
          feedback,
          score,
          profiles (
            full_name
          ),
          assignments (
            title,
            class_id,
            classes (
              title
            )
          )
        `)
        .in("assignment_id", assignmentIds)
        .order("created_at", { ascending: false });

      if (submissionsError) {
        throw submissionsError;
      }

      submissions = data ?? [];
    }
  }

  const pendingSubmissions = submissions.filter(
    (submission) => submission.status === "submitted"
  );

  const reviewedSubmissions = submissions.filter(
    (submission) => submission.status === "reviewed"
  );

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <section className="mb-10">
  
          <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Student Submissions
          </h1>

          <p className="mt-2 text-gray-600">
            Review student work and provide feedback across your classes.
          </p>
        </section>

        {/* Summary */}
        <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Awaiting Review
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-900">
              {pendingSubmissions.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Reviewed
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {reviewedSubmissions.length}
            </p>
          </div>

        </section>

        {/* Awaiting Review */}
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Awaiting Review
            </h2>

            
          </div>

          {pendingSubmissions.length === 0 ? (
            <section className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Nothing to review 🎉
              </h3>

              <p className="mt-2 text-gray-500">
                You are all caught up with your student submissions.
              </p>
            </section>
          ) : (
            <div className="space-y-4">
              {pendingSubmissions.map((submission) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                />
              ))}
            </div>
          )}
        </section>

        {/* Reviewed */}
        <section className="mt-12">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Recently Reviewed
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Submissions you have already reviewed.
            </p>
          </div>

          {reviewedSubmissions.length === 0 ? (
            <section className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <p className="text-gray-500">
                No reviewed submissions yet.
              </p>
            </section>
          ) : (
            <div className="space-y-4">
              {reviewedSubmissions.map((submission) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

function SubmissionCard({
  submission,
}: {
  submission: Submission;
}) {
  const profile = submission.profiles[0];
  const assignment = submission.assignments[0];
  const classItem = assignment?.classes[0];

  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-bold text-gray-900">
              {profile?.full_name}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                submission.status === "submitted"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {submission.status}
            </span>
          </div>

          <p className="mt-2 text-sm font-medium text-blue-700">
            {classItem?.title}
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {assignment?.title}
          </p>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            {submission.response.slice(0, 180)}
            {submission.response.length > 180 ? "..." : ""}
          </p>

          {submission.status === "reviewed" && (
            <p className="mt-3 text-sm text-gray-500">
              Score:{" "}
              <span className="font-semibold text-gray-900">
                {submission.score ?? "Not scored"}
              </span>
            </p>
          )}

        </div>

        <div className="shrink-0">
          <Link
            href={`/teacher/classes/${assignment?.class_id}/assignments/${submission.assignment_id}/submissions/${submission.id}`}
            className="inline-flex items-center rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white"
          >
            {submission.status === "submitted"
              ? "Review →"
              : "View →"}
          </Link>
        </div>

      </div>
    </article>
  );
}