import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Check, FastForward, Sparkles, Bell, CheckCircle2 } from 'lucide-react';
import { playKeySound } from '../utils/soundEffects';

export default function IntakeFeed({
  questions,
  currentStepIndex,
  answers,
  onAnswerSubmit,
  onSkipStep,
  onBackStep,
  onResetIntake,
  onAutoFill
}) {
  const [inputValue, setInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sliderVals, setSliderVals] = useState({ modernClassic: 9, casualFormal: 5, subtleBold: 8, techHuman: 8 });

  const inputRef = useRef(null);
  const feedEndRef = useRef(null);

  const currentQ = questions[currentStepIndex];

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentStepIndex, answers]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentStepIndex]);

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
  }, [currentStepIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = inputValue.trim();

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
    setInputValue('');
  };

  const toggleTag = (tag) => {
    playKeySound('click');
    setSelectedTags((prev) => 
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Active Question Card (Glassmorphism Notion Card) */}
      {currentQ && (
        <div className="glass-card p-6 md:p-8 space-y-6 shadow-2xl">
          {/* Header Badge Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {currentQ.section}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                Step {currentStepIndex + 1} of {questions.length}
              </span>
            </div>

            <button 
              onClick={onAutoFill}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium hover:bg-amber-500/20 transition-all"
              title="Auto-fill with sample Apex AI profile"
            >
              <Sparkles size={13} />
              <span>Auto-fill Sample</span>
            </button>
          </div>

          {/* Question Title */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Space_Grotesk'] leading-snug">
              {currentQ.question}
            </h2>
            {currentQ.hint && (
              <p className="text-xs text-zinc-400 mt-1.5 flex items-center gap-1">
                💡 {currentQ.hint}
              </p>
            )}
          </div>

          {/* Question Input Type 1: Choice Cards */}
          {currentQ.type === 'choice' && currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {currentQ.options.map((opt, optIdx) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    playKeySound('enter');
                    onAnswerSubmit(currentQ.id, opt);
                  }}
                  className="choice-card group"
                >
                  <span className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                    {optIdx + 1}
                  </span>
                  <span className="truncate">{opt}</span>
                </button>
              ))}
            </div>
          )}

          {/* Question Input Type 2: Tag Pills */}
          {currentQ.type === 'tags' && currentQ.options && (
            <div className="flex flex-wrap gap-2.5 pt-1">
              {currentQ.options.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`tag-pill ${active ? 'active' : ''}`}
                  >
                    {active && <Check size={14} className="text-emerald-400" />}
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Question Input Type 3: Tone Spectrum Sliders */}
          {currentQ.type === 'sliders' && currentQ.sliders && (
            <div className="space-y-4 p-5 rounded-2xl bg-black/20 border border-white/5">
              {currentQ.sliders.map((s) => (
                <div key={s.id} className="space-y-2">
                  <div className="flex justify-between text-xs text-zinc-300 font-medium">
                    <span>{s.label}</span>
                    <span className="font-bold text-emerald-400 font-mono">{sliderVals[s.id] || s.defaultVal} / 10</span>
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

          {/* Input Form Bar */}
          <form onSubmit={handleSubmit} className="pt-2 flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                playKeySound('click');
              }}
              placeholder={currentQ.placeholder || "Type your response..."}
              className="flex-1 bg-white/5 border border-white/10 focus:border-emerald-500 text-white rounded-2xl px-5 py-3.5 text-sm focus:outline-none placeholder:text-zinc-500 transition-colors shadow-inner"
            />

            <div className="flex items-center gap-2">
              {currentStepIndex > 0 && (
                <button
                  type="button"
                  onClick={onBackStep}
                  className="p-3.5 rounded-2xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                  title="Previous Step"
                >
                  <ArrowLeft size={16} />
                </button>
              )}

              <button
                type="button"
                onClick={onSkipStep}
                className="p-3.5 rounded-2xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                title="Skip Step"
              >
                <FastForward size={16} />
              </button>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25"
              >
                <span>Commit</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Committed Intake Items Feed (Timeline style) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 px-1">
          <Bell size={14} className="text-emerald-400" />
          <span>Timeline Intake Feed</span>
        </div>

        {questions.slice(0, currentStepIndex).map((q, idx) => {
          const ans = answers[q.id];
          let displayAns = 'Not specified';
          if (Array.isArray(ans)) displayAns = ans.join(', ');
          else if (typeof ans === 'object' && ans !== null) displayAns = 'Tone spectrum matrix configured';
          else if (ans) displayAns = ans;

          return (
            <div key={q.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs hover:border-white/15 transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <div className="truncate">
                  <p className="font-semibold text-white truncate">{q.title}</p>
                  <p className="text-emerald-400 font-medium truncate mt-0.5">{displayAns}</p>
                </div>
              </div>

              <span className="text-[10px] text-zinc-500 shrink-0 ml-3 font-mono">
                Step {idx + 1}
              </span>
            </div>
          );
        })}
      </div>

      <div ref={feedEndRef} />
    </div>
  );
}
