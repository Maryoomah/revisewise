"use client";

import { useActionState } from "react";
import { updatePassword } from "./action";
import UpdatePasswordButton from "./updatePwordButton";

export default function UpdatePasswordPage() {
  const [state, formAction] = useActionState(updatePassword, null);

  return (
    <section className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <h1 className="text-center text-3xl font-extrabold uppercase md:text-4xl">
          Reset <span className="text-blue-900">Password</span>
        </h1>

        <form action={formAction} className="space-y-5">
          <div>
            <label htmlFor="newpassword" className="block mb-2 font-medium">
              Enter New Password
            </label>

            <input
              type="password"
              name="newpassword"
              id="newpassword"
              placeholder="New password"
              minLength={8}
              required
              className="w-full rounded-lg border border-blue-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <div>
            <label
              htmlFor="confirmpassword"
              className="block mb-2 font-medium"
            >
              Confirm New Password
            </label>

            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              minLength={8}
              required
              placeholder="Confirm password"
              className="w-full rounded-lg border border-blue-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          {state?.error && (
            <p className="text-center text-sm font-medium text-red-600">
              {state.error}
            </p>
          )}

        <UpdatePasswordButton/>
        </form>
      </div>
    </section>
  );
}