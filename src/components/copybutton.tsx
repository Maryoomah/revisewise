"use client";

type CopyButtonProps = {
  text: string;
  
};

export default function CopyButton({ text }: CopyButtonProps) {
  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-lg bg-blue-800 px-4 py-2 text-white hover:bg-blue-900"
    >
      📋 Copy Code
    </button>
  );
}