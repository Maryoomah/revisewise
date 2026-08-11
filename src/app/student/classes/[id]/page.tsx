import { createClient } from "@/lib/supabase/server";
import NavLink from "@/components/navlink";
import Link from "next/link";
export default async function StudentClassPage({
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
    <main className="min-h-screen bg-blue-100 p-8">
      <section className="max-w-4xl mx-auto">
        <NavLink href="/student/classes">← Back to Classes</NavLink>

        <h1 className="text-4xl font-bold mt-6">{classItem.title}</h1>

        <p className="mt-4 text-gray-700">{classItem.description}</p>

        <p className="mt-4 mb-4 font-semibold">
          Level: <span className="text-blue-900">{classItem.level}</span>
        </p>


      </section>

 <section className="mt-10">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold text-blue-900">
      Assignments
    </h2>



  </div>

  {assignments.length === 0 ? (
    <section className="rounded-xl bg-white p-10 text-center shadow">
      <p className="text-xl font-bold text-gray-800 mb-3">
No assignments have been posted yet.

Check back later.      </p>

     
    </section>
  ) : (  <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {assignments.map((assignment) => (
        <Link key={assignment.id} href={`/student/classes/${id}/assignments/${assignment.id}`}>

        <article
          className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold text-blue-900">
            {assignment.title}
          </h3>

          <p className="mt-3 text-gray-600">
            {assignment.instructions}
          </p>

          <div className="mt-5 border-t pt-4">
            <p className="font-semibold">
              Due:
              <span className="ml-2 text-red-600">
                {assignment.due_date}
              </span>
            </p>
          </div>
        </article> </Link>
      ))}
    </section>
    
  )}
</section>
    </main>
  );
}
