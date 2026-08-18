import React from 'react';

// Hand-drawn subtle wobbly underline
export function DoodleUnderline({ className = "w-24 h-2 text-blue-500/60" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 6C20 2 45 9 65 5C78 2.5 90 7 98 5.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Hand-sketched 4-point editorial sparkle / star
export function DoodleSparkle({ className = "w-4 h-4 text-blue-500/70" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C12.5 7.5 16.5 11.5 22 12C16.5 12.5 12.5 16.5 12 22C11.5 16.5 7.5 12.5 2 12C7.5 11.5 11.5 7.5 12 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Minimal hand-drawn graduation cap doodle sketch
export function DoodleGradCap({ className = "w-5 h-5 text-slate-400" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 10L12 4L22 10L12 16L2 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 12.5V17.5C6 17.5 9 19.5 12 19.5C15 19.5 18 17.5 18 17.5V12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M22 10V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Minimal hand-drawn book sketch
export function DoodleBook({ className = "w-4 h-4 text-slate-400" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 19.5C4 18 5.5 16.5 7.5 16.5H20V4.5H7.5C5.5 4.5 4 6 4 7.5V19.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 19.5C4 20.5 5 21.5 6.5 21.5H20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Hand-drawn sketched arrow doodle
export function DoodleArrow({ className = "w-8 h-4 text-slate-400" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 12C12 4 28 4 36 10M36 10L30 5M36 10L31 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
