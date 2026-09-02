"use client";

import { useFormStatus } from "react-dom";

export default function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg cursor-pointer bg-blue-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-70 sm:px-6 sm:py-3 sm:text-base"
    >
      {pending ? "Logging out..." : "Log Out"}
    </button>
  );
}