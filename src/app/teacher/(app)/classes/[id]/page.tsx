import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import DeleteClassButton from "@/components/deleteclass";
import CopyButton from "@/components/copybutton";
export default async function ClassPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

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
  return (
<main className="min-h-screen bg-gray-50 px-6 py-10">
     <section className="mx-auto max-w-6xl">
  <Link
    href="/teacher/classes"
    className="text-sm font-medium text-blue-700 hover:text-blue-900"
  >
    ← Back to Classes
  </Link>

  <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <div>
        

        <h1 className="mt-1 text-4xl font-bold text-gray-900">
          {classItem.title}
        </h1>

        <p className="mt-3 max-w-2xl text-gray-600">
          {classItem.description}
        </p>

        <p className="mt-4 text-sm font-semibold text-gray-700">
          Level:
          <span className="ml-2 text-blue-800">
            {classItem.level}
          </span>
        </p>
      </div>

      <Link
        href={`/teacher/classes/${id}/edit`}
        className="inline-flex w-fit items-center rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50"
      >
        ✏️ Edit Class
      </Link>
    </div>

    {/* Join code */}
    <div className="mt-8 rounded-xl bg-blue-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
        Join Code
      </p>

      <div className="mt-2 flex items-center gap-4">
        <p className="text-2xl font-bold tracking-widest text-blue-950">
          {classItem.join_code}
        </p>

        <CopyButton text={classItem.join_code} />
      </div>

      <p className="mt-2 text-sm text-gray-600">
        Share this code with students so they can join the class.
      </p>
    </div>

    {/* Delete */}
   <div className="mt-5">
  <DeleteClassButton classId={classItem.id} />
</div>
  </div>
</section>

<section className="mx-auto mt-10 max-w-6xl">
  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        Assignments
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Create and manage assignments for this class.
      </p>
    </div>

    <Link
      href={`/teacher/classes/${id}/assignments/create`}
      className="inline-flex w-fit items-center rounded-lg bg-blue-800 px-5 py-2.5 font-semibold text-white hover:bg-blue-900"
    >
      + Create Assignment
    </Link>
  </div>

  {assignments.length === 0 ? (
    <section className="rounded-xl bg-white p-10 text-center shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        No assignments yet
      </h3>

      <p className="text-gray-600">
        Create your first assignment for this class.
      </p>
    </section>
  ) : (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {assignments.map((assignment) => (
     <article
  key={assignment.id}
  className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
>
  <h3 className="text-xl font-bold text-gray-900">
    {assignment.title}
  </h3>

  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
    {assignment.instructions}
  </p>

  <div className="mt-6 border-t pt-4">
    <p className="text-sm font-semibold text-gray-700">
      Due:
      <span className="ml-2 font-medium text-red-600">
        {assignment.due_date}
      </span>
    </p>

    <Link
      href={`/teacher/classes/${id}/assignments/${assignment.id}/submissions`}
      className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900"
    >
      View Submissions →
    </Link>
  </div>
</article>
      ))}
    </section>
  )}
</section>
    </main>
  );
}
