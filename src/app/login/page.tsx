"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "./action";
import LoginButton from "./loginbutton";
export default function Login() {
  const [state, formAction] = useActionState(login, null);

  return (
    <main className="min-h-screen bg-linear-to-tl from-blue-200 to-blue-800  px-4 py-8 sm:px-6">
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md rounded-3xl bg-white px-6 py-10 shadow-xl sm:px-10 sm:py-12">
          
          <h1 className="text-center text-3xl font-extrabold uppercase tracking-tight text-gray-900 sm:text-4xl">
            Revise<span className="text-blue-900">Wise</span>
          </h1>

          {/* form */}
          <form action={formAction} className="mt-8 flex flex-col gap-4">
            <label htmlFor="email" className="font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email address"
              name="email"
              id="email"
              className="rounded-lg border border-blue-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <label htmlFor="password" className="font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="rounded-lg border border-blue-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

          <LoginButton />
          {state?.error && (
  <p className="text-center text-sm font-medium text-red-600">
    {state.error}
  </p>
)}
            <div className="mt-2 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-4">
              <Link
                href="/forgot-password"
                className="underline hover:text-blue-800"
              >
                Forgot password
              </Link>

              <Link
                href="/register"
                className="underline hover:text-blue-800"
              >
                New user? Create account
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}