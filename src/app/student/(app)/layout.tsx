import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import signOut from "@/app/logout/action";
import NavLink from "@/components/navlink";
export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "student") {
    redirect("/login");
  }

  {
    return (
      <div className="min-h-screen rounded-2xl w-full bg-linear-to-br from-blue-200 via-blue-100 to-blue-200 ">
        {/* Header */}
          <header className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
               <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                 <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl md:text-4xl">
                   Revise<span className="text-blue-900">Wise</span>
                 </h1>
       
                 <div className="flex justify-center items-center gap-3">
                   <NavLink href="/student">Go to Dashboard</NavLink>
       
                   <form action={signOut}>
                     <button
                       type="submit"
                       className="rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-900 sm:px-6 sm:py-3 sm:text-base"
                     >
                       Log Out
                     </button>
                   </form>
                 </div>
               </div>
             </header>

        {/* Main Content */}
        <main className="min-h-screen ">{children}</main>
      </div>
    );
  }
}
