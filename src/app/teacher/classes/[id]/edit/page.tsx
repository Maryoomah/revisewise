import { createClient } from "@/lib/supabase/server";
import NavLink from "@/components/navlink";
import updateClass from "./action";
export default async function EditClassPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // get id from url
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

  return (
    <main className="min-h-screen bg-blue-100 flex items-center justify-center p-8">
      <section className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Edit <span className="text-blue-900">Class</span>
        </h1>
<NavLink href={`/teacher/classes/${id}`}>
  ← Back to Class
</NavLink>
        <form action={updateClass} className="mt-6 space-y-6">
          <div>
            <input type="hidden"
            name="class_id"
              value={classItem.id}
 />
            <label
              htmlFor="title"
              className="block mb-2 font-medium text-gray-700"
            >
              Class Title
            </label>

            <input
              type="text"
              name="title"
              defaultValue={classItem.title}
              id="title"
              required
              placeholder="e.g. English Writing 101"
              className="w-full rounded-lg border border-blue-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              name="description"
              defaultValue={classItem.description}
              id="description"
              rows={4}
              placeholder="Briefly describe this class..."
              className="w-full rounded-lg border border-blue-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="level"
              className="block mb-2 font-medium text-gray-700"
            >
              Class Level
            </label>

            <input
              type="text"
              name="level"
              defaultValue={classItem.level}
              id="level"
              required
              placeholder="e.g. Beginner, CEFR B1, Year 7, IELTS Prep"
              className="w-full rounded-lg border border-blue-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-900 px-6 py-3 text-white font-semibold hover:bg-blue-800 transition cursor-pointer"
          >
            <span>Update Class</span>
          </button>
        </form>
      </section>
    </main>
  );
}
