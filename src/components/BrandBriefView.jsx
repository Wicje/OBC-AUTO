import React, { useState } from 'react';
import { Copy, Download, Printer, Share2, Check, Sparkles, Target, Package, Palette, FileText, Database } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateMarkdownBrief, generateColorPalette, synthesizePositioningStatement } from '../utils/briefGenerator';
import { submitIntakeToBackend } from '../utils/backendDocs';

export default function BrandBriefView({ answers, questions, onShowToast, onOpenBackendDocs }) {
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const company = answers.companyName || 'Apex Intelligence';
  const tagline = answers.tagline || 'Autonomous predictive engine for enterprise supply chain resilience.';
  const industry = answers.industry || 'B2B SaaS / Enterprise Tech';
  const target = answers.targetAudience || 'VP of Logistics & Chief Supply Chain Officers at Fortune 500 manufacturing firms.';
  const colorVibe = answers.colorVibe || 'Electric Emerald & Cyber Mint';
  const tone = Array.isArray(answers.toneOfVoice) ? answers.toneOfVoice : (answers.toneOfVoice ? [answers.toneOfVoice] : []);
  const deliverables = Array.isArray(answers.deliverables) ? answers.deliverables : (answers.deliverables ? [answers.deliverables] : []);
  const painPoints = Array.isArray(answers.customerPainPoints) ? answers.customerPainPoints : (answers.customerPainPoints ? [answers.customerPainPoints] : []);

  const palette = generateColorPalette(colorVibe);
  const positioning = synthesizePositioningStatement(answers);
  const markdownText = generateMarkdownBrief(answers);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownText);
    setCopied(true);
    if (onShowToast) onShowToast('Brand Brief copied as Markdown!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${company.toLowerCase().replace(/\s+/g, '-')}-brand-brief.md`;
    a.click();
    URL.revokeObjectURL(url);
    if (onShowToast) onShowToast('Downloaded Brand Brief (.md)!');
  };

  const handleDownloadJSON = () => {
    const payload = {
      meta: {
        generator: 'Automaton Intake Subsystem v3.0',
        generatedAt: new Date().toISOString()
      },
      answers,
      positioningStatement: positioning,
      colorSwatches: palette
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${company.toLowerCase().replace(/\s+/g, '-')}-intake.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (onShowToast) onShowToast('Downloaded brief JSON payload!');
  };

  const handleSubmitBrief = async () => {
    setSubmitting(true);
    const res = await submitIntakeToBackend(answers);
    setSubmitting(false);
    setSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    if (onShowToast) onShowToast(`🚀 Saved to PostgreSQL DB (${res.sessionId}) & notified agency lead!`);
  };

  return (
    <div className="space-y-6 font-sans text-gray-800">
      {/* Brief Header & Export Action Bar */}
      <div className="border-b border-gray-300/80 pb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#e11d48] text-white">
              {industry}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Live Executive Brief
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-['Plus_Jakarta_Sans']">
            {company}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 italic mt-0.5">
            "{tagline}"
          </p>
        </div>

        {/* Toolbar buttons */}
        <div className="no-print flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-white border border-gray-300 hover:border-gray-400 text-gray-800 transition-all shadow-sm active:scale-95"
            title="Copy Brief as Markdown"
          >
            {copied ? <Check size={14} className="text-[#e11d48]" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy .MD'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-white border border-gray-300 hover:border-gray-400 text-gray-800 transition-all shadow-sm active:scale-95"
            title="Download Markdown"
          >
            <Download size={14} />
            <span>.MD</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-white border border-gray-300 hover:border-gray-400 text-gray-800 transition-all shadow-sm active:scale-95"
            title="Download JSON Payload"
          >
            <Download size={14} />
            <span>JSON</span>
          </button>

          <button
            onClick={onOpenBackendDocs}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-all shadow-sm"
            title="How Backend Works"
          >
            <Database size={14} />
            <span>Backend Docs</span>
          </button>

          <button
            onClick={handleSubmitBrief}
            disabled={submitting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#e11d48] hover:bg-[#be123c] text-white transition-all shadow-lg shadow-red-500/20 active:scale-95"
          >
            <Share2 size={14} />
            <span>{submitting ? 'Saving to DB...' : submitted ? 'Submitted ✓' : 'Submit to Agency'}</span>
          </button>
        </div>
      </div>

      {/* 1. Strategic AI Positioning Statement Card */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#e11d48] uppercase tracking-wider">
          <Sparkles size={15} />
          <span>Strategic AI Positioning Synthesis</span>
        </div>
        <blockquote className="text-sm sm:text-base italic text-gray-900 leading-relaxed border-l-4 border-[#e11d48] pl-4 py-1 font-medium">
          "{positioning}"
        </blockquote>
      </div>

      {/* 2. Target Persona & Customer Pain Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Persona */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#e11d48] uppercase tracking-wider">
            <Target size={15} />
            <span>Target Persona & Audience</span>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed font-medium">
            {target}
          </p>
        </div>

        {/* Pain Points */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#e11d48] uppercase tracking-wider">
            <Package size={15} />
            <span>Core Pain Points Solved</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {painPoints.length > 0 ? (
              painPoints.map((pt) => (
                <span key={pt} className="px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold text-gray-800">
                  • {pt}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500 italic">No pain points specified.</span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Visual Palette & Brand Tone Spectrum */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#e11d48] uppercase tracking-wider">
            <Palette size={15} />
            <span>Visual Color Direction</span>
          </div>
          <span className="text-xs text-gray-500 font-semibold">
            {colorVibe}
          </span>
        </div>

        {/* Color Palette Swatches */}
        <div className="grid grid-cols-5 gap-3">
          {palette.map((colorHex, idx) => (
            <div 
              key={idx} 
              className="group relative cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(colorHex);
                if (onShowToast) onShowToast(`Copied swatch ${colorHex}!`);
              }}
            >
              <div 
                className="h-14 rounded-xl border border-gray-300 shadow-sm transition-transform group-hover:scale-105"
                style={{ backgroundColor: colorHex }}
              />
              <p className="text-[11px] text-center text-gray-600 mt-1.5 font-mono font-bold">
                {colorHex}
              </p>
            </div>
          ))}
        </div>

        {/* Tone Attributes */}
        <div className="pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 font-medium mb-2">Tone of Voice Attributes:</p>
          <div className="flex flex-wrap gap-2">
            {tone.length > 0 ? (
              tone.map((t) => (
                <span key={t} className="px-3.5 py-1.5 rounded-full bg-red-50 text-[#e11d48] border border-red-200 text-xs font-bold shadow-xs">
                  ⚡ {t}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-500 italic">Pending intake responses...</span>
            )}
          </div>
        </div>
      </div>

      {/* 4. Scope & Deliverables Checklist */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#e11d48] uppercase tracking-wider">
            <FileText size={15} />
            <span>Project Scope & Deliverables</span>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-bold text-gray-800">
            {answers.timeline || '3 - 4 Weeks'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {deliverables.length > 0 ? (
            deliverables.map((deliv, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800">
                <div className="w-5 h-5 rounded-full bg-[#e11d48] text-white flex items-center justify-center text-xs font-black shadow-xs">
                  ✓
                </div>
                <span>{deliv}</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 italic col-span-2">No deliverables selected.</p>
          )}
        </div>
      </div>
    </div>
  );
}
