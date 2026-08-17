// Global i18n Localization Engine & Multi-Currency Formatter

export const LANGUAGES = {
  en: { id: 'en', name: 'English', dir: 'ltr', flag: '🇺🇸' },
  es: { id: 'es', name: 'Español', dir: 'ltr', flag: '🇪🇸' },
  fr: { id: 'fr', name: 'Français', dir: 'ltr', flag: '🇫🇷' },
  de: { id: 'de', name: 'Deutsch', dir: 'ltr', flag: '🇩🇪' },
  ja: { id: 'ja', name: '日本語', dir: 'ltr', flag: '🇯🇵' },
  ar: { id: 'ar', name: 'العربية', dir: 'rtl', flag: '🇸🇦' }
};

export const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', name: 'USD ($)' },
  EUR: { symbol: '€', code: 'EUR', name: 'EUR (€)' },
  GBP: { symbol: '£', code: 'GBP', name: 'GBP (£)' },
  JPY: { symbol: '¥', code: 'JPY', name: 'JPY (¥)' },
  AUD: { symbol: 'A$', code: 'AUD', name: 'AUD (A$)' }
};

export const UI_TRANSLATIONS = {
  en: {
    subtitle: 'Client Onboarding Automaton',
    titleMain: 'Brand Intake',
    titleBadge: 'Protocol',
    caption: 'The questionnaire consists of {count} questions. Thank you for completing it!',
    commitBtn: 'Commit',
    previousBtn: 'Previous',
    skipBtn: 'Skip',
    autoFillBtn: 'Auto-fill Sample',
    resetBtn: 'Reset',
    copyMd: 'Copy .MD',
    copied: 'Copied!',
    downloadMd: '.MD',
    downloadJson: 'JSON',
    submitAgency: 'Submit to Agency',
    savingToDb: 'Saving to DB...',
    submitted: 'Submitted ✓',
    execBrief: 'Executive Brief',
    questionnaire: 'Questionnaire',
    backendDocs: 'Backend Docs',
    globalAudit: 'Global Audit',
    stepText: 'Step {step} of {total}',
    selectOptionHint: 'Select an option below:'
  },
  es: {
    subtitle: 'Autómata de Incorporación de Clientes',
    titleMain: 'Protocolo de',
    titleBadge: 'Admisión',
    caption: 'El cuestionario consta de {count} preguntas. ¡Gracias por completarlo!',
    commitBtn: 'Guardar',
    previousBtn: 'Anterior',
    skipBtn: 'Omitir',
    autoFillBtn: 'Autocompletar',
    resetBtn: 'Reiniciar',
    copyMd: 'Copiar .MD',
    copied: '¡Copiado!',
    downloadMd: '.MD',
    downloadJson: 'JSON',
    submitAgency: 'Enviar a la Agencia',
    savingToDb: 'Guardando...',
    submitted: 'Enviado ✓',
    execBrief: 'Resumen Ejecutivo',
    questionnaire: 'Cuestionario',
    backendDocs: 'Docs Backend',
    globalAudit: 'Auditoría Global',
    stepText: 'Paso {step} de {total}',
    selectOptionHint: 'Seleccione una opción a continuación:'
  },
  fr: {
    subtitle: 'Automate d\'Intégration Client',
    titleMain: 'Protocole de',
    titleBadge: 'Questionnaire',
    caption: 'Le questionnaire comprend {count} questions. Merci de le remplir !',
    commitBtn: 'Valider',
    previousBtn: 'Précédent',
    skipBtn: 'Passer',
    autoFillBtn: 'Remplissage Auto',
    resetBtn: 'Réinitialiser',
    copyMd: 'Copier .MD',
    copied: 'Copié !',
    downloadMd: '.MD',
    downloadJson: 'JSON',
    submitAgency: 'Envoyer à l\'Agence',
    savingToDb: 'Enregistrement...',
    submitted: 'Envoyé ✓',
    execBrief: 'Synthèse Exécutive',
    questionnaire: 'Questionnaire',
    backendDocs: 'Docs Backend',
    globalAudit: 'Audit Global',
    stepText: 'Étape {step} sur {total}',
    selectOptionHint: 'Sélectionnez une option ci-dessous :'
  },
  de: {
    subtitle: 'Kunden-Onboarding-Automat',
    titleMain: 'Marken-Aufnahme',
    titleBadge: 'Protokoll',
    caption: 'Fragebogen umfasst {count} Fragen. Vielen Dank fürs Ausfüllen!',
    commitBtn: 'Bestätigen',
    previousBtn: 'Zurück',
    skipBtn: 'Überspringen',
    autoFillBtn: 'Beispiel ausfüllen',
    resetBtn: 'Zurücksetzen',
    copyMd: '.MD Kopieren',
    copied: 'Kopiert!',
    downloadMd: '.MD',
    downloadJson: 'JSON',
    submitAgency: 'An Agentur Senden',
    savingToDb: 'Speichern...',
    submitted: 'Gesendet ✓',
    execBrief: 'Zusammenfassung',
    questionnaire: 'Fragebogen',
    backendDocs: 'Backend-Doku',
    globalAudit: 'Globaler Audit',
    stepText: 'Schritt {step} von {total}',
    selectOptionHint: 'Wählen Sie eine Option:'
  },
  ja: {
    subtitle: 'クライアントオンボーディング自動化',
    titleMain: 'ブランドインテーク',
    titleBadge: 'プロトコル',
    caption: '全{count}問の質問があります。ご協力ありがとうございます。',
    commitBtn: '送信',
    previousBtn: '前へ',
    skipBtn: 'スキップ',
    autoFillBtn: '自動入力サンプル',
    resetBtn: 'リセット',
    copyMd: '.MDコピー',
    copied: '完了!',
    downloadMd: '.MD',
    downloadJson: 'JSON',
    submitAgency: '代理店へ送信',
    savingToDb: '保存中...',
    submitted: '送信済み ✓',
    execBrief: 'エグゼクティブブリーフ',
    questionnaire: 'アンケート',
    backendDocs: 'バックエンド文書',
    globalAudit: 'グローバル監査',
    stepText: 'ステップ {step} / {total}',
    selectOptionHint: '選択肢を選んでください：'
  },
  ar: {
    subtitle: 'نظام إعداد العملاء الآلي',
    titleMain: 'بروتوكول',
    titleBadge: 'الاستبيان',
    caption: 'يتكون الاستبيان من {count} سؤالاً. شكرًا لإكماله!',
    commitBtn: 'حفظ',
    previousBtn: 'السابق',
    skipBtn: 'تخطي',
    autoFillBtn: 'تعبئة تلقائية',
    resetBtn: 'إعادة ضبط',
    copyMd: 'نسخ .MD',
    copied: 'تم النسخ!',
    downloadMd: '.MD',
    downloadJson: 'JSON',
    submitAgency: 'إرسال إلى الوكالة',
    savingToDb: 'جاري الحفظ...',
    submitted: 'تم الإرسال ✓',
    execBrief: 'الملخص التنفيذي',
    questionnaire: 'الاستبيان',
    backendDocs: 'وثائق الخلفية',
    globalAudit: 'التدقيق العالمي',
    stepText: 'الخطوة {step} من {total}',
    selectOptionHint: 'اختر خيارًا من القائمة:'
  }
};

export function getTranslation(langKey, key, params = {}) {
  const dict = UI_TRANSLATIONS[langKey] || UI_TRANSLATIONS.en;
  let text = dict[key] || UI_TRANSLATIONS.en[key] || key;
  Object.entries(params).forEach(([param, val]) => {
    text = text.replace(`{${param}}`, val);
  });
  return text;
}
