import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { DEMO_PRESETS } from '../data/questions';

export default function PresetModal({ isOpen, onClose, onLoadPreset }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-mono">
      <div className="bg-[#0a0a0d] border border-[var(--border-color)] rounded-lg max-w-lg w-full p-5 shadow-2xl space-y-4 text-[var(--text-main)]">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-2 text-[var(--accent-color)] font-bold text-xs uppercase tracking-wider">
            <span>⬢</span>
            <h3>Preset Client Profiles</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-[var(--text-dim)] hover:text-[var(--text-main)] p-1 rounded hover:bg-white/5 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-[var(--text-dim)]">
          Select a pre-configured client profile to populate the intake terminal and generate a brand brief:
        </p>

        <div className="space-y-2.5">
          {Object.entries(DEMO_PRESETS).map(([key, preset]) => (
            <div
              key={key}
              onClick={() => {
                onLoadPreset(preset.data);
                onClose();
              }}
              className="group p-3.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-color)] cursor-pointer transition-all space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[var(--text-main)] group-hover:text-[var(--accent-color)] font-mono">
                  {preset.name}
                </span>
                <span className="text-xs text-[var(--accent-color)] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Load <ArrowRight size={12} />
                </span>
              </div>
              <p className="text-xs text-[var(--text-dim)] line-clamp-1 italic">
                "{preset.data.tagline}"
              </p>
              <div className="flex items-center gap-2 pt-1 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-[#181820] border border-[var(--border-color)] text-[var(--text-main)]">
                  {preset.data.industry}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end border-t border-[var(--border-color)]">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded text-xs border border-[var(--border-color)] text-[var(--text-dim)] hover:text-[var(--text-main)] font-mono"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
