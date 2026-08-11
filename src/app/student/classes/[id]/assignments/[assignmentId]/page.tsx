import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import NavLink from "@/components/navlink";
import submitAssignment from "./action";
export default async function AssignmentPage({
  params,
}: {
  params: Promise<{ id: string, assignmentId : string }>;
}) {
  const {id, assignmentId} = await params;

  const supabase = await createClient ();

   const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) {
      redirect("/login");
    }
  
 const { data: assignment, error: assignmentError } = await supabase
    .from("assignments")
    .select("*")
.eq("id", assignmentId)    .single();
if (assignmentError) {
  throw assignmentError;
}

const {data: submission , error:submissionError} = await supabase
.from ("submissions")
.select ("*")
  .eq("assignment_id", assignmentId)
  .eq("student_id", user.id)
  .maybeSingle();
  
  if (submissionError) {
    throw submissionError;
  }
  return (
    <main>
      <section>
        <NavLink href={`/student/classes/${id}`}>
  ← Back to Class
</NavLink>
        <h1>{assignment.title}</h1>
        <p>{assignment.instructions}</p>
        <p>Due: {assignment.due_date}</p>

        {
       <form action={submitAssignment}>
        <input
  type="hidden"
  name="assignment_id"
  value={assignmentId}
/>
  <textarea
    id="response"
    name="response"
    rows={10}
    required
    defaultValue={submission?.response ?? ""}
      className="w-full rounded-lg border p-4 min-h-100"

  />

  <button type="submit">
    {submission ? "Update Submission" : "Submit Essay"}
  </button>
</form>
        
        }
      </section>

    </main>
  );
}
