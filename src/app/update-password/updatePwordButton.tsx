"use client";

import { useFormStatus } from "react-dom";

export default function UpdatePasswordButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 rounded-lg cursor-pointer bg-blue-800 px-3 py-3 font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Resetting Password..." : "Reset password"}
    </button>
  );
}