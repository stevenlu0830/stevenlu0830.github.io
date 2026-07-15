"use client";

import { useRouter } from "next/navigation";

export default function BackButton({
  fallback,
  label,
}: {
  fallback: string;
  label: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        // Going back through history restores the exact scroll position on
        // the main page; the fallback covers direct visits to this page.
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push(fallback);
        }
      }}
      className="fixed left-6 top-6 cursor-pointer text-3xl text-muted transition-colors hover:text-[#dcdcaa]"
    >
      <span aria-hidden="true">←</span>
    </button>
  );
}
