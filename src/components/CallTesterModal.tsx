import React from 'react';
import { Phone, PhoneCall, CheckCircle2, X } from 'lucide-react';
import { cleanPhoneNumber } from '../utils/signatureHtmlGenerator';

interface CallTesterModalProps {
  phone: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CallTesterModal: React.FC<CallTesterModalProps> = ({
  phone,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const telLink = `tel:${cleanPhoneNumber(phone)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <PhoneCall className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">Click-to-Call Test</h3>
            <p className="text-xs text-slate-400">RFC 3966 Protocol Verification</p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 mb-4">
          <div className="text-xs text-slate-400 mb-1">Target Phone Number</div>
          <div className="text-xl font-mono font-bold text-white tracking-wide">{phone}</div>
          <div className="text-xs text-cyan-400 font-mono mt-1 break-all">URI: {telLink}</div>
        </div>

        <div className="space-y-2 mb-6 text-xs text-slate-300">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>iOS & Android:</strong> Tapping directly opens the native smartphone dialer with number pre-filled.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>macOS & Windows:</strong> Prompts FaceTime, Microsoft Teams, Skype, or Phone Link.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Spam Guard:</strong> Wrapped in explicit inline span tags to prevent Gmail from recoloring it to default blue.</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={telLink}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>Launch Native Call ({phone})</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
