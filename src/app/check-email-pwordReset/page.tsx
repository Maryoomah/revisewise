import Link from "next/link";
export default function CheckEmail() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <section className="flex min-h-[80vh] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
            ✉️
          </div>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Check Your Email
          </h1>

          <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
            We've sent you a password reset link. If you don't see it,
            check your spam or junk folder.
          </p>

          <Link
            href="/login"
            className="mt-7 inline-flex rounded-xl bg-blue-800 px-6 py-3 font-semibold text-white transition hover:bg-blue-900"
          >
            Back to Login
          </Link>
        </div>
      </section>
    </main>
  );
}
