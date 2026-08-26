import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
export default async function ClassesPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const { data: classes, error: classesError } = await supabase
    .from("classes")
    .select("*")
    .eq("teacher_id", user.id);

  if (classesError) {
    throw classesError;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <section className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
          

            <h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
              My Classes
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your classes, assignments, and student submissions.
            </p>
          </div>

          <Link
            href="/teacher/classes/create"
            className="inline-flex w-fit items-center rounded-xl bg-blue-800 px-5 py-3 font-semibold text-white transition hover:bg-blue-900"
          >
            + Create Class
          </Link>
        </section>

        {/* Empty state */}
        {classes.length === 0 ? (
          <section className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto max-w-md">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
                📚
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                No classes yet
              </h2>

              <p className="mt-2 text-gray-600">
                Create your first class to start inviting students and
                creating assignments.
              </p>

              <Link
                href="/teacher/classes/create"
                className="mt-6 inline-flex items-center rounded-xl bg-blue-800 px-5 py-3 font-semibold text-white transition hover:bg-blue-900"
              >
                + Create Class
              </Link>
            </div>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((classItem) => (
              <article
                key={classItem.id}
                className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex-1">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      {classItem.title}
                    </h2>

                    <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {classItem.level}
                    </span>
                  </div>

                  <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                    {classItem.description}
                  </p>
                </div>

                <div className="mt-6 border-t pt-5">
                  <Link
                    href={`/teacher/classes/${classItem.id}`}
                    className="inline-flex items-center text-sm font-semibold text-blue-700 transition group-hover:text-blue-900"
                  >
                    View Class →
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}