"use client";

import { useState } from "react";
import deleteClass from "@/app/teacher/(app)/classes/[id]/delete/action";
type DeleteClassButtonProps = {
  classId: string;
};

export default function DeleteClassButton({
  classId,
}: DeleteClassButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer "
      >
        🗑️ Delete Class
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">
              Delete class?
            </h2>

            <p className="mt-3 leading-6 text-gray-600">
              Are you sure you want to delete this class? This action cannot
              be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer  rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <form action={deleteClass}>
                <input
                  type="hidden"
                  name="class_id"
                  value={classId}
                />

                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
                >
                  Delete Class
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}