import createClass from "./action";
import Link from "next/link";
export default function CreateClass() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-8">


          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Create a Class
          </h1>

          <p className="mt-2 text-gray-600">
            Set up your class before inviting students and creating
            assignments.
          </p>
        </div>

        {/* Form */}
        <section className="rounded-2xl bg-white p-8 shadow-sm">
          <form action={createClass} className="space-y-6">

            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Class Title
              </label>

              <input
                type="text"
                name="title"
                id="title"
                required
                placeholder="e.g. English Writing 101"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Description
              </label>

              <textarea
                name="description"
                id="description"
                rows={5}
                placeholder="Briefly describe this class..."
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="level"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Class Level
              </label>

              <input
                type="text"
                name="level"
                id="level"
                required
                placeholder="e.g. Beginner, CEFR B1, Year 7, IELTS Prep"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                You can use a school year, proficiency level, or course
                category.
              </p>
            </div>

            <div className="border-t pt-6">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-800 px-6 py-3 font-semibold text-white transition hover:bg-blue-900"
              >
                <span className="text-lg">+</span>
                Create Class
              </button>
            </div>

          </form>
        </section>
      </div>
    </main>
  );
}