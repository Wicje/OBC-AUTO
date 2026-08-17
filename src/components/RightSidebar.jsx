import React from 'react';
import { Eye, Check, DollarSign, User, Package, Calendar, Share2, Sparkles, Copy, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateMarkdownBrief, generateColorPalette } from '../utils/briefGenerator';

export default function RightSidebar({ answers, onShowToast, onAutoFill }) {
  const company = answers.companyName || 'Apex Intelligence';
  const tagline = answers.tagline || 'Autonomous predictive engine for enterprise supply chain resilience.';
  const industry = answers.industry || 'B2B SaaS / Enterprise Tech';
  const budget = answers.budgetTier || 'Tier II: $10,000 - $25,000';
  const timeline = answers.timeline || '🚀 Standard Fast-Track (3-4 Weeks)';
  const colorVibe = answers.colorVibe || 'Electric Emerald & Cyber Mint';
  const deliverables = Array.isArray(answers.deliverables) ? answers.deliverables : [];
  const palette = generateColorPalette(colorVibe);

  const handleSubmitBrief = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    if (onShowToast) onShowToast('🚀 Brand Brief submitted to agency portal!');
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdownBrief(answers);
    navigator.clipboard.writeText(md);
    if (onShowToast) onShowToast('Brand Brief copied as Markdown!');
  };

  return (
    <div className="space-y-5 font-sans select-none">
      {/* Brand Profile Details Card (Matching Pinterest Reference 2 Right Column) */}
      <div className="glass-card p-6 space-y-5 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              {industry}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight font-['Space_Grotesk']">
            {company}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            "{tagline}"
          </p>
        </div>

        {/* Badges Row */}
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
            <Eye size={13} className="text-zinc-400" />
            <span>Public Brief</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
            <Check size={13} />
            <span>Intake Active</span>
          </span>
        </div>

        {/* Budget Allocation Highlight Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400 font-medium">Investment Allocation</p>
            <p className="text-sm font-extrabold text-white mt-0.5 font-['Space_Grotesk']">{budget.split('(')[0]}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            $
          </div>
        </div>

        {/* Admin Profile Row (Matching Amanda Smith in Pinterest Reference) */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-xs">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
              alt="Admin avatar"
              className="w-8 h-8 rounded-full object-cover border border-white/10 shadow-sm"
            />
            <div>
              <p className="font-bold text-white">Amanda Smith</p>
              <p className="text-[10px] text-zinc-400">Client Intake Director</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-zinc-300 font-medium">Admin</span>
        </div>

        {/* Metrics Breakdown List */}
        <div className="space-y-2.5 text-xs border-t border-white/10 pt-4">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <Package size={14} /> Scope Deliverables
            </span>
            <span className="font-bold text-white">{deliverables.length || 3} Assets</span>
          </div>

          <div className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-2">
              <Calendar size={14} /> Turnaround Time
            </span>
            <span className="font-semibold text-zinc-200">{timeline.split('(')[0]}</span>
          </div>
        </div>

        {/* Color Palette Swatches */}
        <div className="space-y-2 border-t border-white/10 pt-4">
          <p className="text-xs text-zinc-400 font-medium">Visual Direction Swatches:</p>
          <div className="flex items-center gap-2">
            {palette.map((hex, idx) => (
              <div 
                key={idx}
                className="flex-1 h-7 rounded-lg border border-white/10 transition-transform hover:scale-105 cursor-pointer shadow-sm"
                style={{ backgroundColor: hex }}
                title={`Copy ${hex}`}
                onClick={() => {
                  navigator.clipboard.writeText(hex);
                  if (onShowToast) onShowToast(`Copied ${hex}!`);
                }}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2.5">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold transition-all"
          >
            <Copy size={14} />
            <span>Copy Brief</span>
          </button>

          <button
            onClick={handleSubmitBrief}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-500/25"
          >
            <Share2 size={14} />
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
