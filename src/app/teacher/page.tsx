import NavLink from "@/components/navlink";

export default function TeacherDashboard() {
  return (
    <main>
    

      {/* Dashboard */}
      <section className="bg-blue-100 min-h-screen p-8">
        <h2 className="text-3xl font-bold">
          Welcome 👋
        </h2>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Card 1 */}
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold text-blue-900">
              My Classes
            </h3>

            <p className="mt-3 text-green-600 font-medium">
              4 Active Classes
            </p>

            <div className="mt-6">
              <NavLink href="/teacher/classes">
                View →
              </NavLink>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold text-blue-900">
              Assignments
            </h3>

            <p className="mt-3 text-green-600 font-medium">
              4 Active Assignments
            </p>

            <div className="mt-6">
              <NavLink href="/teacher/assignments">
                View →
              </NavLink>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-xl font-semibold text-blue-900">
              Submissions
            </h3>

            <p className="mt-3 text-green-600 font-medium">
              3 New Submissions
            </p>

            <div className="mt-6">
              <NavLink href="/teacher/submissions">
                View →
              </NavLink>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <NavLink href="/teacher/classes/create">
            Create New Class
          </NavLink>

          <NavLink href="/teacher/assignments/create">
            Create New Assignment
          </NavLink>
        </div>
      </section>
    </main>
  );
}