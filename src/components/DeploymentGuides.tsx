import React, { useState } from 'react';
import {
  Mail,
  Laptop,
  Apple,
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
  FolderOpen,
  ArrowRight
} from 'lucide-react';

interface DeploymentGuidesProps {
  onCopyRich: () => void;
  onCopyRaw: () => void;
  onDownloadHtml: () => void;
  copiedState: boolean;
}

export const DeploymentGuides: React.FC<DeploymentGuidesProps> = ({
  onCopyRich,
  onCopyRaw,
  onDownloadHtml,
  copiedState,
}) => {
  const [activeClient, setActiveClient] = useState<'gmail' | 'm365' | 'outlook_win' | 'outlook_mac' | 'apple_mail'>('gmail');
  const [copiedFolder, setCopiedFolder] = useState(false);

  const copyOutlookPath = () => {
    navigator.clipboard.writeText('%appdata%\\Microsoft\\Signatures');
    setCopiedFolder(true);
    setTimeout(() => setCopiedFolder(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Client Deployment Guides
          </h2>
          <p className="text-xs text-slate-400">
            Step-by-step instructions for 1-click installation into your email clients.
          </p>
        </div>

        <button
          type="button"
          onClick={onCopyRich}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold shadow-md transition-all ${
            copiedState
              ? 'bg-emerald-600 text-white'
              : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:scale-95'
          }`}
        >
          {copiedState ? (
            <>
              <Check className="h-4 w-4" />
              <span>Signature Copied! Ready to Paste</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>1-Click Copy for Email Settings</span>
            </>
          )}
        </button>
      </div>

      {/* Client Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <button
          type="button"
          onClick={() => setActiveClient('gmail')}
          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
            activeClient === 'gmail'
              ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500/50'
              : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Mail className="h-5 w-5 mb-1.5 text-red-400" />
          <span className="text-xs font-semibold">Gmail</span>
          <span className="text-[10px] text-slate-500">Web & App</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveClient('m365')}
          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
            activeClient === 'm365'
              ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500/50'
              : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Laptop className="h-5 w-5 mb-1.5 text-blue-400" />
          <span className="text-xs font-semibold">Microsoft 365</span>
          <span className="text-[10px] text-slate-500">Outlook Web</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveClient('outlook_win')}
          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
            activeClient === 'outlook_win'
              ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500/50'
              : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Laptop className="h-5 w-5 mb-1.5 text-sky-400" />
          <span className="text-xs font-semibold">Outlook Windows</span>
          <span className="text-[10px] text-slate-500">Desktop 2016-2024</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveClient('outlook_mac')}
          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
            activeClient === 'outlook_mac'
              ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500/50'
              : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Apple className="h-5 w-5 mb-1.5 text-slate-300" />
          <span className="text-xs font-semibold">Outlook Mac</span>
          <span className="text-[10px] text-slate-500">macOS App</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveClient('apple_mail')}
          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
            activeClient === 'apple_mail'
              ? 'border-cyan-500 bg-cyan-950/40 text-white ring-1 ring-cyan-500/50'
              : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
          }`}
        >
          <Mail className="h-5 w-5 mb-1.5 text-indigo-400" />
          <span className="text-xs font-semibold">Apple Mail</span>
          <span className="text-[10px] text-slate-500">Mac & iOS</span>
        </button>
      </div>

      {/* Guide Content Panels */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-6">
        {/* GMAIL GUIDE */}
        {activeClient === 'gmail' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Deploying to Google Workspace & Gmail</span>
              </h3>
              <a
                href="https://mail.google.com/mail/u/0/#settings/general"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline"
              >
                <span>Open Gmail Settings</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <ol className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-3 rounded-xl bg-slate-950 p-3.5 border border-slate-800">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">1</span>
                <div>
                  <div className="font-semibold text-white mb-1">Click "Copy for Gmail / Outlook"</div>
                  <p className="text-slate-400">Use our top bar button or the button above to copy the rich formatted table directly to your clipboard.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-xl bg-slate-950 p-3.5 border border-slate-800">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">2</span>
                <div>
                  <div className="font-semibold text-white mb-1">Navigate to Gmail Settings</div>
                  <p className="text-slate-400">In Gmail, click the <strong>Gear icon</strong> (top right) → <strong>See all settings</strong> → Scroll down on the <strong>General</strong> tab until you see <strong>Signature</strong>.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-xl bg-slate-950 p-3.5 border border-slate-800">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">3</span>
                <div>
                  <div className="font-semibold text-white mb-1">Create Signature & Paste</div>
                  <p className="text-slate-400">Click <strong>+ Create new</strong>, name it (e.g., <em>JAM 3D StitchWorks</em>), click inside the white box, and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-white font-mono">Ctrl+V</kbd> (Windows) or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-white font-mono">Cmd+V</kbd> (Mac).</p>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-xl bg-slate-950 p-3.5 border border-slate-800">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-400">4</span>
                <div>
                  <div className="font-semibold text-white mb-1">Set Signature Defaults & Save</div>
                  <p className="text-slate-400">Under <strong>Signature defaults</strong>, choose <em>JAM 3D StitchWorks</em> for "For new emails use" and "On reply/forward use". Scroll to the bottom of the page and click <strong>Save Changes</strong>.</p>
                </div>
              </li>
            </ol>
          </div>
        )}

        {/* MICROSOFT 365 / OUTLOOK WEB */}
        {activeClient === 'm365' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Deploying to Microsoft 365 & Outlook Web App (OWA)
              </h3>
              <a
                href="https://outlook.office.com/mail/options/mail/messageContent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline"
              >
                <span>Open Outlook Web Settings</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <ol className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-3 rounded-xl bg-slate-950 p-3.5 border border-slate-800">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">1</span>
                <div>
                  <div className="font-semibold text-white mb-1">Copy Rich Signature</div>
                  <p className="text-slate-400">Click <strong>Copy for Gmail / Outlook</strong> in this studio.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-xl bg-slate-950 p-3.5 border border-slate-800">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">2</span>
                <div>
                  <div className="font-semibold text-white mb-1">Open Signatures in Outlook Web</div>
                  <p className="text-slate-400">In Outlook Web (<a href="https://outlook.office.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">outlook.office.com</a> or <a href="https://outlook.live.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">outlook.live.com</a>), click the <strong>Gear icon</strong> (Settings) → <strong>Mail</strong> → <strong>Compose and reply</strong>.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-xl bg-slate-950 p-3.5 border border-slate-800">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">3</span>
                <div>
                  <div className="font-semibold text-white mb-1">Paste Signature</div>
                  <p className="text-slate-400">Select <strong>+ New signature</strong>, title it <em>JAM 3D StitchWorks</em>, click into the editor box, and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-white font-mono">Ctrl+V</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-white font-mono">Cmd+V</kbd>.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-xl bg-slate-950 p-3.5 border border-slate-800">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">4</span>
                <div>
                  <div className="font-semibold text-white mb-1">Save Configuration</div>
                  <p className="text-slate-400">Set the default signature for new messages and replies, then click <strong>Save</strong> at the bottom.</p>
                </div>
              </li>
            </ol>
          </div>
        )}

        {/* OUTLOOK WINDOWS DESKTOP */}
        {activeClient === 'outlook_win' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">
              Outlook for Windows Desktop (Office 365, 2016, 2019, 2021)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Method A */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase">
                  <span>Method 1: Direct In-App Paste</span>
                </div>
                <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside">
                  <li>Click <strong>Copy for Gmail / Outlook</strong>.</li>
                  <li>In Outlook, go to <strong>File</strong> → <strong>Options</strong> → <strong>Mail</strong> → <strong>Signatures...</strong></li>
                  <li>Click <strong>New</strong>, enter name, then click into the lower edit box.</li>
                  <li>Press <kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono">Ctrl+V</kbd>.</li>
                  <li>Assign it to your email account on the right, click <strong>OK</strong>.</li>
                </ol>
              </div>

              {/* Method B */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-emerald-400">Method 2: HTML File Drop (Pro)</span>
                  <button
                    type="button"
                    onClick={onDownloadHtml}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Download .html
                  </button>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  For the most pristine rendering, drop the downloaded <code className="text-slate-200">.htm</code> file into your Windows Signatures folder:
                </p>
                <div className="flex items-center gap-2 rounded bg-slate-900 p-2 border border-slate-800 text-[11px] font-mono text-cyan-300">
                  <span className="truncate">%appdata%\Microsoft\Signatures</span>
                  <button
                    type="button"
                    onClick={copyOutlookPath}
                    className="ml-auto text-slate-400 hover:text-white"
                    title="Copy path to clipboard"
                  >
                    {copiedFolder ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Press Win+R, paste the path, hit Enter, and place the file in this folder.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* OUTLOOK MAC */}
        {activeClient === 'outlook_mac' && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">
              Outlook for Mac (Microsoft 365 macOS)
            </h3>
            <ol className="space-y-2.5 text-xs text-slate-300 list-decimal list-inside">
              <li>Click <strong>Copy for Gmail / Outlook</strong> in this applet.</li>
              <li>In Outlook for Mac, go to <strong>Outlook</strong> menu (top bar) → <strong>Settings...</strong> (or <strong>Preferences...</strong>) → <strong>Signatures</strong>.</li>
              <li>Click the <strong>+</strong> button to create a new signature.</li>
              <li>Click inside the signature preview box and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-white font-mono">Cmd+V</kbd>.</li>
              <li>Select your account under "Choose default signature" and close the dialog.</li>
            </ol>
          </div>
        )}

        {/* APPLE MAIL */}
        {activeClient === 'apple_mail' && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white">
              Apple Mail (macOS & iPhone / iPad)
            </h3>
            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-3 text-xs text-slate-300">
              <div className="font-semibold text-white">On Mac:</div>
              <ol className="space-y-2 list-decimal list-inside text-slate-400">
                <li>Open <strong>Mail</strong> → <strong>Settings</strong> (or Preferences) → <strong>Signatures</strong>.</li>
                <li>Choose your email account on the left and click <strong>+</strong>.</li>
                <li><strong>Crucial step:</strong> Uncheck <em>"Always match my default message font"</em> at the bottom.</li>
                <li>Paste the signature into the text box with <kbd className="px-1 py-0.5 bg-slate-800 rounded font-mono">Cmd+V</kbd>.</li>
              </ol>

              <div className="font-semibold text-white pt-2 border-t border-slate-800">On iPhone / iPad:</div>
              <p className="text-slate-400">
                Send an email with your signature to your iPhone, copy the signature from the received message, navigate to <strong>Settings → Mail → Signature</strong>, paste it, and shake the phone to click "Undo Change Attributes" to retain full color formatting.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
