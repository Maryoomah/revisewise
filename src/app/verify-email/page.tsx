import Link from "next/link";
export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md rounded-xl border border-gray-200 p-8 shadow-sm text-center">
        <h1 className="text-3xl font-bold text-blue-900">
          Verify Your Email
        </h1>

        <p className="mt-4 text-gray-600">
          We've sent a verification link to your email address.
        </p>

        <p className="mt-2 text-gray-600">
          Please check your inbox (and spam folder) and click the link to activate your account before logging in.
        </p>

        <Link
          href="/login"
          className="mt-8 inline-block rounded-lg bg-blue-800 px-5 py-3 text-white hover:bg-blue-900 transition"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}