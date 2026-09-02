import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { getAssignmentStatus } from "@/lib/assignmentStatus";
import { redirect } from "next/navigation";
export default async function StudentClassPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
const {
  data: { user },
  error: authError,
} = await supabase.auth.getUser();

if (authError || !user) {
  redirect("/login");
}
  const { data: classItem, error: classError } = await supabase
    .from("classes")
    .select("*")
    .eq("id", id)
    .single();

  if (classError) {
    throw classError;
  }

  const { data: assignments, error: assignmentsError } = await supabase
    .from("assignments")
    .select("*")
    .eq("class_id", id);
  if (assignmentsError) {
    throw assignmentsError;
  }

  const assignmentIds = assignments.map((assignment) => assignment.id);

let submissions: any[] = [];

if (assignmentIds.length > 0) {
  const { data, error: submissionsError } = await supabase
    .from("submissions")
    .select("id, assignment_id, status, feedback")
    .in("assignment_id", assignmentIds)
    .eq("student_id", user.id);

  if (submissionsError) {
    throw submissionsError;
  }

  submissions = data ?? [];
}
 return (
  <main className="min-h-screen rounded-2xl bg-linear-to-br from-blue-200 via-blue-100 to-blue-200 p-6 md:p-8">
    <section className="mx-auto w-full max-w-6xl">

      {/* Class Header */}
      <section className="mt-6 mb-10">
        <p className="text-sm font-medium text-blue-900">
          {classItem.level}
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
          {classItem.title}
        </h1>

        <p className="mt-3 max-w-3xl leading-7 text-gray-600">
          {classItem.description}
        </p>
      </section>

      {/* Assignments */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Assignments
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {assignments.length}{" "}
              {assignments.length === 1
                ? "assignment"
                : "assignments"}
            </p>
          </div>
        </div>

        {assignments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="font-semibold text-gray-800">
              No assignments yet
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Your teacher hasn't posted any assignments for this class yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {assignments.map((assignment) => {
              const status = getAssignmentStatus(
                assignment.id,
                submissions
              );

              return (
                <Link
                  key={assignment.id}
                  href={`/student/classes/${id}/assignments/${assignment.id}`}
                  className="group"
                >
                  <article className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                    <div className="flex items-start justify-between gap-4">
                      <h3 className="min-w-0 break-words text-xl font-bold text-gray-900">
                        {assignment.title}
                      </h3>

                      <span className="shrink-0 text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-900">
                        →
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {assignment.instructions}
                    </p>

                    {/* Submission Status */}
                    <div className="mt-5">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>

                    <div className="mt-6 border-t border-gray-100 pt-4">
                      <p className="text-sm">
                        <span className="font-medium text-gray-500">
                          Due
                        </span>

                        <span className="ml-2 font-semibold text-gray-900">
                          {new Date(
                            assignment.due_date
                          ).toLocaleDateString()}
                        </span>
                      </p>
                    </div>

                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>

    </section>
  </main>
);
}
