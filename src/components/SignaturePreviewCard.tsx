import React, { useState, useRef } from 'react';
import {
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Phone,
  Copy,
  Mail,
  Check,
  ExternalLink,
  ShieldCheck,
  Eye,
  Sliders,
  Code
} from 'lucide-react';
import { SignatureData } from '../types/signature';
import { generateSignatureHtml } from '../utils/signatureHtmlGenerator';

interface SignaturePreviewCardProps {
  signatureData: SignatureData;
  onCopyRich: () => void;
  onCopyRaw: () => void;
  onTestCall: () => void;
  onDownload: () => void;
  copiedState: boolean;
  copiedRawState: boolean;
}

export const SignaturePreviewCard: React.FC<SignaturePreviewCardProps> = ({
  signatureData,
  onCopyRich,
  onCopyRaw,
  onTestCall,
  copiedState,
  copiedRawState,
}) => {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [mailboxTheme, setMailboxTheme] = useState<'custom' | 'dark' | 'light'>('custom');
  const [showScreenshotCompare, setShowScreenshotCompare] = useState(false);
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate HTML specifically for the chosen preview background
  const previewHtml = generateSignatureHtml(
    signatureData,
    mailboxTheme === 'custom' ? undefined : mailboxTheme
  );

  // Determine active background color
  const activeBgColor = mailboxTheme === 'custom'
    ? signatureData.backgroundColor
    : (mailboxTheme === 'dark' ? '#121212' : '#FFFFFF');

  const isLightBg = activeBgColor.toLowerCase() === '#ffffff' || activeBgColor.toLowerCase() === '#fff';

  // Subject and mailto test compose
  const mailtoTest = `mailto:${signatureData.email}?subject=Testing%20JAM%203D%20StitchWorks%20Signature&body=Hi%20Jason%20and%20Marcie,%0D%0A%0D%0ATesting%20the%20new%20responsive%20email%20signature!`;

  return (
    <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl overflow-hidden">
      {/* Top Card Bar with Viewport & Theme controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-900/90 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Live Client View:</span>
          
          {/* Viewport Selector */}
          <div className="flex items-center gap-1 rounded-lg bg-slate-950 p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                viewport === 'desktop'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              <span>Desktop (Outlook/Gmail)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                viewport === 'mobile'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Mobile (375px Fluid)</span>
            </button>
          </div>
        </div>

        {/* Mailbox Background & Reference compare */}
        <div className="flex items-center gap-2">
          {/* Mailbox Background & Reference compare */}
          <div className="flex items-center gap-1 rounded-lg bg-slate-950 p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => setMailboxTheme('custom')}
              title="Custom theme configured in Colors panel"
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                mailboxTheme === 'custom'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="h-2 w-2 rounded-full border border-white/40" style={{ backgroundColor: signatureData.backgroundColor }} />
              <span>Custom</span>
            </button>
            <button
              type="button"
              onClick={() => setMailboxTheme('dark')}
              title="Dark Mode Mailbox"
              className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                mailboxTheme === 'dark'
                  ? 'bg-slate-800 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
              <span>Dark</span>
            </button>
            <button
              type="button"
              onClick={() => setMailboxTheme('light')}
              title="Light Mode Mailbox"
              className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                mailboxTheme === 'light'
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
              <span>Light</span>
            </button>
          </div>

          {/* Compare toggle */}
          <button
            type="button"
            onClick={() => setShowScreenshotCompare(!showScreenshotCompare)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
              showScreenshotCompare
                ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Compare Reference</span>
          </button>
        </div>
      </div>

      {/* Simulated Email Envelope Header */}
      <div className="border-b border-slate-800/60 bg-slate-950/60 px-6 py-2.5 text-xs text-slate-400">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">From:</span>
            <span>{signatureData.names} &lt;{signatureData.email}&gt;</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Subject: Custom 3D Embroidery Quotation</span>
            <span>·</span>
            <span>Today at 10:45 AM</span>
          </div>
        </div>
      </div>

      {/* Main Mailbox Canvas Area */}
      <div className="flex flex-col items-center justify-center p-6 bg-slate-950/40 min-h-[380px] overflow-x-auto">
        <div className="w-full flex justify-center">
          <div
            style={{ backgroundColor: activeBgColor }}
            className={`transition-all duration-300 rounded-xl overflow-hidden border ${
              isLightBg ? 'border-slate-200 text-slate-900 shadow-lg' : 'border-slate-800 text-white shadow-xl'
            } ${viewport === 'mobile' ? 'max-w-[375px] w-full p-4 ring-8 ring-slate-800' : 'max-w-2xl w-full p-6'}`}
          >
            {/* Simulated Email Body text */}
            <div className="mb-6 space-y-2 text-xs leading-relaxed opacity-75 border-b pb-4 border-dashed border-slate-700/40">
              <p>Hi there,</p>
              <p>
                Thanks for reaching out to JAM 3D StitchWorks! We have reviewed your custom stitch request and would love to bring your vision to life with precision 3D puff embroidery.
              </p>
              <p>
                Feel free to call or reply with any questions regarding sizing, thread colors, or turn-around times.
              </p>
            </div>

            {/* Rendered Email Signature Container */}
            <div
              ref={containerRef}
              className="signature-render-box select-all"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        </div>

        {/* Side-by-Side Reference Comparison Drawer */}
        {showScreenshotCompare && (
          <div className="mt-6 w-full max-w-2xl rounded-xl border border-slate-800 bg-slate-900/90 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-cyan-300">
                User Reference Screenshot vs. Generated HTML
              </span>
              <span className="text-[11px] text-slate-400">
                Dark Mode Mobile Reference
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-black p-3 border border-slate-800 text-xs">
                <div className="text-[11px] font-semibold text-slate-400 mb-2">Original Screenshot Layout:</div>
                <div className="space-y-1 font-sans text-white">
                  <div>Sincerely,</div>
                  <div className="font-medium">Jason And Marcie</div>
                  <div>JAM 3D StitchWorks</div>
                  <div>Email: <span className="text-cyan-400 underline">Orders@jam3dstitchworks.com</span></div>
                  <div>Web: <span className="text-cyan-400 underline">www.jam3dstitchworks.com</span></div>
                  <div>Phone: <span className="underline">(850) 730-1991</span></div>
                  <div className="pt-2">
                    <img
                      src={signatureData.logoUrl}
                      alt="JAM 3D StitchWorks Original"
                      className="w-32 h-auto"
                      onError={() => setImageError(true)}
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-xs text-slate-300">
                <div className="text-[11px] font-semibold text-emerald-400 mb-2">Enhancements Applied:</div>
                <ul className="space-y-1.5 text-[11px] list-disc list-inside text-slate-300">
                  <li><strong>Active Click-to-Call:</strong> Wrapped in <code className="text-cyan-300">tel:+18507301991</code> for 1-tap dialing.</li>
                  <li><strong>Outlook MSO Locked Width:</strong> Image will never stretch on 4K/high-DPI Windows screens.</li>
                  <li><strong>Inline CSS Colors:</strong> Explicit spans stop iOS and Gmail from turning text blue.</li>
                  <li><strong>Mobile Viewport Fluid:</strong> Fits 320px–375px screens with zero horizontal overflow.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-900/95 px-6 py-4">
        {/* Left: Interactive Testers */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onTestCall}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Test Click-to-Call</span>
          </button>

          <a
            href={mailtoTest}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Test Mailto Draft</span>
          </a>
        </div>

        {/* Right: Quick Copy Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCopyRaw}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
          >
            {copiedRawState ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>HTML Copied!</span>
              </>
            ) : (
              <>
                <Code className="h-3.5 w-3.5" />
                <span>Copy Raw HTML</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCopyRich}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold shadow-md transition-all ${
              copiedState
                ? 'bg-emerald-600 text-white'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:scale-95'
            }`}
          >
            {copiedState ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied for Gmail & Outlook!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Signature (Rich Format)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
