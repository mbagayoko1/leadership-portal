import { useState, useRef } from "react";
import { FileText, Copy, Check } from "lucide-react";

// Copies a template. If the Clipboard API is blocked (some browsers and
// managed devices), it selects the text and falls back to execCommand, so
// the user can at least press Ctrl/Cmd+C on the selection.
export default function CopyBlock({ title, text, k, open }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);
  const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
  async function copy() {
    try { await navigator.clipboard.writeText(text); done(); return; } catch { /* fall through */ }
    const range = document.createRange();
    range.selectNodeContents(preRef.current);
    const sel = window.getSelection();
    sel.removeAllRanges(); sel.addRange(range);
    try { if (document.execCommand("copy")) done(); } catch { /* the text stays selected */ }
  }
  return (
    <details open={open} className="rounded-lg border border-gray-200 bg-white group">
      <summary className="cursor-pointer px-3 py-2 text-sm font-semibold text-gray-800 flex items-center gap-2">
        <FileText className="w-4 h-4 text-orange-500" />{title}
      </summary>
      <div className="px-3 pb-3">
        <div className="flex justify-end mb-1">
          <button onClick={copy} className="text-xs px-2 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1">
            {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}{copied ? k.copied : k.copy}
          </button>
        </div>
        <pre ref={preRef} className="text-xs leading-relaxed font-code whitespace-pre-wrap bg-gray-50 border border-gray-100 rounded p-3 text-gray-800 overflow-x-auto">{text}</pre>
      </div>
    </details>
  );
}
