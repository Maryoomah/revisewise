import createClass from "./action";
export default function CreateClass() {
  return (
    <main className="min-h-screen bg-blue-100 flex items-center justify-center p-8">
      <section className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          Create <span className="text-blue-900">Class</span>
        </h1>

        <p className="text-gray-600 mb-8">
          Set up a new class before inviting students and creating assignments.
        </p>

        <form action={createClass} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 font-medium text-gray-700"
            >
              Class Title
            </label>

            <input
              type="text"
              name="title"
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
            <span className="text-lg font-bold">+</span>
            <span>Create Class</span>
          </button>
        </form>
      </section>
    </main>
  );
}