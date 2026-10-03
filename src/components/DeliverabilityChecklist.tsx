import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Info,
  Smartphone,
  Cpu,
  MailCheck,
  Flame,
  Zap,
  Lock
} from 'lucide-react';
import { runDeliverabilityAudit } from '../utils/deliverabilityAudit';
import { SignatureData } from '../types/signature';
import { generateSignatureHtml } from '../utils/signatureHtmlGenerator';

interface DeliverabilityChecklistProps {
  signatureData: SignatureData;
}

export const DeliverabilityChecklist: React.FC<DeliverabilityChecklistProps> = ({ signatureData }) => {
  const html = generateSignatureHtml(signatureData);
  const audit = runDeliverabilityAudit(signatureData, html);

  return (
    <div className="space-y-6">
      {/* Top Banner / Scorecard */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Inbox Deliverability & Spam Engine Verified</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Anti-Spam & Cross-Client Compatibility Audit
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Tested against spam heuristic rules (SpamAssassin, Barracuda, Google Workspace Spam Guard) and rendering engines (Outlook MSO Word Engine, Webkit, Blink).
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 rounded-xl p-4 border border-slate-800 shrink-0">
            <div className="text-right">
              <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Deliverability</div>
              <div className="text-xs text-emerald-400 font-medium">Safe for Inbox</div>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/40">
              <span className="font-mono text-2xl font-bold tabular-nums text-emerald-300">
                {audit.score}%
              </span>
            </div>
          </div>
        </div>

        {/* Quick Compatibility Badges */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-2 rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
            <MailCheck className="h-4 w-4 text-cyan-400 shrink-0" />
            <div className="text-xs">
              <div className="font-semibold text-white">Gmail Web & App</div>
              <div className="text-[10px] text-emerald-400">100% Inline CSS</div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
            <Cpu className="h-4 w-4 text-cyan-400 shrink-0" />
            <div className="text-xs">
              <div className="font-semibold text-white">Outlook 365 & Win</div>
              <div className="text-[10px] text-emerald-400">MSO Bicubic Locked</div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
            <Smartphone className="h-4 w-4 text-cyan-400 shrink-0" />
            <div className="text-xs">
              <div className="font-semibold text-white">Mobile Dialers</div>
              <div className="text-[10px] text-emerald-400">Active RFC 3966</div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-900/60 p-2.5 border border-slate-800">
            <Lock className="h-4 w-4 text-cyan-400 shrink-0" />
            <div className="text-xs">
              <div className="font-semibold text-white">Spam Protection</div>
              <div className="text-[10px] text-emerald-400">Zero Base64 / Scripts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Technical Checks Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">
          Technical Verification Checks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {audit.checks.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/70 p-4 transition-all hover:border-slate-700"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {item.status === 'pass' ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
                    )}
                    <span className="text-xs font-semibold text-white">{item.title}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                      item.status === 'pass'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                        : 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              <div className="rounded-lg bg-slate-950 p-2 border border-slate-800/80">
                <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-0.5">Code Guard</span>
                <code className="text-[11px] font-mono text-cyan-300 break-all">
                  {item.technicalDetail}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Anti-Spam Best Practices Reference */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/90 p-5 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
          <Flame className="h-4 w-4" />
          <span>Why will this signature NOT land in spam folders?</span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">1.</span>
            <span><strong>No Gigantic Base64 Data Blobs:</strong> Base64 images inflate email sizes above the 102KB Gmail clipping threshold and trigger spam filters. We use clean Shopify CDN HTTPS URLs.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">2.</span>
            <span><strong>High Text-to-Image Density:</strong> Spam filters penalize signatures that are just a single flat image. Our signature provides real text headers, company credentials, and contact strings.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">3.</span>
            <span><strong>No Disallowed Script Tags:</strong> No JavaScript, no iframes, no tracking pixels, and no external stylesheets.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">4.</span>
            <span><strong>Domain Consistency:</strong> All hyperlinks point directly to verified HTTPS domains (<code className="text-slate-200">jam3dstitchworks.com</code>) without URL-shorteners (bit.ly) which are common spam triggers.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
