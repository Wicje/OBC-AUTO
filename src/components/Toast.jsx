import React, { useEffect } from 'react';
import { Terminal } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--accent-color)] text-[var(--text-main)] font-mono text-xs px-4 py-3 rounded-lg shadow-2xl animate-slide-up">
      <Terminal size={16} className="text-[var(--accent-color)]" />
      <span>{message}</span>
    </div>
  );
}
