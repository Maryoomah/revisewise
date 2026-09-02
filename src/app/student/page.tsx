import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import joinClass from "./(app)/action/joinclass";
import signOut from "../logout/action";
import { getAssignmentStatus } from "@/lib/assignmentStatus";
import Link from "next/link";

type EnrolledClass = {
  class_id: string;
  classes: {
    id: string;
    title: string;
    level: string;
    description: string;
  };
};
export default async function StudentDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();
    if (profileError) {
    throw profileError;
  }

  const { data: enrolledClassesData, error } = await supabase
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
const enrolledClasses = (enrolledClassesData ?? []) as unknown as EnrolledClass[];
  const enrolledClassesIds = enrolledClasses.map(
  (classItem) => classItem.classes.id
);
  let assignments: any[] = [];

  if(enrolledClassesIds.length > 0) {
     const { data, error: assignmentsError } = await supabase
      .from("assignments")
      .select("id, title, due_date, class_id")
      .in("class_id", enrolledClassesIds);

    if (assignmentsError) {
      throw assignmentsError;
    }
    assignments = data ?? [];

  }

   const assignmentCount = assignments.length;

  const assignmentIds = assignments.map((assignment) => assignment.id);

    let submissions: any[] = [];

  if (assignmentIds.length > 0) {
    const { data, error: submissionsError } = await supabase
      .from("submissions")
      .select("id, assignment_id, status, feedback")
      .in("assignment_id", assignmentIds)
      .eq("student_id", user.id);

    if (submissionsError) {
      throw submissionsError;
    }

    submissions = data ?? [];
  }
// const submissionsAwaitingFeedback = submissions.filter(
//   (submission) =>
//     submission.status === "submitted" && !submission.feedback
// );

// const awaitingFeedbackCount = submissionsAwaitingFeedback.length;
  return (
  <main className="min-h-screen bg-linear-to-br from-blue-200 via-blue-100 to-blue-300 rounded-2xl p-6 md:p-8">
     {/* Header */}
     
         <section className="mb-12 flex items-center justify-between">
                          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                    Revise<span className="text-blue-900">Wise</span>
                  </h1>
              
                        <div className="flex gap-4">
                          <form action={signOut}>
                            {" "}
                            <button
                              type="submit"
                              className="inline-block rounded-lg bg-blue-800 px-6 py-3 text-white hover:bg-blue-900 transition"
                            >
                              Log Out
                            </button>
                          </form>{" "}
                        </div>
                      </section>
  <section className="mx-auto w-full max-w-6xl">
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
             {/* Welcome */}
       <section className="mb-8">

  <h1 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
    Welcome, {profile.full_name.split(" ")[0]} 👋
  </h1>

</section>
    {/* <h2 className="text-2xl font-bold text-gray-900 mb-4">
Profile Summary    </h2>
       <div className="mb-10 grid gap-4 sm:grid-cols-3">
  <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
     <p className="mt-2 text-3xl font-bold text-gray-900">
      {enrolledClasses.length}
    </p>
    <p className="text-sm font-medium text-gray-500">
      Classes
    </p>

   
  </div>

  <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
     <p className="mt-2 text-3xl font-bold text-gray-900">
      {assignmentCount}
    </p>
    <p className="text-sm font-medium text-gray-500">
      Assignments
    </p>

   
  </div>

  <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
    <p className="mt-2 text-3xl font-bold text-gray-900">
      {awaitingFeedbackCount}
    </p>
    <p className="text-sm font-medium text-gray-500">
     Awaiting Feedback
    </p>

    
  </div>
</div>      */}
<section className="mb-10">
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-900">
      My Classes
    </h2>

    <span className="text-sm font-bold text-blue-800">
      {enrolledClasses.length}{" "}
      {enrolledClasses.length === 1 ? "class" : "classes"}
    </span>
  </div>

  <div className="grid gap-5 md:grid-cols-2">
    {enrolledClasses.map((enrolment) => (
      <Link
        key={enrolment.class_id}
        href={`/student/classes/${enrolment.classes.id}`}
        className="group"
      >
        <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium text-blue-900">
                {enrolment.classes.level}
              </p>

              <h3 className="text-xl font-bold text-gray-900">
                {enrolment.classes.title}
              </h3>
            </div>

          
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
            {enrolment.classes.description}
          </p>

          <p className="mt-5 text-sm font-semibold text-blue-900">
            View class →
          </p>
        </div>
      </Link>
    ))}
  </div>
</section>
           <section className="mb-10">
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-900">
      Recent Assignments
    </h2>

    <span className="text-sm text-gray-500">
      {assignmentCount}{" "}
      {assignmentCount === 1 ? "assignment" : "assignments"}
    </span>
  </div>

  {assignments.length === 0 ? (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
      <p className="font-medium text-gray-700">
        No assignments yet.
      </p>

      <p className="mt-1 text-sm text-gray-500">
        Your teacher's assignments will appear here.
      </p>
    </div>
  ) : (
   <div className="space-y-3">
  {assignments.map((assignment) => {
    const status = getAssignmentStatus(
      assignment.id,
      submissions
    );

    return (
      <Link
        key={assignment.id}
        href={`/student/classes/${assignment.class_id}/assignments/${assignment.id}`}
        className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {assignment.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Due{" "}
              {new Date(assignment.due_date).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${status.className}`}
            >
              {status.label}
            </span>

            <span className="text-gray-400 transition group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </Link>
    );
  })}
</div>
  )}
</section>

            <hr className="my-8" />

            <h3 className="mb-4 text-xl font-semibold text-blue-800">
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