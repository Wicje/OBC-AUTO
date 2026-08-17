import React, { useState, useEffect, useRef } from 'react';
import { CornerDownLeft, RotateCcw, FastForward, ArrowLeft, Check, Sparkles, HelpCircle } from 'lucide-react';
import { playKeySound } from '../utils/soundEffects';

export default function Terminal({
  questions,
  currentStepIndex,
  answers,
  onAnswerSubmit,
  onSkipStep,
  onBackStep,
  onResetIntake,
  onAutoFill,
  onExecuteCommand,
  onOpenHelp
}) {
  const [inputValue, setInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sliderVals, setSliderVals] = useState({ modernClassic: 9, casualFormal: 5, subtleBold: 8, techHuman: 8 });
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [botTypingText, setBotTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [treeExpanded, setTreeExpanded] = useState(false);

  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  const currentQ = questions[currentStepIndex];

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentStepIndex, botTypingText, answers, commandHistory]);

  // Focus terminal input on mount & step change
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentStepIndex]);

  // Reset local tag state or slider state when step changes
  useEffect(() => {
    if (!currentQ) return;
    if (currentQ.type === 'tags') {
      const existing = answers[currentQ.id];
      setSelectedTags(Array.isArray(existing) ? existing : []);
    } else if (currentQ.type === 'sliders') {
      const existing = answers[currentQ.id];
      if (existing && typeof existing === 'object') {
        setSliderVals(existing);
      }
    }
    setInputValue('');

    // Typewriter effect for current question prompt
    setIsTyping(true);
    let idx = 0;
    const fullText = currentQ.question;
    setBotTypingText('');

    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setBotTypingText(fullText.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 12);

    return () => clearInterval(interval);
  }, [currentStepIndex]);

  // Handle keyboard shortcuts (1-9 choice numbers, Arrow Up/Down for command history)
  const handleKeyDown = (e) => {
    if (currentQ?.type === 'choice' && /^[1-9]$/.test(e.key) && !inputValue) {
      const optionIdx = parseInt(e.key, 10) - 1;
      if (currentQ.options && currentQ.options[optionIdx]) {
        e.preventDefault();
        playKeySound('enter');
        onAnswerSubmit(currentQ.id, currentQ.options[optionIdx]);
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0) {
        e.preventDefault();
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputValue(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        e.preventDefault();
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputValue(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    playKeySound('click');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = inputValue.trim();

    if (val.startsWith('/') || val === 'help' || val.startsWith('theme ') || val.startsWith('demo ') || val === 'reset' || val === 'skip' || val === 'back' || val === 'auto') {
      playKeySound('enter');
      onExecuteCommand(val);
      setCommandHistory((prev) => [...prev, val]);
      setHistoryIndex(-1);
      setInputValue('');
      return;
    }

    if (currentQ.type === 'tags') {
      if (selectedTags.length === 0 && val) {
        onAnswerSubmit(currentQ.id, [val]);
      } else {
        onAnswerSubmit(currentQ.id, selectedTags.length > 0 ? selectedTags : (val ? [val] : []));
      }
    } else if (currentQ.type === 'sliders') {
      onAnswerSubmit(currentQ.id, sliderVals);
    } else {
      if (!val && currentQ.required) {
        playKeySound('error');
        return;
      }
      onAnswerSubmit(currentQ.id, val || 'Not specified');
    }

    playKeySound('enter');
    if (val) setCommandHistory((prev) => [...prev, val]);
    setHistoryIndex(-1);
    setInputValue('');
  };

  const toggleTag = (tag) => {
    playKeySound('click');
    setSelectedTags((prev) => 
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const completedCount = Object.keys(answers).length;
  const contextUsed = Math.round((completedCount / questions.length) * 100);

  return (
    <div className="terminal-container flex-1 flex flex-col min-h-[580px] cli-box bg-[var(--bg-term)] text-[var(--text-main)] font-mono rounded-lg overflow-hidden shadow-2xl">
      {/* 1. File Tree & Reference Paths Header (Matching Pinterest Reference) */}
      <div className="p-4 border-b border-[var(--border-color)] bg-[#070709] text-xs space-y-1 select-none">
        <div className="text-[var(--text-dim)] font-mono space-y-0.5">
          {questions.slice(0, treeExpanded ? questions.length : 3).map((q) => (
            <div key={q.id} className="flex items-center gap-2">
              <span className={answers[q.id] ? 'text-[var(--accent-color)]' : 'text-[var(--text-muted)]'}>
                {answers[q.id] ? '✓' : '•'}
              </span>
              <span className={answers[q.id] ? 'text-[var(--text-main)]' : 'text-[var(--text-dim)]'}>
                {q.fileRef || `src/brand/${q.id}.ts`}
              </span>
            </div>
          ))}
          {!treeExpanded && questions.length > 3 && (
            <div 
              onClick={() => setTreeExpanded(true)}
              className="text-[var(--text-dim)] hover:text-[var(--text-main)] cursor-pointer pt-0.5 underline font-medium"
            >
              {questions.length - 3} more (click to expand)
            </div>
          )}
        </div>

        {/* Current Active File Reference Pill */}
        {currentQ && (
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-main)] font-mono">
              <span>{currentQ.fileRef || `src/brand/${currentQ.id}.ts`}</span>
              <span className="text-[var(--accent-color)] font-bold">+1</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Scrollable CLI Terminal Body */}
      <div 
        className="flex-1 p-5 overflow-y-auto space-y-5 font-mono text-sm leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Working Checklist Section (Matching Pinterest `⬢ Working on X to-dos`) */}
        <div className="space-y-2 border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]">
            <span className="text-[var(--accent-color)] text-sm">⬢</span>
            <span>Working on {questions.length} intake steps</span>
          </div>

          <div className="pl-4 space-y-1 text-xs text-[var(--text-dim)]">
            {questions.map((q, idx) => {
              const isDone = !!answers[q.id];
              const isCurrent = idx === currentStepIndex;
              return (
                <div 
                  key={q.id} 
                  className={`flex items-center gap-2 font-mono ${
                    isCurrent ? 'text-[var(--accent-color)] font-bold' : isDone ? 'text-[var(--text-main)] opacity-80' : 'text-[var(--text-muted)]'
                  }`}
                >
                  <span className="font-mono">{isDone ? '☒' : '☐'}</span>
                  <span>{q.title}</span>
                  {isCurrent && <span className="text-[10px] px-1 rounded bg-[var(--border-color)] text-[var(--accent-color)]">active</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Answered Questions History Logs */}
        {questions.slice(0, currentStepIndex).map((q) => {
          const ans = answers[q.id];
          let displayAns = 'Not specified';
          if (Array.isArray(ans)) displayAns = ans.join(', ');
          else if (typeof ans === 'object' && ans !== null) displayAns = 'Custom Spectrum Matrix Configured';
          else if (ans) displayAns = ans;

          return (
            <div key={q.id} className="space-y-1 opacity-80 hover:opacity-100 transition-opacity font-mono text-xs">
              <div className="text-[var(--text-dim)] flex items-center gap-2">
                <span className="text-[var(--accent-color)] font-bold">✓ [{q.section}]</span>
                <span>{q.fileRef}</span>
              </div>
              <div className="text-[var(--text-main)] font-semibold pl-3 border-l-2 border-[var(--accent-color)] flex items-center gap-2 py-0.5">
                <span className="text-[var(--accent-color)]">&gt;</span> {displayAns}
              </div>
            </div>
          );
        })}

        {/* Cooking Indicator (Matching Pinterest `⬢ Cooking...`) */}
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-color)]">
          <span className="text-sm animate-pulse">⬢</span>
          <span>Cooking intake step {currentStepIndex + 1} of {questions.length}...</span>
        </div>

        {/* Active Question Box */}
        {currentQ && (
          <div className="space-y-3">
            {/* Framed Question Box */}
            <div className="p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-sm sm:text-base text-[var(--text-main)] font-medium leading-relaxed">
              <p className="whitespace-pre-line">
                {botTypingText}
                {isTyping && <span className="block-cursor" />}
              </p>
            </div>

            {/* Choice Option Pills (Minimal Monospaced Outline Cards) */}
            {currentQ.type === 'choice' && currentQ.options && (
              <div className="space-y-2 pt-1">
                <p className="text-xs text-[var(--text-dim)]">Select an option or press [1-{currentQ.options.length}]:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentQ.options.map((opt, optIdx) => (
                    <button
                      key={opt}
                      onClick={() => {
                        playKeySound('enter');
                        onAnswerSubmit(currentQ.id, opt);
                      }}
                      className="option-pill text-left justify-start group"
                    >
                      <span className="w-5 h-5 rounded bg-[#181820] text-[var(--accent-color)] border border-[var(--border-color)] flex items-center justify-center text-xs font-bold font-mono">
                        {optIdx + 1}
                      </span>
                      <span className="truncate">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Multi-Tag Picker */}
            {currentQ.type === 'tags' && currentQ.options && (
              <div className="space-y-2 pt-1">
                <p className="text-xs text-[var(--text-dim)] font-mono">Select attribute tags (click to toggle):</p>
                <div className="flex flex-wrap gap-2">
                  {currentQ.options.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`option-pill ${active ? 'active' : ''}`}
                      >
                        <span className="font-mono">{active ? '☒' : '☐'}</span>
                        <span>{tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tone Matrix Sliders */}
            {currentQ.type === 'sliders' && currentQ.sliders && (
              <div className="space-y-3 p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] font-mono">
                {currentQ.sliders.map((s) => (
                  <div key={s.id} className="space-y-1">
                    <div className="flex justify-between text-xs text-[var(--text-main)]">
                      <span>{s.label}</span>
                      <span className="font-bold text-[var(--accent-color)]">{sliderVals[s.id] || s.defaultVal} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={sliderVals[s.id] || s.defaultVal}
                      onChange={(e) => {
                        playKeySound('click');
                        setSliderVals({ ...sliderVals, [s.id]: parseInt(e.target.value, 10) });
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Hint */}
            {currentQ.hint && (
              <p className="text-xs text-[var(--text-dim)] italic">
                💡 {currentQ.hint}
              </p>
            )}
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* 3. Framed Input Box (Matching Pinterest Reference `→ Add a follow-up`) */}
      <form onSubmit={handleSubmit} className="p-3 bg-[#070709] border-t border-[var(--border-color)]">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] focus-within:border-[var(--accent-color)] transition-colors">
          <span className="text-[var(--accent-color)] font-bold text-sm">→</span>

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={currentQ?.placeholder || "Add a response or command..."}
            className="flex-1 bg-transparent text-[var(--text-main)] font-mono text-sm focus:outline-none placeholder:text-[var(--text-muted)]"
          />

          <div className="flex items-center gap-1">
            {currentStepIndex > 0 && (
              <button
                type="button"
                onClick={onBackStep}
                className="p-1 rounded text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors"
                title="Back"
              >
                <ArrowLeft size={14} />
              </button>
            )}

            <button
              type="button"
              onClick={onSkipStep}
              className="p-1 rounded text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors"
              title="Skip"
            >
              <FastForward size={14} />
            </button>

            <button
              type="submit"
              className="px-2.5 py-1 rounded bg-[var(--border-color)] hover:bg-[var(--accent-color)] hover:text-black text-[var(--accent-color)] font-bold text-xs transition-colors flex items-center gap-1 font-mono"
            >
              <span>Commit</span>
              <CornerDownLeft size={12} />
            </button>
          </div>
        </div>
      </form>

      {/* 4. Footer Status Bar (Matching Pinterest Reference `GPT-5 · 23% context used · 2 files edited`) */}
      <div className="bg-[var(--bg-term)] border-t border-[var(--border-color)] px-4 py-2 flex flex-wrap items-center justify-between text-xs text-[var(--text-dim)] font-mono select-none">
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-main)] font-semibold">AUTOMATON</span>
          <span>·</span>
          <span>{contextUsed}% context used</span>
          <span>·</span>
          <span>{completedCount} files committed</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hover:text-[var(--text-main)] cursor-pointer" onClick={() => onExecuteCommand('help')}>
            / for commands
          </span>
          <span>·</span>
          <span className="hover:text-[var(--accent-color)] cursor-pointer flex items-center gap-1" onClick={onAutoFill}>
            <Sparkles size={11} /> Auto-fill
          </span>
          <span>·</span>
          <span className="hover:text-red-400 cursor-pointer flex items-center gap-1" onClick={onResetIntake}>
            <RotateCcw size={11} /> Reset
          </span>
        </div>
      </div>
    </div>
  );
}
