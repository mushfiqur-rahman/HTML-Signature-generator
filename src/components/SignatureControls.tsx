import React, { useState } from 'react';
import {
  Layout,
  User,
  Image as ImageIcon,
  Palette,
  Phone,
  RotateCcw,
  Sparkles,
  Check,
  Smartphone,
  Share2,
  QrCode,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sliders,
  Globe,
  Instagram,
  Facebook,
  Link as LinkIcon,
  Sun,
  Moon,
  Type
} from 'lucide-react';
import {
  SignatureData,
  SignatureLayout,
  SafeFont,
  FontSizeScale,
  Alignment,
  ThemeMode
} from '../types/signature';
import { cleanPhoneNumber, PROFESSIONAL_FONTS } from '../utils/signatureHtmlGenerator';

interface SignatureControlsProps {
  data: SignatureData;
  onChange: (newData: SignatureData) => void;
}

export const SignatureControls: React.FC<SignatureControlsProps> = ({ data, onChange }) => {
  const [activeCategory, setActiveCategory] = useState<
    'content' | 'socials' | 'qrcode' | 'alignment' | 'colors' | 'logo' | 'preset'
  >('content');

  const updateField = <K extends keyof SignatureData>(field: K, value: SignatureData[K]) => {
    onChange({ ...data, [field]: value });
  };

  // Toggle between White and Dark mode with appropriate high-contrast presets
  const switchBackgroundMode = (mode: 'dark' | 'white') => {
    if (mode === 'white') {
      onChange({
        ...data,
        themeMode: 'white',
        backgroundColor: '#FFFFFF',
        textColor: '#1E293B',
        nameColor: '#0F172A',
        companyColor: '#0284C7',
        taglineColor: '#64748B',
        labelColor: '#334155',
        accentColor: '#0284C7',
        dividerColor: '#0284C7',
        qrCodeColor: '000000',
        qrCodeBgColor: 'ffffff',
      });
    } else {
      onChange({
        ...data,
        themeMode: 'dark',
        backgroundColor: '#121212',
        textColor: '#FFFFFF',
        nameColor: '#FFFFFF',
        companyColor: '#FFFFFF',
        taglineColor: '#94A3B8',
        labelColor: '#FFFFFF',
        accentColor: '#38BDF8',
        dividerColor: '#38BDF8',
        qrCodeColor: '000000',
        qrCodeBgColor: 'ffffff',
      });
    }
  };

  // Set all line alignments at once
  const setAllAlignments = (align: Alignment) => {
    onChange({
      ...data,
      globalAlignment: align,
      closingAlign: align,
      namesAlign: align,
      companyAlign: align,
      taglineAlign: align,
      contactAlign: align,
      logoAlignment: align,
      socialsAlign: align,
      qrAlign: align,
      disclaimerAlign: align,
    });
  };

  const presetLayouts: { id: SignatureLayout; title: string; desc: string; tag: string }[] = [
    {
      id: 'vertical_screenshot',
      title: 'Exact Screenshot Match',
      desc: 'Vertical stack as shown in user reference with bold names & bottom logo.',
      tag: 'Faithful Match',
    },
    {
      id: 'side_by_side',
      title: 'Executive Dual-Column',
      desc: 'Logo and QR code on left with vertical divider line, contacts on right.',
      tag: 'Modern B2B',
    },
    {
      id: 'modern_compact',
      title: 'Embroidered Stitch Bar',
      desc: 'Horizontal header bar with compact inline contact row for quick replies.',
      tag: 'Compact',
    },
    {
      id: 'minimalist',
      title: 'Minimalist Sign-off',
      desc: 'Streamlined text dividers with subtle logo & social branding.',
      tag: 'Streamlined',
    },
  ];

  return (
    <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl overflow-hidden">
      {/* Background Style Toggle & Professional Font Selector Quick Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-950 px-4 py-2.5">
        {/* White vs Dark Mode Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Background:</span>
          <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
            <button
              type="button"
              onClick={() => switchBackgroundMode('white')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                data.themeMode === 'white' || data.backgroundColor === '#FFFFFF'
                  ? 'bg-white text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="h-3.5 w-3.5 text-amber-500" />
              <span>White Mode</span>
            </button>
            <button
              type="button"
              onClick={() => switchBackgroundMode('dark')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                data.themeMode === 'dark' || data.backgroundColor === '#121212'
                  ? 'bg-slate-800 text-amber-300 font-bold shadow-sm ring-1 ring-amber-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* Professional Font Dropdown */}
        <div className="flex items-center gap-2">
          <Type className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <span className="text-xs text-slate-400 hidden sm:inline">Font:</span>
          <select
            value={data.fontFamily}
            onChange={(e) => updateField('fontFamily', e.target.value as SafeFont)}
            title="Select Professional Email Font Family"
            className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-white focus:border-cyan-500 focus:outline-none cursor-pointer max-w-[210px] truncate"
          >
            <optgroup label="Professional Sans-Serif">
              {Object.entries(PROFESSIONAL_FONTS)
                .filter(([_, opt]) => opt.category === 'Sans-Serif')
                .map(([key, opt]) => (
                  <option key={key} value={key}>
                    {opt.label}
                  </option>
                ))}
            </optgroup>
            <optgroup label="Executive Serif">
              {Object.entries(PROFESSIONAL_FONTS)
                .filter(([_, opt]) => opt.category === 'Serif')
                .map(([key, opt]) => (
                  <option key={key} value={key}>
                    {opt.label}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/70 p-1.5 overflow-x-auto gap-1">
        <button
          type="button"
          onClick={() => setActiveCategory('content')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
            activeCategory === 'content'
              ? 'bg-slate-800 text-cyan-300 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="h-3.5 w-3.5" />
          <span>Text & Details</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('alignment')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
            activeCategory === 'alignment'
              ? 'bg-slate-800 text-cyan-300 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <AlignCenter className="h-3.5 w-3.5 text-amber-400" />
          <span>Move Lines (L/C/R)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('socials')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
            activeCategory === 'socials'
              ? 'bg-slate-800 text-cyan-300 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Share2 className="h-3.5 w-3.5 text-pink-400" />
          <span>Social Profiles</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('qrcode')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
            activeCategory === 'qrcode'
              ? 'bg-slate-800 text-cyan-300 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <QrCode className="h-3.5 w-3.5 text-emerald-400" />
          <span>QR Generator</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('colors')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
            activeCategory === 'colors'
              ? 'bg-slate-800 text-cyan-300 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="h-3.5 w-3.5 text-purple-400" />
          <span>Colors</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('logo')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
            activeCategory === 'logo'
              ? 'bg-slate-800 text-cyan-300 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ImageIcon className="h-3.5 w-3.5 text-cyan-400" />
          <span>Logo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveCategory('preset')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
            activeCategory === 'preset'
              ? 'bg-slate-800 text-cyan-300 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layout className="h-3.5 w-3.5 text-blue-400" />
          <span>Layout</span>
        </button>
      </div>

      {/* Panels Body */}
      <div className="p-5 space-y-5 max-h-[640px] overflow-y-auto">
        {/* 1. TEXT & DETAILS (100% DYNAMIC, NO FIXED LABELS) */}
        {activeCategory === 'content' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Dynamic Content & Editable Labels</h3>
              <p className="text-xs text-slate-400">All fields and labels are 100% editable. No fixed text.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Sign-off / Closing Line</label>
                <input
                  type="text"
                  value={data.closing}
                  onChange={(e) => updateField('closing', e.target.value)}
                  placeholder="e.g. Sincerely, or Best regards,"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Sender Name(s)</label>
                <input
                  type="text"
                  value={data.names}
                  onChange={(e) => updateField('names', e.target.value)}
                  placeholder="e.g. Jason And Marcie"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Company / Brand Name</label>
              <input
                type="text"
                value={data.company}
                onChange={(e) => updateField('company', e.target.value)}
                placeholder="e.g. JAM 3D StitchWorks"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Editable Contact Fields & Custom Labels */}
            <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/80 p-3.5">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-300">Contact Channels</span>
                <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.showLabels}
                    onChange={(e) => updateField('showLabels', e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-900 text-cyan-500"
                  />
                  <span>Show Prefix Labels</span>
                </label>
              </div>

              {/* Email */}
              <div className="grid grid-cols-12 gap-2 items-center">
                {data.showLabels && (
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={data.emailLabel}
                      onChange={(e) => updateField('emailLabel', e.target.value)}
                      placeholder="Email:"
                      title="Editable Email Label"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                )}
                <div className={data.showLabels ? 'col-span-9' : 'col-span-12'}>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="Orders@jam3dstitchworks.com"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="grid grid-cols-12 gap-2 items-center">
                {data.showLabels && (
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={data.websiteLabel}
                      onChange={(e) => updateField('websiteLabel', e.target.value)}
                      placeholder="Web:"
                      title="Editable Web Label"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                )}
                <div className={data.showLabels ? 'col-span-9' : 'col-span-12'}>
                  <input
                    type="text"
                    value={data.website}
                    onChange={(e) => {
                      updateField('website', e.target.value);
                      const clean = e.target.value.startsWith('http') ? e.target.value : `https://${e.target.value}`;
                      updateField('websiteUrl', clean);
                    }}
                    placeholder="www.jam3dstitchworks.com"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone / Click-to-call */}
              <div className="grid grid-cols-12 gap-2 items-center">
                {data.showLabels && (
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={data.phoneLabel}
                      onChange={(e) => updateField('phoneLabel', e.target.value)}
                      placeholder="Phone:"
                      title="Editable Phone Label"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                )}
                <div className={data.showLabels ? 'col-span-9' : 'col-span-12'}>
                  <input
                    type="text"
                    value={data.phone}
                    onChange={(e) => {
                      updateField('phone', e.target.value);
                      updateField('phoneRaw', cleanPhoneNumber(e.target.value));
                    }}
                    placeholder="(850) 730-1991"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white font-mono placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Optional Tagline & Disclaimer */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.includeTagline}
                  onChange={(e) => updateField('includeTagline', e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-900 text-cyan-500"
                />
                <span>Add Subtitle / Tagline</span>
              </label>
              {data.includeTagline && (
                <input
                  type="text"
                  value={data.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  placeholder="Custom Embroidery & 3D Stitching Specialists"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.includeDisclaimer}
                  onChange={(e) => updateField('includeDisclaimer', e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-slate-700 bg-slate-900 text-cyan-500"
                />
                <span>Add Confidentiality Disclaimer</span>
              </label>
              {data.includeDisclaimer && (
                <textarea
                  rows={2}
                  value={data.disclaimerText}
                  onChange={(e) => updateField('disclaimerText', e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                />
              )}
            </div>
          </div>
        )}

        {/* 2. MOVE LINES (LEFT, CENTER, RIGHT ALIGNMENT) */}
        {activeCategory === 'alignment' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Line-by-Line Alignment Engine</h3>
              <p className="text-xs text-slate-400">Move every single line independently to Left, Center, or Right.</p>
            </div>

            {/* Quick 1-Click Master Alignment */}
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-200">Set All Lines At Once:</span>
                <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setAllAlignments('left')}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <AlignLeft className="h-3 w-3" />
                    <span>All Left</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAllAlignments('center')}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <AlignCenter className="h-3 w-3" />
                    <span>All Center</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAllAlignments('right')}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <AlignRight className="h-3 w-3" />
                    <span>All Right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Granular Individual Controls */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Individual Line Controls:
              </span>

              {/* Closing Line */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-950">
                <span className="text-xs text-slate-300">1. Closing Line ("{data.closing}")</span>
                <div className="flex rounded bg-slate-900 p-0.5 border border-slate-800">
                  {(['left', 'center', 'right'] as Alignment[]).map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => updateField('closingAlign', align)}
                      className={`px-2 py-1 text-[11px] rounded capitalize transition-colors ${
                        data.closingAlign === align ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sender Names */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-950">
                <span className="text-xs text-slate-300">2. Sender Names ("{data.names}")</span>
                <div className="flex rounded bg-slate-900 p-0.5 border border-slate-800">
                  {(['left', 'center', 'right'] as Alignment[]).map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => updateField('namesAlign', align)}
                      className={`px-2 py-1 text-[11px] rounded capitalize transition-colors ${
                        data.namesAlign === align ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company Name */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-950">
                <span className="text-xs text-slate-300">3. Company Name ("{data.company}")</span>
                <div className="flex rounded bg-slate-900 p-0.5 border border-slate-800">
                  {(['left', 'center', 'right'] as Alignment[]).map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => updateField('companyAlign', align)}
                      className={`px-2 py-1 text-[11px] rounded capitalize transition-colors ${
                        data.companyAlign === align ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-950">
                <span className="text-xs text-slate-300">4. Contact Channels (Email, Web, Phone)</span>
                <div className="flex rounded bg-slate-900 p-0.5 border border-slate-800">
                  {(['left', 'center', 'right'] as Alignment[]).map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => updateField('contactAlign', align)}
                      className={`px-2 py-1 text-[11px] rounded capitalize transition-colors ${
                        data.contactAlign === align ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Media Row */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-950">
                <span className="text-xs text-slate-300">5. Social Media Icons Row</span>
                <div className="flex rounded bg-slate-900 p-0.5 border border-slate-800">
                  {(['left', 'center', 'right'] as Alignment[]).map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => updateField('socialsAlign', align)}
                      className={`px-2 py-1 text-[11px] rounded capitalize transition-colors ${
                        data.socialsAlign === align ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo Alignment */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-950">
                <span className="text-xs text-slate-300">6. Brand Logo Image</span>
                <div className="flex rounded bg-slate-900 p-0.5 border border-slate-800">
                  {(['left', 'center', 'right'] as Alignment[]).map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => updateField('logoAlignment', align)}
                      className={`px-2 py-1 text-[11px] rounded capitalize transition-colors ${
                        data.logoAlignment === align ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              {/* QR Code */}
              <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800 bg-slate-950">
                <span className="text-xs text-slate-300">7. QR Code Block</span>
                <div className="flex rounded bg-slate-900 p-0.5 border border-slate-800">
                  {(['left', 'center', 'right'] as Alignment[]).map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => updateField('qrAlign', align)}
                      className={`px-2 py-1 text-[11px] rounded capitalize transition-colors ${
                        data.qrAlign === align ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SOCIAL MEDIA PROFILES (NEW SECTION) */}
        {activeCategory === 'socials' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Social Media Profile Links</h3>
                <p className="text-xs text-slate-400">Rendered as high-resolution email-safe icon buttons.</p>
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.includeSocials}
                  onChange={(e) => updateField('includeSocials', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-cyan-500"
                />
                <span>Enable Socials</span>
              </label>
            </div>

            {data.includeSocials && (
              <div className="space-y-3">
                {/* Instagram */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 mb-1">
                    <Instagram className="h-4 w-4" />
                    <span>Instagram Profile Link</span>
                  </div>
                  <input
                    type="url"
                    value={data.socialInstagram}
                    onChange={(e) => updateField('socialInstagram', e.target.value)}
                    placeholder="https://instagram.com/jam3dstitchworks"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Facebook */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1">
                    <Facebook className="h-4 w-4" />
                    <span>Facebook Page Link</span>
                  </div>
                  <input
                    type="url"
                    value={data.socialFacebook}
                    onChange={(e) => updateField('socialFacebook', e.target.value)}
                    placeholder="https://facebook.com/jam3dstitchworks"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* TikTok */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
                    <Share2 className="h-4 w-4" />
                    <span>TikTok / Reels Link (Optional)</span>
                  </div>
                  <input
                    type="url"
                    value={data.socialTiktok}
                    onChange={(e) => updateField('socialTiktok', e.target.value)}
                    placeholder="https://tiktok.com/@jam3dstitchworks"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Direct Shop Link */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
                    <Globe className="h-4 w-4" />
                    <span>Online Store Link (Optional)</span>
                  </div>
                  <input
                    type="url"
                    value={data.socialShop}
                    onChange={(e) => updateField('socialShop', e.target.value)}
                    placeholder="https://jam3dstitchworks.com/collections/all"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Icon Size Slider */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                    <span>Icon Display Size: {data.socialIconSize}px</span>
                    <span className="text-slate-500">Email Standard: 22px</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="32"
                    step="2"
                    value={data.socialIconSize}
                    onChange={(e) => updateField('socialIconSize', Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. QR CODE GENERATOR (NEW SECTION) */}
        {activeCategory === 'qrcode' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">QR Code Generator</h3>
                <p className="text-xs text-slate-400">Generates a live scannable QR code embedded in the HTML.</p>
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.includeQrCode}
                  onChange={(e) => updateField('includeQrCode', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-cyan-500"
                />
                <span>Include QR Code</span>
              </label>
            </div>

            {data.includeQrCode && (
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-300">Destination Website URL</label>
                    <button
                      type="button"
                      onClick={() => updateField('qrCodeUrl', 'https://www.jam3dstitchworks.com')}
                      className="text-[11px] text-cyan-400 hover:underline"
                    >
                      Use StitchWorks Website
                    </button>
                  </div>
                  <input
                    type="url"
                    value={data.qrCodeUrl}
                    onChange={(e) => updateField('qrCodeUrl', e.target.value)}
                    placeholder="https://www.jam3dstitchworks.com"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">QR Code Subtitle / Caption</label>
                  <input
                    type="text"
                    value={data.qrCodeCaption}
                    onChange={(e) => updateField('qrCodeCaption', e.target.value)}
                    placeholder="Scan to visit shop & order"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* QR Size Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                    <span>QR Code Render Size: {data.qrCodeSize}px</span>
                    <span className="text-slate-500">Recommended: 70px–80px</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="120"
                    step="5"
                    value={data.qrCodeSize}
                    onChange={(e) => updateField('qrCodeSize', Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Live QR Image Preview */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex items-center gap-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data.qrCodeUrl || 'https://www.jam3dstitchworks.com')}&color=000000&bgcolor=ffffff`}
                    alt="StitchWorks QR Preview"
                    className="w-16 h-16 rounded border border-slate-700 bg-white p-1"
                  />
                  <div className="text-xs text-slate-300 space-y-1">
                    <div className="font-semibold text-white">Live Dynamic QR Active</div>
                    <p className="text-[11px] text-slate-400">
                      When recipients scan this with an iPhone or Android camera, it opens <strong className="text-cyan-300">{data.qrCodeUrl}</strong> directly.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. DYNAMIC COLOR PICKERS */}
        {activeCategory === 'colors' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Dynamic Color Customizer</h3>
              <p className="text-xs text-slate-400">Change every color dynamically with live hex and palette pickers.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Background Color */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">Background Color</label>
                  <input
                    type="color"
                    value={data.backgroundColor.startsWith('#') ? data.backgroundColor : '#121212'}
                    onChange={(e) => updateField('backgroundColor', e.target.value)}
                    className="h-6 w-6 rounded border-0 cursor-pointer bg-transparent"
                  />
                </div>
                <input
                  type="text"
                  value={data.backgroundColor}
                  onChange={(e) => updateField('backgroundColor', e.target.value)}
                  className="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white font-mono"
                />
              </div>

              {/* Primary Text / Closing Color */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">Closing & Body Text</label>
                  <input
                    type="color"
                    value={data.textColor.startsWith('#') ? data.textColor : '#FFFFFF'}
                    onChange={(e) => updateField('textColor', e.target.value)}
                    className="h-6 w-6 rounded border-0 cursor-pointer bg-transparent"
                  />
                </div>
                <input
                  type="text"
                  value={data.textColor}
                  onChange={(e) => updateField('textColor', e.target.value)}
                  className="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white font-mono"
                />
              </div>

              {/* Sender Name Color */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">Sender Names Color</label>
                  <input
                    type="color"
                    value={data.nameColor.startsWith('#') ? data.nameColor : '#FFFFFF'}
                    onChange={(e) => updateField('nameColor', e.target.value)}
                    className="h-6 w-6 rounded border-0 cursor-pointer bg-transparent"
                  />
                </div>
                <input
                  type="text"
                  value={data.nameColor}
                  onChange={(e) => updateField('nameColor', e.target.value)}
                  className="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white font-mono"
                />
              </div>

              {/* Company Color */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">Company Name Color</label>
                  <input
                    type="color"
                    value={data.companyColor.startsWith('#') ? data.companyColor : '#FFFFFF'}
                    onChange={(e) => updateField('companyColor', e.target.value)}
                    className="h-6 w-6 rounded border-0 cursor-pointer bg-transparent"
                  />
                </div>
                <input
                  type="text"
                  value={data.companyColor}
                  onChange={(e) => updateField('companyColor', e.target.value)}
                  className="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white font-mono"
                />
              </div>

              {/* Link / Accent Color */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">Link / Accent Color</label>
                  <input
                    type="color"
                    value={data.accentColor.startsWith('#') ? data.accentColor : '#38BDF8'}
                    onChange={(e) => updateField('accentColor', e.target.value)}
                    className="h-6 w-6 rounded border-0 cursor-pointer bg-transparent"
                  />
                </div>
                <input
                  type="text"
                  value={data.accentColor}
                  onChange={(e) => updateField('accentColor', e.target.value)}
                  className="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white font-mono"
                />
              </div>

              {/* Divider Line Color */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">Divider & Border Color</label>
                  <input
                    type="color"
                    value={data.dividerColor.startsWith('#') ? data.dividerColor : '#38BDF8'}
                    onChange={(e) => updateField('dividerColor', e.target.value)}
                    className="h-6 w-6 rounded border-0 cursor-pointer bg-transparent"
                  />
                </div>
                <input
                  type="text"
                  value={data.dividerColor}
                  onChange={(e) => updateField('dividerColor', e.target.value)}
                  className="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-white font-mono"
                />
              </div>
            </div>

            {/* Quick 1-Click Themes */}
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-2">Preset Quick Themes</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => switchBackgroundMode('dark')}
                  className="p-2.5 rounded-lg border border-slate-800 bg-black text-left text-xs text-white hover:border-cyan-500 transition-colors"
                >
                  <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                    <Moon className="h-3.5 w-3.5" />
                    <span>Dark Screenshot Match</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">#121212 background with cyan links</div>
                </button>

                <button
                  type="button"
                  onClick={() => switchBackgroundMode('white')}
                  className="p-2.5 rounded-lg border border-slate-300 bg-white text-left text-xs text-slate-900 hover:border-blue-500 transition-colors"
                >
                  <div className="font-semibold text-blue-600 flex items-center gap-1.5">
                    <Sun className="h-3.5 w-3.5 text-amber-500" />
                    <span>White Mailbox Clean</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Pure white background with royal blue links</div>
                </button>
              </div>
            </div>

            {/* Professional Email Fonts Dropdown */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-white mb-1">
                  Professional Cross-Platform Font Family
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  Applies strict inline CSS font-family rules to prevent Outlook and Gmail from defaulting to Times New Roman.
                </p>
                <select
                  value={data.fontFamily}
                  onChange={(e) => updateField('fontFamily', e.target.value as SafeFont)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none cursor-pointer"
                >
                  <optgroup label="Professional Sans-Serif (Modern & Clean)">
                    {Object.entries(PROFESSIONAL_FONTS)
                      .filter(([_, opt]) => opt.category === 'Sans-Serif')
                      .map(([key, opt]) => (
                        <option key={key} value={key}>
                          {opt.label}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Executive Serif (Formal & Editorial)">
                    {Object.entries(PROFESSIONAL_FONTS)
                      .filter(([_, opt]) => opt.category === 'Serif')
                      .map(([key, opt]) => (
                        <option key={key} value={key}>
                          {opt.label}
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>

              {/* Font Size Scale */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                  <span className="font-medium">Font Sizing Scale</span>
                  <span className="text-slate-500 capitalize">{data.fontSize}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['compact', 'normal', 'comfortable'] as FontSizeScale[]).map((scale) => (
                    <button
                      key={scale}
                      type="button"
                      onClick={() => updateField('fontSize', scale)}
                      className={`rounded-lg py-1.5 text-xs font-medium capitalize border transition-colors ${
                        data.fontSize === scale
                          ? 'border-cyan-500 bg-cyan-950/30 text-cyan-300 font-bold'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. LOGO & RESIZING */}
        {activeCategory === 'logo' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Logo Asset & Dimensions</h3>
                <p className="text-xs text-slate-400">Configure image link, size, and Outlook Word-engine scaling.</p>
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.showLogo}
                  onChange={(e) => updateField('showLogo', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-cyan-500"
                />
                <span>Show Logo</span>
              </label>
            </div>

            {data.showLogo && (
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-300">Logo Image URL</label>
                    <button
                      type="button"
                      onClick={() => updateField('logoUrl', 'https://jam3dstitchworks.com/cdn/shop/files/2_Jam_e60105c2-2255-4fbc-bcbf-5b18191efc48.png')}
                      className="text-[11px] text-cyan-400 hover:underline"
                    >
                      Reset to Official JAM 3D Link
                    </button>
                  </div>
                  <input
                    type="url"
                    value={data.logoUrl}
                    onChange={(e) => updateField('logoUrl', e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                    <span>Width Lock: {data.logoWidth}px</span>
                    <span className="text-slate-500">Mobile Fluid Auto-Scales</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="240"
                    step="5"
                    value={data.logoWidth}
                    onChange={(e) => updateField('logoWidth', Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Logo Hyperlink Target</label>
                  <input
                    type="url"
                    value={data.logoLinkUrl}
                    onChange={(e) => updateField('logoLinkUrl', e.target.value)}
                    placeholder="https://www.jam3dstitchworks.com"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* 7. LAYOUT PRESETS */}
        {activeCategory === 'preset' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Layout Structure</h3>
              <p className="text-xs text-slate-400">Choose between vertical stack, side-by-side, or compact rows.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {presetLayouts.map((preset) => {
                const isSelected = data.layout === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => updateField('layout', preset.id)}
                    className={`flex flex-col text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-950/30 shadow-md ring-1 ring-cyan-500/50'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-white">{preset.title}</span>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {preset.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
                      {preset.desc}
                    </p>
                    {isSelected && (
                      <div className="mt-auto flex items-center gap-1 text-[11px] text-cyan-400 font-semibold pt-1 border-t border-slate-800">
                        <Check className="h-3 w-3" />
                        <span>Active Layout</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
