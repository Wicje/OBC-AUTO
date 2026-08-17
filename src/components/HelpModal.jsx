import React from 'react';
import { HelpCircle, X, Terminal as TermIcon, Code, Command } from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const commands = [
    { cmd: '/help', desc: 'Display command reference modal' },
    { cmd: '/theme [matrix|amber|cyberpunk|dracula|monochrome]', desc: 'Switch terminal visual theme' },
    { cmd: '/demo [saas|fashion|gaming]', desc: 'Load pre-filled client preset brief' },
    { cmd: '/auto', desc: 'Auto-fill remaining questionnaire answers with sample data' },
    { cmd: '/skip', desc: 'Skip current question' },
    { cmd: '/back', desc: 'Go back to previous question' },
    { cmd: '/reset', desc: 'Reset intake session' },
    { cmd: '/export [md|json]', desc: 'Export compiled brief' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4 text-[var(--text-main)] font-mono">
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-2 text-[var(--accent-color)] font-bold">
            <TermIcon size={18} />
            <h3 className="text-base uppercase tracking-wider font-['Space_Grotesk']">
              CLI Command Reference
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-[var(--text-dim)] hover:text-[var(--text-main)] p-1 rounded-md hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-[var(--text-dim)]">
          You can type any of the following commands directly into the terminal prompt:
        </p>

        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {commands.map((c) => (
            <div key={c.cmd} className="p-2.5 rounded bg-[var(--bg-term)] border border-[var(--border-color)] space-y-0.5">
              <div className="text-xs font-bold text-[var(--accent-color)]">
                {c.cmd}
              </div>
              <div className="text-[11px] text-[var(--text-dim)]">
                {c.desc}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-between items-center text-xs text-[var(--text-dim)] border-t border-[var(--border-color)]">
          <span>Press [Esc] to close</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded text-xs bg-[var(--border-color)] text-[var(--text-main)] hover:text-[var(--accent-color)] font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
