import Link from "next/link";
import { signup } from "./action";

export default function Register() {
  return (
    <main className="min-h-screen  bg-linear-to-tl from-blue-200 to-blue-800 px-4 py-8 sm:px-6">
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md rounded-3xl bg-white px-6 py-10 shadow-xl sm:px-10 sm:py-12">
          <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            Revise<span className="text-blue-900">Wise</span>
          </h1>

          <p className="mt-2 text-center text-gray-500">
            Register to get started.
          </p>

          {/* Form */}
          <form action={signup} className="mt-8 space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="full_name"
                className="mb-2 block font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                id="full_name"
                type="text"
                name="full_name"
                placeholder="Enter your full name"
                required
                className="w-full rounded-lg border border-blue-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-medium text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="w-full rounded-lg border border-blue-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            {/* Role */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Role
              </label>

              <div className="flex gap-6">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    id="teacher"
                    name="role"
                    value="teacher"
                    required
                    className="accent-blue-900"
                  />
                  Teacher
                </label>

                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    id="student"
                    name="role"
                    value="student"
                    className="accent-blue-900"
                  />
                  Student
                </label>
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-blue-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block font-medium text-gray-700"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                name="confirm_password"
                placeholder="Confirm your password"
                required
                className="w-full rounded-lg border border-blue-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-blue-900 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Create Account
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-blue-900 hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}