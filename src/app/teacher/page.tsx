import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import signOut from "../logout/action";
import Link from "next/link";
export default async function TeacherDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  if (profileError) {
    throw profileError;
  }

  const { data: classes, error: classesError } = await supabase
    .from("classes")
    .select("id, title")
    .eq("teacher_id", user.id);

  if (classesError) {
    throw classesError;
  }

  const classCount = classes.length;

  const classIds = classes.map((classItem) => classItem.id);

  let assignments: any[] = [];

  if (classIds.length > 0) {
    const { data, error: assignmentsError } = await supabase
      .from("assignments")
      .select("id, title, due_date, class_id")
      .in("class_id", classIds);

    if (assignmentsError) {
      throw assignmentsError;
    }

    assignments = data ?? [];
  }

  const assignmentCount = assignments.length;

  const assignmentIds = assignments.map((assignment) => assignment.id);

  let submissions: any[] = [];

  if (assignmentIds.length > 0) {
    const { data, error: submissionsError } = await supabase
      .from("submissions")
      .select("id, assignment_id, status, feedback")
      .in("assignment_id", assignmentIds);

    if (submissionsError) {
      throw submissionsError;
    }

    submissions = data ?? [];
  }
  const SubmissionsAwaitingFeedback = submissions.filter(
    (submission) => submission.status === "submitted" && !submission.feedback,
  );

  const newSubmissionCount = SubmissionsAwaitingFeedback.length;
  const now = new Date();
  const nextWeek = new Date();

  nextWeek.setDate(now.getDate() + 7);

  const upcomingAssignments = assignments.filter((assignment) => {
    const dueDate = new Date(assignment.due_date);

    return dueDate >= now && dueDate <= nextWeek;
  });
  const upcomingAssignmentCount = upcomingAssignments.length;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
       {/* Header */}
              <section className="mb-12 flex items-center justify-between">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Revise<span className="text-blue-900">Wise</span>
          </h1>
      
                <div className="flex gap-4">
                  <form action={signOut}>
                    {" "}
                    <button
                      type="submit"
                      className="inline-block rounded-lg bg-blue-800 px-6 py-3 text-white hover:bg-blue-900 transition"
                    >
                      Log Out
                    </button>
                  </form>{" "}
                </div>
              </section>
      <div className="mx-auto max-w-6xl">
        {/* Welcome */}
        <section className="mb-10">
          <h1 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
            Welcome, {profile.full_name.split(" ")[0]} 👋
          </h1>
        </section>

        {/* Overview */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Classes */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Classes
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {classCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                📚
              </div>
            </div>

            <Link
              href="/teacher/classes"
              className="mt-6 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              View classes →
            </Link>
          </div>

          {/* Assignments */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Assignments
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {assignmentCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-xl">
                📝
              </div>
            </div>

            <Link
              href="/teacher/assignments"
              className="mt-6 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              View assignments →
            </Link>
          </div>

          {/* Submissions */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  New Submissions
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {newSubmissionCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-xl">
                📥
              </div>
            </div>

            <Link
              href="/teacher/submissions"
              className="mt-6 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              Review submissions →
            </Link>
          </div>
        </section>

        {/* Needs attention */}
        <section className="mt-10">
          <div className="rounded-2xl bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-gray-900">
                  {newSubmissionCount}{" "}
                  {SubmissionsAwaitingFeedback.length === 1
                    ? "submission"
                    : "submissions"}{" "}
                  awaiting review{" "}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Students are waiting for feedback.
                </p>
              </div>

              <Link
                href="/teacher/submissions"
                className="inline-flex w-fit rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900"
              >
                Review Now
              </Link>
            </div>

            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-gray-900">
                  {upcomingAssignmentCount}{" "}
                  {upcomingAssignments.length === 1
                    ? "assignment"
                    : "assignments"}{" "}
                  approaching their deadline{" "}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Check the assignment and student progress.
                </p>
              </div>

              <Link
                href="/teacher/assignments"
                className="inline-flex w-fit rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                View Assignment
              </Link>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="mt-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/teacher/classes/create"
              className="rounded-2xl bg-blue-800 p-6 text-white transition hover:bg-blue-900"
            >
              <p className="text-lg font-bold">+ Create New Class</p>

              <p className="mt-1 text-sm text-blue-100">
                Set up a class and invite students.
              </p>
            </Link>

            <Link
              href="/teacher/classes"
              className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:shadow-md"
            >
              <p className="text-lg font-bold text-gray-900">
                + Create Assignment
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Choose a class and create an assignment.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
