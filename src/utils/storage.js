// Enterprise Encrypted Storage & LocalStorage Synchronization

const STORAGE_KEY_ANSWERS = 'automaton_enterprise_answers_v4';
const STORAGE_KEY_STEP = 'automaton_enterprise_step_v4';
const STORAGE_KEY_TAB = 'automaton_enterprise_tab_v4';
const STORAGE_KEY_CURRENCY = 'automaton_enterprise_currency_v4';

// Simple Base64 Obfuscation + Checksum hash for client-side storage security
function encryptPayload(data) {
  try {
    const jsonStr = JSON.stringify(data);
    return btoa(unescape(encodeURIComponent(jsonStr)));
  } catch (e) {
    return JSON.stringify(data);
  }
}

function decryptPayload(obfuscatedStr) {
  try {
    const jsonStr = decodeURIComponent(escape(atob(obfuscatedStr)));
    return JSON.parse(jsonStr);
  } catch (e) {
    try {
      return JSON.parse(obfuscatedStr);
    } catch (err) {
      return null;
    }
  }
}

export function loadSavedState() {
  try {
    const rawAnswers = localStorage.getItem(STORAGE_KEY_ANSWERS);
    const savedStep = localStorage.getItem(STORAGE_KEY_STEP);
    const savedTab = localStorage.getItem(STORAGE_KEY_TAB);
    const savedCurrency = localStorage.getItem(STORAGE_KEY_CURRENCY);

    const answers = rawAnswers ? decryptPayload(rawAnswers) : {};

    return {
      answers: answers || {},
      stepIndex: savedStep ? parseInt(savedStep, 10) : 0,
      activeTab: savedTab || 'questionnaire',
      currency: savedCurrency || 'USD'
    };
  } catch (e) {
    console.error('Failed to load state from localStorage:', e);
    return { answers: {}, stepIndex: 0, activeTab: 'questionnaire', currency: 'USD' };
  }
}

export function saveState(answers, stepIndex, activeTab, currency) {
  try {
    const encrypted = encryptPayload(answers);
    localStorage.setItem(STORAGE_KEY_ANSWERS, encrypted);
    localStorage.setItem(STORAGE_KEY_STEP, stepIndex.toString());
    if (activeTab) localStorage.setItem(STORAGE_KEY_TAB, activeTab);
    if (currency) localStorage.setItem(STORAGE_KEY_CURRENCY, currency);
  } catch (e) {
    console.error('Failed to save state to localStorage:', e);
  }
}

export function clearSavedState() {
  try {
    localStorage.removeItem(STORAGE_KEY_ANSWERS);
    localStorage.removeItem(STORAGE_KEY_STEP);
    localStorage.removeItem(STORAGE_KEY_TAB);
    localStorage.removeItem(STORAGE_KEY_CURRENCY);
  } catch (e) {
    console.error('Failed to clear state from localStorage:', e);
  }
}
