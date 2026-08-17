import React from 'react';
import { Terminal, FileText, Monitor, Volume2, VolumeX, Sparkles, Eye, HelpCircle } from 'lucide-react';
import { THEMES } from '../data/questions';

export default function Header({ 
  currentTheme, 
  onThemeChange, 
  layoutMode, 
  onLayoutChange, 
  isMuted, 
  onToggleSound, 
  crtEnabled, 
  onToggleCrt, 
  onOpenPresets,
  onOpenHelp,
  completedCount,
  totalCount
}) {
  const contextUsed = Math.round(((completedCount || 0) / (totalCount || 13)) * 100);

  return (
    <header className="no-print border-b border-[var(--border-color)] bg-[var(--bg-term)] px-4 py-2.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 font-mono shadow-lg">
      {/* Left: Brand & Context Status (Matching Pinterest Reference style) */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[var(--accent-color)] text-sm font-bold animate-pulse">⬢</span>
          <h1 className="font-bold text-sm text-[var(--text-main)] tracking-tight">
            AUTOMATON CLI
          </h1>
          <span className="text-[var(--text-muted)]">·</span>
          <span className="text-xs text-[var(--text-dim)] font-medium">
            {contextUsed}% context used
          </span>
          <span className="text-[var(--text-muted)]">·</span>
          <span className="text-xs text-[var(--text-dim)] hidden sm:inline">
            {completedCount} files committed
          </span>
        </div>
      </div>

      {/* Middle: Layout Selector */}
      <div className="flex items-center gap-1 bg-[var(--bg-card)] p-1 rounded-md border border-[var(--border-color)]">
        <button
          onClick={() => onLayoutChange('split')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all ${
            layoutMode === 'split' 
              ? 'bg-[var(--border-color)] text-[var(--accent-color)] font-bold border border-[var(--border-focus)]' 
              : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'
          }`}
          title="Split View: Terminal + Live Brief"
        >
          <Monitor size={13} />
          <span className="hidden md:inline">Split</span>
        </button>

        <button
          onClick={() => onLayoutChange('terminal')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all ${
            layoutMode === 'terminal' 
              ? 'bg-[var(--border-color)] text-[var(--accent-color)] font-bold border border-[var(--border-focus)]' 
              : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'
          }`}
          title="Terminal Focus"
        >
          <Terminal size={13} />
          <span className="hidden md:inline">Terminal</span>
        </button>

        <button
          onClick={() => onLayoutChange('brief')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all ${
            layoutMode === 'brief' 
              ? 'bg-[var(--border-color)] text-[var(--accent-color)] font-bold border border-[var(--border-focus)]' 
              : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'
          }`}
          title="Live Brief Focus"
        >
          <FileText size={13} />
          <span className="hidden md:inline">Brief</span>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 text-xs">
        {/* Preset Loader */}
        <button
          onClick={onOpenPresets}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-color)] text-[var(--text-main)] transition-all font-mono"
        >
          <Sparkles size={13} className="text-[var(--accent-color)]" />
          <span className="hidden sm:inline">Presets</span>
        </button>

        {/* Theme Dropdown */}
        <select
          value={currentTheme}
          onChange={(e) => onThemeChange(e.target.value)}
          className="bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded px-2 py-1.5 cursor-pointer focus:outline-none focus:border-[var(--accent-color)] font-mono"
        >
          {Object.values(THEMES).map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        {/* CRT Scanline Toggle */}
        <button
          onClick={onToggleCrt}
          className={`p-1.5 rounded border transition-all ${
            crtEnabled 
              ? 'border-[var(--accent-color)] bg-[var(--border-color)] text-[var(--accent-color)]' 
              : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-dim)] hover:text-[var(--text-main)]'
          }`}
          title="Toggle CRT Scanline Effect"
        >
          <Eye size={14} />
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-1.5 rounded border transition-all ${
            !isMuted 
              ? 'border-[var(--accent-color)] bg-[var(--border-color)] text-[var(--accent-color)]' 
              : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-dim)] hover:text-[var(--text-main)]'
          }`}
          title={isMuted ? "Unmute Typing SFX" : "Mute Typing SFX"}
        >
          {!isMuted ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>

        {/* Help Button */}
        <button
          onClick={onOpenHelp}
          className="p-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-dim)] hover:text-[var(--text-main)] transition-all"
          title="CLI Commands Guide"
        >
          <HelpCircle size={14} />
        </button>
      </div>
    </header>
  );
}
