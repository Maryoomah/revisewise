
import { forgotPassword } from "./action";

export default function ResetPassword() {
  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-900/5 sm:p-8 md:p-10">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7 text-blue-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-6 6l-6.75 6.75a1.5 1.5 0 0 1-2.121-2.121L13.5 12.75a6 6 0 0 1 5.25-10.5Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.75 8.25a3 3 0 0 0-3-3"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Reset{" "}
                <span className="text-blue-900">Password</span>
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 sm:text-base">
                Enter your email address and we'll send you a password reset
                link.
              </p>
            </div>

            {/* Form */}
            <form action={forgotPassword} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-800 focus:bg-white focus:ring-4 focus:ring-blue-900/10"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-950 hover:shadow-xl hover:shadow-blue-900/25 focus:outline-none focus:ring-4 focus:ring-blue-900/20 active:scale-[0.99]"
              >
                Send Reset Link
              </button>
            </form>

            {/* Bottom hint */}
            <p className="mt-6 text-center text-xs leading-5 text-slate-400">
              We'll send instructions to the email address associated with
              your account.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
