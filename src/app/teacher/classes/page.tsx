import { createClient } from "@/lib/supabase/server"
import NavLink from "@/components/navlink";
export default async function ClassesPage (){
    const supabase = await  createClient()
   
    const {data: {user}, error,} = await supabase.auth.getUser()
    if (error || !user ) {
        return null;
    
    }
     const {
        data:classes, error: classesError
     } = await supabase .from("classes") .select("*") .eq("teacher_id" , user.id)
    if (classesError) throw classesError;

     return (
             <main className="min-h-screen bg-blue-100 p-8">

      <section className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            My <span className="text-blue-900">Classes</span>
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your classes and prepare assignments.
          </p>
        </div>

        {/* Button to create a new class */}
        <NavLink href="/teacher/classes/create">
          + Create Class
        </NavLink>
      </section>
    {classes.length === 0 ? (
        <section className="rounded-xl bg-white p-10 text-center shadow">
          <h2 className="text-2xl font-bold mb-3">
            No classes yet
          </h2>

          <p className="text-gray-600 mb-6">
            Create your first class to start inviting students.
          </p>

          <NavLink href="/teacher/classes/create">
            + Create Class
          </NavLink>
        </section>
      ) :<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <article
              key={classItem.id} // Every React list item needs a unique key
              className="rounded-xl bg-white p-6 shadow"
            >
              {/* Class Title */}
              <h2 className="text-xl font-bold text-blue-900">
                {classItem.title}
              </h2>

              {/* Class Description */}
              <p className="mt-3 text-gray-600">
                {classItem.description}
              </p>

              {/* Class Level */}
              <p className="mt-4 font-semibold">
                Level:
                <span className="ml-2 text-green-700">
                  {classItem.level}
                </span>
              </p>
                     <div className="mt-6">
                <NavLink href={`/teacher/classes/${classItem.id}`}>
                  View →
                </NavLink>
                
              </div>
            </article>
          ))}
        </section>
      }
        </main>
     )
}

