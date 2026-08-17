import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, FastForward, Check, Sparkles, RotateCcw } from 'lucide-react';
import { playKeySound } from '../utils/soundEffects';
import { getTranslation } from '../utils/i18n';

export default function SurveyCard({
  questions,
  currentStepIndex,
  answers,
  onAnswerSubmit,
  onSkipStep,
  onBackStep,
  onResetIntake,
  onAutoFill,
  langKey = 'en'
}) {
  const [inputValue, setInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sliderVals, setSliderVals] = useState({ modernClassic: 9, casualFormal: 5, subtleBold: 8, techHuman: 8 });

  const inputRef = useRef(null);
  const currentQ = questions[currentStepIndex];

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

  const activeOption = answers[currentQ?.id];

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Header & Red Highlight Title (With i18n support) */}
      <div className="text-center space-y-2 pt-1 select-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-[#e11d48] border border-red-100 text-xs font-bold uppercase tracking-wider">
          <span>{getTranslation(langKey, 'subtitle')}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-['Plus_Jakarta_Sans']">
          {getTranslation(langKey, 'titleMain')}{' '}
          <span className="red-highlight-box">{getTranslation(langKey, 'titleBadge')}</span>
        </h1>

        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          {getTranslation(langKey, 'caption', { count: questions.length })}
        </p>
      </div>

      {/* 2. Step Progress Track Slider (Pixel-Perfect Node Circles) */}
      <div className="relative max-w-lg mx-auto py-3 select-none" aria-label="Intake progress">
        {/* Track Line Background */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full -translate-y-1/2 z-0" />
        
        {/* Active Red Track Line */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-[#e11d48] rounded-full -translate-y-1/2 z-0 transition-all duration-500 shadow-sm"
          style={{ width: `${(currentStepIndex / (questions.length - 1)) * 100}%` }}
        />

        {/* Node Circles */}
        <div className="relative flex items-center justify-between z-10 px-1">
          {questions.map((q, idx) => {
            const isCompleted = idx < currentStepIndex || !!answers[q.id];
            const isActive = idx === currentStepIndex;

            return (
              <div key={q.id} className="flex items-center justify-center">
                {isActive ? (
                  <div className="progress-node-active" title={`Step ${idx + 1}: ${q.title}`} />
                ) : isCompleted ? (
                  <div className="progress-node-completed" title={`Completed Step ${idx + 1}: ${q.title}`} />
                ) : (
                  <div className="progress-node-upcoming" title={`Step ${idx + 1}: ${q.title}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Accessible Question Card */}
      {currentQ && (
        <div className="space-y-6 pt-1">
          {/* Question Title & Section Badge */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#e11d48] uppercase tracking-wider">
                {currentQ.section} · {getTranslation(langKey, 'stepText', { step: currentStepIndex + 1, total: questions.length })}
              </span>
              <span className="text-xs font-semibold text-gray-400 font-mono">
                {Math.round(((currentStepIndex + 1) / questions.length) * 100)}%
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-gray-900 leading-snug font-['Plus_Jakarta_Sans']">
              {currentStepIndex + 1}. {currentQ.question}
            </h3>

            {currentQ.hint && (
              <p className="text-xs text-gray-500 italic">
                💡 {currentQ.hint}
              </p>
            )}
          </div>

          {/* Type A: Choice Options (With Full WCAG ARIA Accessibility attributes) */}
          {currentQ.type === 'choice' && currentQ.options && (
            <div 
              role="radiogroup" 
              aria-label={currentQ.question}
              className="space-y-3 pt-1"
            >
              {currentQ.options.map((opt) => {
                const isSelected = activeOption === opt;
                return (
                  <div
                    key={opt}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onClick={() => {
                      playKeySound('enter');
                      onAnswerSubmit(currentQ.id, opt);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        playKeySound('enter');
                        onAnswerSubmit(currentQ.id, opt);
                      }
                    }}
                    className={`survey-option-card ${isSelected ? 'selected' : ''}`}
                  >
                    <div className={`custom-radio-outer ${isSelected ? 'selected' : ''}`}>
                      {isSelected && <div className="custom-radio-inner" />}
                    </div>
                    <span className={`text-sm ${isSelected ? 'font-bold text-gray-900' : 'text-gray-700 font-medium'}`}>
                      {opt}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Type B: Multi-Select Tag Cards */}
          {currentQ.type === 'tags' && currentQ.options && (
            <div className="space-y-3 pt-1">
              <p className="text-xs font-medium text-gray-500">{getTranslation(langKey, 'selectOptionHint')}</p>
              <div className="space-y-2.5">
                {currentQ.options.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <div
                      key={tag}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => toggleTag(tag)}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          toggleTag(tag);
                        }
                      }}
                      className={`survey-option-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div className={`custom-radio-outer ${isSelected ? 'selected' : ''}`}>
                        {isSelected && <div className="custom-radio-inner" />}
                      </div>
                      <span className={`text-sm ${isSelected ? 'font-bold text-gray-900' : 'text-gray-700 font-medium'}`}>
                        {tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Type C: Tone Spectrum Sliders */}
          {currentQ.type === 'sliders' && currentQ.sliders && (
            <div className="space-y-5 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              {currentQ.sliders.map((s) => (
                <div key={s.id} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-800">
                    <label htmlFor={s.id}>{s.label}</label>
                    <span className="text-[#e11d48] font-mono font-extrabold">{sliderVals[s.id] || s.defaultVal} / 10</span>
                  </div>
                  <input
                    id={s.id}
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

          {/* Type D: Refined Input Field */}
          <form onSubmit={handleSubmit} className="pt-2 flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              aria-label={currentQ.question}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                playKeySound('click');
              }}
              placeholder={currentQ.placeholder || "Type your response..."}
              className="flex-1 bg-white border-2 border-gray-200 focus:border-[#e11d48] focus:ring-4 focus:ring-red-500/10 text-gray-900 rounded-2xl px-5 py-4 text-sm focus:outline-none placeholder:text-gray-400 font-medium shadow-sm transition-all"
            />

            <button
              type="submit"
              className="px-7 py-4 rounded-2xl bg-[#e11d48] hover:bg-[#be123c] text-white font-extrabold text-xs transition-all flex items-center gap-2 shadow-lg shadow-red-500/25 active:scale-95 shrink-0"
            >
              <span>{getTranslation(langKey, 'commitBtn')}</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Bottom Controls */}
          <div className="pt-5 flex items-center justify-between border-t border-gray-200/80 text-xs text-gray-500 select-none">
            <div className="flex items-center gap-2">
              {currentStepIndex > 0 && (
                <button
                  type="button"
                  onClick={onBackStep}
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>{getTranslation(langKey, 'previousBtn')}</span>
                </button>
              )}

              <button
                type="button"
                onClick={onSkipStep}
                className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold transition-all flex items-center gap-1.5"
              >
                <span>{getTranslation(langKey, 'skipBtn')}</span>
                <FastForward size={14} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onAutoFill}
                className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1.5 transition-colors"
              >
                <Sparkles size={14} />
                <span>{getTranslation(langKey, 'autoFillBtn')}</span>
              </button>

              <button
                type="button"
                onClick={onResetIntake}
                className="text-red-600 hover:text-red-700 font-bold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw size={14} />
                <span>{getTranslation(langKey, 'resetBtn')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
