import React from 'react';
import { Home, FileText, Users, Tag, Volume2, VolumeX, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  onSelectTab, 
  isMuted, 
  onToggleSound, 
  onOpenPresets, 
  onOpenHelp,
  answersCount,
  totalQuestions 
}) {
  const progressPct = Math.round(((answersCount || 0) / (totalQuestions || 13)) * 100);

  return (
    <aside className="no-print w-64 bg-[#10121a] border-r border-white/10 p-5 flex flex-col justify-between shrink-0 select-none z-20 font-sans shadow-2xl">
      {/* Top Section: App Brand & Navigation */}
      <div className="space-y-7">
        {/* App Logo */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-lg shadow-emerald-500/20">
            ⚡
          </div>
          <div>
            <h1 className="font-extrabold text-base text-white tracking-tight font-['Space_Grotesk'] leading-none">
              Automaton
            </h1>
            <p className="text-[11px] text-zinc-400 font-medium mt-1">Intake Dashboard</p>
          </div>
        </div>

        {/* Progress Bar Badge */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 font-medium">Intake Progress</span>
            <span className="text-emerald-400 font-bold font-mono">{progressPct}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 shadow-sm"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5 text-xs font-medium">
          <button
            onClick={() => onSelectTab('questionnaire')}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
              activeTab === 'questionnaire'
                ? 'bg-gradient-to-r from-white/15 to-white/5 text-white font-semibold shadow-md border border-white/10'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <Home size={17} className={activeTab === 'questionnaire' ? 'text-emerald-400' : ''} />
              <span>Live Questionnaire</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-mono font-bold">
              {answersCount}/{totalQuestions}
            </span>
          </button>

          <button
            onClick={() => onSelectTab('brief')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
              activeTab === 'brief'
                ? 'bg-gradient-to-r from-white/15 to-white/5 text-white font-semibold shadow-md border border-white/10'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText size={17} className={activeTab === 'brief' ? 'text-emerald-400' : ''} />
            <span>Brand Brief</span>
          </button>

          <button
            onClick={onOpenPresets}
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-3">
              <Users size={17} />
              <span>Client Presets</span>
            </div>
            <Sparkles size={14} className="text-amber-400 animate-pulse" />
          </button>

          <button
            onClick={() => onSelectTab('deliverables')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
              activeTab === 'deliverables'
                ? 'bg-gradient-to-r from-white/15 to-white/5 text-white font-semibold shadow-md border border-white/10'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tag size={17} className={activeTab === 'deliverables' ? 'text-emerald-400' : ''} />
            <span>Deliverables Scope</span>
          </button>
        </nav>
      </div>

      {/* Bottom Section: Controls & User Profile (Matching Pinterest Reference) */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        {/* Audio SFX & Help Toggle */}
        <div className="flex items-center justify-between px-2 text-xs text-zinc-400">
          <button 
            onClick={onToggleSound} 
            className="flex items-center gap-2 hover:text-white transition-colors"
            title={isMuted ? "Unmute Audio SFX" : "Mute SFX"}
          >
            {!isMuted ? <Volume2 size={15} className="text-emerald-400" /> : <VolumeX size={15} />}
            <span>Sound SFX</span>
          </button>

          <button 
            onClick={onOpenHelp} 
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <HelpCircle size={15} />
            <span>Guide</span>
          </button>
        </div>

        {/* User Profile Badge (Matching `James Gandolfini` from Pinterest Reference) */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.03] border border-white/5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
              alt="User avatar"
              className="w-9 h-9 rounded-full object-cover border border-white/10 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#10121a]" />
          </div>
          <div className="truncate text-xs">
            <p className="font-bold text-white truncate">James Gandolfini</p>
            <p className="text-[10px] text-zinc-400 truncate">Onboarding Director</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
