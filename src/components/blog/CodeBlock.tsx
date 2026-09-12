"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({
  code,
  language = "typescript",
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div className="my-6 max-w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1117] text-slate-200 shadow-xl font-mono text-xs sm:text-sm">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-[#161b22] px-4 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          {filename && (
            <span className="ml-2 text-[11px] text-slate-400 truncate max-w-[160px] sm:max-w-none">{filename}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase text-slate-500 tracking-wider">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300 transition-all hover:bg-slate-700 hover:text-white cursor-pointer"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <svg
                  className="h-3.5 w-3.5 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-green-400 text-[11px]">Copied!</span>
              </>
            ) : (
              <>
                <svg
                  className="h-3.5 w-3.5 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code with Line Numbers */}
      <div className="w-full max-w-full overflow-x-auto p-4 leading-relaxed overscroll-x-contain">
        <pre className="table min-w-full">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-white/[0.03]">
                <td className="w-8 select-none pr-4 text-right text-slate-600 font-mono text-xs shrink-0">
                  {i + 1}
                </td>
                <td className="code-line whitespace-pre pr-4 font-mono text-slate-200">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </pre>
      </div>
    </div>
  );
}
