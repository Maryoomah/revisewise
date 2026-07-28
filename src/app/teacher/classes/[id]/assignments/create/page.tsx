import createAssignment from "./action";

export default async function CreateAssignmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Get the class ID from the URL
  const { id } = await params;

  return (
    <main className="min-h-screen bg-blue-100 p-8">
      <section className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Create Assignment
        </h1>

        <form action={createAssignment} className="space-y-6">

          {/* Hidden class ID */}
          <input
            type="hidden"
            name="class_id"
            value={id}
          />

          {/* Assignment Title */}
          <div>
            <label htmlFor="title" className="block mb-2 font-medium">
              Assignment Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Instructions */}
          <div>
            <label
              htmlFor="instructions"
              className="block mb-2 font-medium"
            >
              Instructions
            </label>

            <textarea
              id="instructions"
              name="instructions"
              rows={6}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Due Date */}
          <div>
            <label
              htmlFor="due_date"
              className="block mb-2 font-medium"
            >
              Due Date
            </label>

            <input
              id="due_date"
              name="due_date"
              type="date"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900"
          >
            Create Assignment
          </button>

        </form>
      </section>
    </main>
  );
}