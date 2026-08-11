import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import joinClass from "./action/joinclass";
import Link from "next/link";
export default async function StudentDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: enrolledClasses, error } = await supabase
    .from("enrolments")
    .select(`
      class_id,
      classes (
        id,
        title,
        level,
        description
      )
    `)
    .eq("student_id", user.id);

  if (error) {
    throw error;
  }

  return (
    <main className="min-h-screen bg-blue-100 flex items-center justify-center p-8">
      <section className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Student <span className="text-blue-900">Dashboard</span>
        </h1>

        {enrolledClasses.length === 0 ? (
          <>
            <p className="mt-4 text-lg font-medium">
              Welcome 👋
            </p>

            <p className="mt-2 text-gray-600">
              You have not joined any class yet.
            </p>

            <p className="mb-8 text-gray-500">
              Enter a code provided by your teacher to get started.
            </p>
          </>
        ) :  (
          <>
          
            <h2 className="mt-6 mb-4 text-2xl font-bold">
              My Classes
            </h2>
<div className="space-y-4 mb-8">
              {enrolledClasses.map((enrolment) => (
                   <Link
      key={enrolment.class_id}
      href={`/student/classes/${enrolment.classes.id}`}
      className="block cursor-pointer"
    >
               <div
                  className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                >
                  <h3 className="text-xl font-semibold">
                    {enrolment.classes.title}
                  </h3>

                  <p className="text-blue-900 font-medium">
                    {enrolment.classes.level}
                  </p>

                  <p className="mt-2 text-gray-600">
                    {enrolment.classes.description}
                  </p>
             
                </div> </Link>
              ))}
            </div>
           

            <hr className="my-8" />

            <h3 className="mb-4 text-xl font-semibold">
              Join Another Class
            </h3>
          </>
        )}

        <form action={joinClass} className="space-y-6">
          <div>
            <label
              htmlFor="class_code"
              className="block mb-2 font-medium text-gray-700"
            >
              Class Code
            </label>

            <input
              type="text"
              id="class_code"
              name="class_code"
              required
              placeholder="Enter your class code"
              className="w-full rounded-lg border border-blue-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800 transition"
          >
            Join Class
          </button>
        </form>
      </section>
    </main>
  );
}