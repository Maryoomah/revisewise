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
      <div className="min-h-screen ">
        {/* Header */}
        <section className=" flex items-center justify-between p-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Revise<span className="text-blue-900">Wise</span>
          </h1>
          <div className="flex gap-4">
            <NavLink href="/student">Go to Dashboard</NavLink>
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

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    );
  }
}
