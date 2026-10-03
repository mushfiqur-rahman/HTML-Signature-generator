import React from 'react';
import { Copy, Download, Sparkles, Check } from 'lucide-react';

interface HeaderProps {
  activeTab: 'preview' | 'audit' | 'guide' | 'code';
  setActiveTab: (tab: 'preview' | 'audit' | 'guide' | 'code') => void;
  onCopyRich: () => void;
  onDownload: () => void;
  copiedState: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onCopyRich,
  onDownload,
  copiedState,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Wordmark Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white">
              JAM 3D StitchWorks
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              Email Signature Studio
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Text with subtle active states) */}
        <nav className="hidden md:flex items-center gap-1 rounded-lg bg-slate-900/80 p-1 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'preview'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Signature Designer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'audit'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Spam & Deliverability
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Installation Guides
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Inline HTML
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDownload}
            title="Download .html file for Outlook Signatures folder"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            <span>Export .html</span>
          </button>

          <button
            type="button"
            onClick={onCopyRich}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold shadow-sm transition-all whitespace-nowrap ${
              copiedState
                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:scale-95'
            }`}
          >
            {copiedState ? (
              <>
                <Check className="h-3.5 w-3.5 text-white" />
                <span>Copied for Gmail & Outlook!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy for Gmail / Outlook</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
