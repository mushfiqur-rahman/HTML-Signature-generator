import React, { useState } from 'react';
import { Code, Copy, Check, FileCode, CheckCircle2 } from 'lucide-react';
import { SignatureData } from '../types/signature';
import { generateSignatureHtml } from '../utils/signatureHtmlGenerator';

interface CodeInspectorProps {
  signatureData: SignatureData;
  onCopyRaw: () => void;
  copiedRawState: boolean;
}

export const CodeInspector: React.FC<CodeInspectorProps> = ({
  signatureData,
  onCopyRaw,
  copiedRawState,
}) => {
  const [backgroundVersion, setBackgroundVersion] = useState<'custom' | 'dark' | 'light'>('custom');
  const rawHtml = generateSignatureHtml(
    signatureData,
    backgroundVersion === 'custom' ? undefined : backgroundVersion
  );
  const byteSize = new Blob([rawHtml]).size;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileCode className="h-5 w-5 text-cyan-400" />
            <span>Cross-Platform Inline CSS HTML Source</span>
          </h2>
          <p className="text-xs text-slate-400">
            Engineered exclusively with HTML tables and inline styles for 100% fidelity across Microsoft 365, Outlook, Gmail, and Apple Mail.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Background Variant for HTML */}
          <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setBackgroundVersion('custom')}
              className={`px-2.5 py-1 rounded transition-colors ${
                backgroundVersion === 'custom' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'
              }`}
            >
              Current Custom
            </button>
            <button
              type="button"
              onClick={() => setBackgroundVersion('dark')}
              className={`px-2.5 py-1 rounded transition-colors ${
                backgroundVersion === 'dark' ? 'bg-slate-800 text-amber-300' : 'text-slate-400'
              }`}
            >
              Dark
            </button>
            <button
              type="button"
              onClick={() => setBackgroundVersion('light')}
              className={`px-2.5 py-1 rounded transition-colors ${
                backgroundVersion === 'light' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'
              }`}
            >
              Light
            </button>
          </div>

          <button
            type="button"
            onClick={onCopyRaw}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold shadow-md transition-all ${
              copiedRawState
                ? 'bg-emerald-600 text-white'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:scale-95'
            }`}
          >
            {copiedRawState ? (
              <>
                <Check className="h-4 w-4" />
                <span>HTML Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Raw HTML</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
          <div className="text-[10px] uppercase font-semibold text-slate-400">Total File Weight</div>
          <div className="text-lg font-mono font-bold text-white tabular-nums">
            {(byteSize / 1024).toFixed(2)} KB
          </div>
          <div className="text-[10px] text-emerald-400 font-medium">Safe under 102KB limit</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
          <div className="text-[10px] uppercase font-semibold text-slate-400">Rendering Engine</div>
          <div className="text-lg font-bold text-white">MSO Word & WebKit</div>
          <div className="text-[10px] text-cyan-400">Zero CSS grid / flex reliance</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
          <div className="text-[10px] uppercase font-semibold text-slate-400">Dialer Link Protocol</div>
          <div className="text-lg font-mono font-bold text-white">RFC 3966</div>
          <div className="text-[10px] text-emerald-400">tel: protocol compliant</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
          <div className="text-[10px] uppercase font-semibold text-slate-400">Image Asset Lock</div>
          <div className="text-lg font-mono font-bold text-white">{signatureData.logoWidth}px bicubic</div>
          <div className="text-[10px] text-cyan-400">High-DPI safe</div>
        </div>
      </div>

      {/* Code Viewer Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2">signature.html</span>
          </div>

          <div className="text-[11px] font-mono text-slate-500">
            {rawHtml.length} characters
          </div>
        </div>

        <div className="p-4 overflow-x-auto max-h-[500px]">
          <pre className="font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-all">
            {rawHtml}
          </pre>
        </div>
      </div>

      {/* Technical Highlights Callout */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
        <div className="text-xs font-semibold text-slate-300">Why are these specific attributes critical?</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-slate-400">
          <div>
            <code className="text-cyan-300 font-mono">cellpadding="0" cellspacing="0"</code>
            <p className="mt-1">Stops Outlook and Lotus/webmail engines from adding phantom 2px spacing between cells.</p>
          </div>
          <div>
            <code className="text-cyan-300 font-mono">-ms-interpolation-mode: bicubic</code>
            <p className="mt-1">Forces Microsoft Outlook to use bicubic interpolation instead of jagged nearest-neighbor scaling for the logo.</p>
          </div>
          <div>
            <code className="text-cyan-300 font-mono">&lt;span style="color:...;"&gt; inside &lt;a&gt;</code>
            <p className="mt-1">Prevents iOS Mail and Gmail app from overriding your link color to default vibrant royal blue.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
