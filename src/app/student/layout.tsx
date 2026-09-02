import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
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
       

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    );
  }
}
