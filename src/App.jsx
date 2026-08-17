import React, { useState, useEffect } from 'react';
import SurveyCard from './components/SurveyCard';
import BrandBriefView from './components/BrandBriefView';
import BackendModal from './components/BackendModal';
import GlobalAuditModal from './components/GlobalAuditModal';
import PresetModal from './components/PresetModal';
import HelpModal from './components/HelpModal';
import Toast from './components/Toast';
import { getQuestionsForLanguage, DEMO_PRESETS } from './data/questions';
import { loadSavedState, saveState, clearSavedState } from './utils/storage';
import { toggleMute, getMuteState, playKeySound } from './utils/soundEffects';
import { LANGUAGES, CURRENCIES, getTranslation } from './utils/i18n';
import { Database, Globe, Sparkles, Volume2, VolumeX, RotateCcw, ShieldCheck, DollarSign } from 'lucide-react';

export default function App() {
  const initialState = loadSavedState();
  const [activeTab, setActiveTab] = useState(initialState.activeTab || 'questionnaire');
  const [currentStepIndex, setCurrentStepIndex] = useState(initialState.stepIndex || 0);
  const [answers, setAnswers] = useState(initialState.answers || {});
  const [langKey, setLangKey] = useState('en');
  const [currencyKey, setCurrencyKey] = useState(initialState.currency || 'USD');
  const [isMuted, setIsMuted] = useState(getMuteState());

  const [backendModalOpen, setBackendModalOpen] = useState(false);
  const [globalAuditModalOpen, setGlobalAuditModalOpen] = useState(false);
  const [presetModalOpen, setPresetModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const questions = getQuestionsForLanguage(langKey);

  // Auto-save state to LocalStorage
  useEffect(() => {
    saveState(answers, currentStepIndex, activeTab, currencyKey);
  }, [answers, currentStepIndex, activeTab, currencyKey]);

  const currentLang = LANGUAGES[langKey] || LANGUAGES.en;
  const currentCurrency = CURRENCIES[currencyKey] || CURRENCIES.USD;
  const isRtl = currentLang.dir === 'rtl';

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  const handleToggleSound = () => {
    const muted = toggleMute();
    setIsMuted(muted);
    showToast(muted ? 'Audio SFX Muted' : 'Audio SFX Enabled');
  };

  const handleAnswerSubmit = (qId, value) => {
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);

    if (currentStepIndex < questions.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      playKeySound('success');
      showToast('🎉 Intake complete! Brand Brief finalized.');
      setActiveTab('brief');
    }
  };

  const handleSkipStep = () => {
    if (currentStepIndex < questions.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleResetIntake = () => {
    clearSavedState();
    setAnswers({});
    setCurrentStepIndex(0);
    setActiveTab('questionnaire');
    showToast('Intake session reset & cleared from LocalStorage.');
  };

  const handleAutoFill = () => {
    const defaultData = DEMO_PRESETS.saas.data;
    setAnswers(defaultData);
    setCurrentStepIndex(questions.length - 1);
    playKeySound('success');
    showToast('Auto-filled Brand Brief with Apex AI profile!');
  };

  const handleLoadPreset = (presetData) => {
    setAnswers(presetData);
    setCurrentStepIndex(questions.length - 1);
    setActiveTab('brief');
    playKeySound('success');
    showToast(`Loaded ${presetData.companyName} preset profile!`);
  };

  return (
    <div className="min-h-screen bg-[#0f1015] text-gray-800 flex flex-col items-center justify-center p-4 sm:p-8 font-sans antialiased" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Header Controls Bar */}
      <header className="no-print w-full max-w-2xl flex flex-wrap items-center justify-between gap-3 mb-4 text-xs select-none">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 p-1.5 rounded-full shadow-lg">
          <button
            onClick={() => setActiveTab('questionnaire')}
            className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
              activeTab === 'questionnaire'
                ? 'bg-[#e11d48] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {getTranslation(langKey, 'questionnaire')}
          </button>

          <button
            onClick={() => setActiveTab('brief')}
            className={`px-4 py-1.5 rounded-full font-semibold transition-all ${
              activeTab === 'brief'
                ? 'bg-[#e11d48] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {getTranslation(langKey, 'execBrief')}
          </button>
        </div>

        {/* Global Controls & Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Language Selector Dropdown */}
          <div className="relative flex items-center">
            <select
              value={langKey}
              onChange={(e) => {
                setLangKey(e.target.value);
                showToast(`Switched language to ${LANGUAGES[e.target.value].name}`);
              }}
              className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-full px-3 py-1.5 cursor-pointer focus:outline-none focus:border-red-500 font-semibold"
            >
              {Object.values(LANGUAGES).map((l) => (
                <option key={l.id} value={l.id}>
                  {l.flag} {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Currency Selector */}
          <div className="relative flex items-center">
            <select
              value={currencyKey}
              onChange={(e) => {
                setCurrencyKey(e.target.value);
                showToast(`Switched currency to ${CURRENCIES[e.target.value].name}`);
              }}
              className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-full px-3 py-1.5 cursor-pointer focus:outline-none focus:border-red-500 font-semibold"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Global Audit Report Trigger */}
          <button
            onClick={() => setGlobalAuditModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-700/50 text-blue-300 font-semibold hover:bg-blue-900 transition-all"
            title="Global Enterprise Usability Audit"
          >
            <Globe size={13} />
            <span className="hidden sm:inline">{getTranslation(langKey, 'globalAudit')}</span>
          </button>

          {/* Backend Architecture Docs Trigger */}
          <button
            onClick={() => setBackendModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-indigo-300 font-semibold hover:bg-indigo-900 transition-all"
            title="Backend Architecture & API Docs"
          >
            <Database size={13} />
            <span className="hidden sm:inline">{getTranslation(langKey, 'backendDocs')}</span>
          </button>

          {/* Presets */}
          <button
            onClick={() => setPresetModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 font-semibold hover:bg-zinc-800 transition-all"
          >
            <Sparkles size={13} />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-all"
            title={isMuted ? "Unmute Audio SFX" : "Mute SFX"}
          >
            {!isMuted ? <Volume2 size={14} className="text-[#e11d48]" /> : <VolumeX size={14} />}
          </button>

          {/* Reset */}
          <button
            onClick={handleResetIntake}
            className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 transition-all"
            title="Reset Intake"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </header>

      {/* Main Pixel-Perfect Light Canvas Frame */}
      <main className="survey-canvas w-full max-w-2xl p-6 sm:p-10 my-auto shadow-2xl relative overflow-hidden">
        {activeTab === 'questionnaire' && (
          <SurveyCard
            questions={questions}
            currentStepIndex={currentStepIndex}
            answers={answers}
            onAnswerSubmit={handleAnswerSubmit}
            onSkipStep={handleSkipStep}
            onBackStep={handleBackStep}
            onResetIntake={handleResetIntake}
            onAutoFill={handleAutoFill}
            langKey={langKey}
          />
        )}

        {activeTab === 'brief' && (
          <BrandBriefView
            answers={answers}
            questions={questions}
            onShowToast={showToast}
            onOpenBackendDocs={() => setBackendModalOpen(true)}
          />
        )}
      </main>

      {/* Footer Status Banner */}
      <footer className="no-print mt-4 text-[11px] text-zinc-500 font-medium flex items-center gap-2 select-none">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>Enterprise Encrypted Persistence · {currentLang.name} · {currentCurrency.symbol} ({currentCurrency.code})</span>
      </footer>

      {/* Modals & Toasts */}
      <GlobalAuditModal
        isOpen={globalAuditModalOpen}
        onClose={() => setGlobalAuditModalOpen(false)}
      />

      <BackendModal
        isOpen={backendModalOpen}
        onClose={() => setBackendModalOpen(false)}
      />

      <PresetModal
        isOpen={presetModalOpen}
        onClose={() => setPresetModalOpen(false)}
        onLoadPreset={handleLoadPreset}
      />

      <HelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
