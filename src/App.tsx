import React, { useState } from 'react';
import { Header } from './components/Header';
import { SignaturePreviewCard } from './components/SignaturePreviewCard';
import { SignatureControls } from './components/SignatureControls';
import { DeliverabilityChecklist } from './components/DeliverabilityChecklist';
import { DeploymentGuides } from './components/DeploymentGuides';
import { CodeInspector } from './components/CodeInspector';
import { CallTesterModal } from './components/CallTesterModal';
import { DEFAULT_SIGNATURE, SignatureData } from './types/signature';
import { generateSignatureHtml, generateSignaturePlainText } from './utils/signatureHtmlGenerator';
import { copyRichSignature, copyRawHtml, downloadSignatureHtml } from './utils/clipboardHelper';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

export default function App() {
  const [signatureData, setSignatureData] = useState<SignatureData>(DEFAULT_SIGNATURE);
  const [activeTab, setActiveTab] = useState<'preview' | 'audit' | 'guide' | 'code'>('preview');
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [copiedState, setCopiedState] = useState(false);
  const [copiedRawState, setCopiedRawState] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleCopyRich = async () => {
    const html = generateSignatureHtml(signatureData);
    const plain = generateSignaturePlainText(signatureData);
    const result = await copyRichSignature(html, plain);
    if (result.success) {
      setCopiedState(true);
      showToast('Rich signature copied! Ready to paste (Ctrl+V) into Gmail or Outlook.');
      setTimeout(() => setCopiedState(false), 3000);
    } else {
      showToast(result.message);
    }
  };

  const handleCopyRaw = async () => {
    const html = generateSignatureHtml(signatureData);
    const result = await copyRawHtml(html);
    if (result.success) {
      setCopiedRawState(true);
      showToast('Raw inline HTML source copied to clipboard!');
      setTimeout(() => setCopiedRawState(false), 3000);
    } else {
      showToast(result.message);
    }
  };

  const handleDownload = () => {
    const html = generateSignatureHtml(signatureData);
    downloadSignatureHtml(html, `JAM-3D-StitchWorks-Signature.html`);
    showToast('Signature file downloaded! Ready for Outlook Signatures folder.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCopyRich={handleCopyRich}
        onDownload={handleDownload}
        copiedState={copiedState}
      />

      {/* Main Content Viewport */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Banner with Direct Screenshot Match Confirmation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-cyan-500/20 bg-cyan-950/20 px-4 py-3 text-xs text-cyan-200">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>
              <strong>JAM 3D StitchWorks Production Signature:</strong> Formatted with inline CSS, click-to-call (<code className="text-cyan-300 font-mono">tel:</code>), and fluid mobile scaling.
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-cyan-300/80">
            <span>Microsoft 365 Verified</span>
            <span>·</span>
            <span>Gmail Safe</span>
            <span>·</span>
            <span>Outlook MSO Locked</span>
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === 'preview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Signature Editor Controls */}
            <div className="lg:col-span-5 space-y-4">
              <SignatureControls
                data={signatureData}
                onChange={setSignatureData}
              />
            </div>

            {/* Right Column: Live Interactive Mailbox Simulator */}
            <div className="lg:col-span-7 space-y-4">
              <SignaturePreviewCard
                signatureData={signatureData}
                onCopyRich={handleCopyRich}
                onCopyRaw={handleCopyRaw}
                onTestCall={() => setIsCallModalOpen(true)}
                onDownload={handleDownload}
                copiedState={copiedState}
                copiedRawState={copiedRawState}
              />
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <DeliverabilityChecklist signatureData={signatureData} />
        )}

        {activeTab === 'guide' && (
          <DeploymentGuides
            onCopyRich={handleCopyRich}
            onCopyRaw={handleCopyRaw}
            onDownloadHtml={handleDownload}
            copiedState={copiedState}
          />
        )}

        {activeTab === 'code' && (
          <CodeInspector
            signatureData={signatureData}
            onCopyRaw={handleCopyRaw}
            copiedRawState={copiedRawState}
          />
        )}
      </main>

      {/* Click-to-Call Interactive Verification Modal */}
      <CallTesterModal
        phone={signatureData.phone}
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900/95 px-4 py-3 text-xs text-white shadow-2xl backdrop-blur-md animate-bounce-subtle">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Quiet Footer */}
      <footer className="mt-16 border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">JAM 3D StitchWorks</span>
            <span>·</span>
            <span>Orders@jam3dstitchworks.com</span>
            <span>·</span>
            <span>(850) 730-1991</span>
          </div>
          <div>
            Cross-Platform Email Signature Engine · Compatible with Gmail, Microsoft 365, Outlook Windows, and Apple Mail
          </div>
        </div>
      </footer>
    </div>
  );
}
