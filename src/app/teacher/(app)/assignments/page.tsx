import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function TeacherAssignmentsPage() {
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
    .select("id, title")
    .eq("teacher_id", user.id);

  if (classesError) {
    throw classesError;
  }

  const classIds = classes.map((classItem) => classItem.id);

  let assignments: {
    id: string;
    title: string;
    instructions: string;
    due_date: string;
    class_id: string;
   classes: {
    title: string;
  }[];
  }[] = [];

  if (classIds.length > 0) {
    const { data, error: assignmentsError } = await supabase
      .from("assignments")
      .select(`
        id,
        title,
        instructions,
        due_date,
        class_id,
        classes (
          title
        )
      `)
      .in("class_id", classIds)
      .order("due_date", { ascending: true });

    if (assignmentsError) {
      throw assignmentsError;
    }

    assignments = data ?? [];
  }

  // Get submission information for these assignments
  const assignmentIds = assignments.map(
    (assignment) => assignment.id
  );

  let submissions: {
    id: string;
    assignment_id: string;
    status: string;
  }[] = [];

  if (assignmentIds.length > 0) {
    const { data, error: submissionsError } = await supabase
      .from("submissions")
      .select("id, assignment_id, status")
      .in("assignment_id", assignmentIds);

    if (submissionsError) {
      throw submissionsError;
    }

    submissions = data ?? [];
  }

  const now = new Date();

  const upcomingAssignments = assignments.filter(
    (assignment) => new Date(assignment.due_date) >= now
  );

  const pastAssignments = assignments.filter(
    (assignment) => new Date(assignment.due_date) < now
  );

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <section className="mb-10">
       
          <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl mt-4 font-bold text-gray-900 md:text-4xl">
                Assignments
              </h1>

              <p className="mt-2 text-gray-600">
                Manage assignments across all your classes.
              </p>
            </div>

            <Link
              href="/teacher/classes"
              className="inline-flex w-fit rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
            >
              + Create Assignment
            </Link>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Assignments
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {assignments.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Upcoming
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-900">
              {upcomingAssignments.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Past
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-700">
              {pastAssignments.length}
            </p>
          </div>

        </section>

        {/* Empty state */}
        {assignments.length === 0 ? (
          <section className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              No assignments yet
            </h2>

            <p className="mt-2 text-gray-500">
              Create an assignment from one of your classes to get started.
            </p>

            <Link
              href="/teacher/classes"
              className="mt-6 inline-flex rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-900"
            >
              View Classes
            </Link>
          </section>
        ) : (
          <>
            {/* Upcoming */}
            <section>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-gray-900">
                  Upcoming Assignments
                </h2>

                
              </div>

              {upcomingAssignments.length === 0 ? (
                <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                  <p className="text-gray-500">
                    No upcoming assignments.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAssignments.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      submissions={submissions}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Past */}
            {pastAssignments.length > 0 && (
              <section className="mt-12">
                <div className="mb-5">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Past Assignments
                  </h2>

                
                </div>

                <div className="space-y-4">
                  {pastAssignments.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      submissions={submissions}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

      </div>
    </main>
  );
}

function AssignmentCard({
  assignment,
  submissions,
}: {
  assignment: {
    id: string;
    title: string;
    instructions: string;
    due_date: string;
    class_id: string;
   classes: {
  title: string;
}[];
  };
  submissions: {
    id: string;
    assignment_id: string;
    status: string;
  }[];
}) {
  const assignmentSubmissions = submissions.filter(
    (submission) =>
      submission.assignment_id === assignment.id
  );

  const pendingReviews = assignmentSubmissions.filter(
    (submission) =>
      submission.status === "submitted"
  );

  const dueDate = new Date(assignment.due_date);

  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

        <div className="min-w-0 flex-1">

          <p className="text-sm font-medium text-blue-700">
{assignment.classes?.[0]?.title}          </p>

          <h3 className="mt-1 text-xl font-bold text-gray-900">
            {assignment.title}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
            {assignment.instructions}
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm">

            <p>
              <span className="font-semibold text-gray-700">
                Due:
              </span>{" "}
              <span
                className={
                  dueDate < new Date()
                    ? "text-gray-500"
                    : "text-red-600"
                }
              >
                {dueDate.toLocaleDateString()}
              </span>
            </p>

            <p>
              <span className="font-semibold text-gray-700">
                Submissions:
              </span>{" "}
              {assignmentSubmissions.length}
            </p>

            <p>
              <span className="font-semibold text-gray-700">
                Awaiting review:
              </span>{" "}
              <span className="text-blue-700">
                {pendingReviews.length}
              </span>
            </p>

          </div>

        </div>

        <div className="shrink-0">
          <Link
            href={`/teacher/classes/${assignment.class_id}/assignments/${assignment.id}/submissions`}
            className="inline-flex items-center rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
          >
            View Submissions →
          </Link>
        </div>

      </div>

    </article>
  );
}