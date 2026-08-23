import createAssignment from "./action";
import NavLink from "@/components/navlink";

export default async function CreateAssignmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">

        <NavLink
          href={`/teacher/classes/${id}`}
        >
          ← Back to class
        </NavLink>

        <section className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-8">
            <p className="text-sm font-medium text-blue-700">
              New Assignment
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Create Assignment
            </h1>

            <p className="mt-2 text-gray-600">
              Create an assignment for the students in this class.
            </p>
          </div>

          <form action={createAssignment} className="space-y-6">

            <input
              type="hidden"
              name="class_id"
              value={id}
            />

            <div>
              <label
                htmlFor="title"
                className="mb-2 block font-medium text-gray-700"
              >
                Assignment Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="e.g. Argumentative Essay"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div>
              <label
                htmlFor="instructions"
                className="mb-2 block font-medium text-gray-700"
              >
                Instructions
              </label>

              <textarea
                id="instructions"
                name="instructions"
                rows={7}
                required
                placeholder="Explain what students should do for this assignment..."
                className="w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div>
              <label
                htmlFor="due_date"
                className="mb-2 block font-medium text-gray-700"
              >
                Due Date
              </label>

              <input
                id="due_date"
                name="due_date"
                type="date"
                required
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />

              <p className="mt-2 text-sm text-gray-500">
                Choose when students should submit this assignment.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="rounded-lg bg-blue-800 px-6 py-3 font-semibold text-white transition hover:bg-blue-900"
              >
                Create Assignment
              </button>

              <NavLink
                href={`/teacher/classes/${id}`}
              >
                Cancel
              </NavLink>
            </div>

          </form>
        </section>
      </div>
    </main>
  );
}