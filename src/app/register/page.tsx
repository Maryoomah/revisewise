import Link from "next/link";
import { signup } from "./action";
export default function Register() {
  return (
    <section className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center">
          Write <span className="text-blue-900">Wise</span>
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Register to get started.
        </p>

        {/* Form */}
        <form action={signup} className="mt-8 space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="full_name"
              className="block mb-2 font-medium "
            >
              Full Name
            </label>
            <input
              id="full_name"
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              required
              className="w-full border border-blue-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium "
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="w-full border border-blue-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 font-medium ">
              Role
            </label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
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

              <label className="flex items-center gap-2 cursor-pointer">
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
              className="block mb-2 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full border border-blue-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 font-medium "
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirm_password"
              placeholder="Confirm your password"
              required
              className="w-full border border-blue-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-900 hover:bg-blue-800 transition text-white py-3 rounded-lg font-semibold"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center ">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-900 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}