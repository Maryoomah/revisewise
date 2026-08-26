"use client";

import { useState } from "react";

type CopyButtonProps = {
  text: string;
};

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="cursor-pointer rounded-lg bg-blue-800 px-4 py-2 text-white transition hover:bg-blue-900"
    >
      {copied ? "✓ Copied!" : "📋 Copy Code"}
    </button>
  );
}