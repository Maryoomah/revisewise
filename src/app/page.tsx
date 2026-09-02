import NavLink from "@/components/navlink";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-tl from-blue-200 to-blue-800   px-4 py-8 sm:px-6">
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-3xl rounded-3xl bg-white px-6 py-12 text-center shadow-xl sm:px-10 sm:py-16 md:px-16">
          
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Revise<span className="text-blue-900">Wise</span>
          </h1>

          <h4 className="mt-4 text-base font-medium italic text-gray-600 sm:text-xl">
            AI-assisted Writing Revision
          </h4>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Helping learners understand and implement teacher feedback
            through AI-guided revision.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <NavLink href="/login">
              Login to Dashboard
            </NavLink>

            <NavLink href="/register">
              New User? Create Account
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
}