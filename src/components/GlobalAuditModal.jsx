import React from 'react';
import { Globe, X, CheckCircle, ShieldAlert, WifiOff, Accessibility, Lock } from 'lucide-react';

export default function GlobalAuditModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const pillars = [
    {
      icon: <Globe size={18} className="text-blue-500" />,
      title: '1. Internationalization (i18n) & Localization (l10n)',
      status: 'Active in Prototype',
      bottlenecks: 'Hardcoded content in single language, lack of RTL support for Middle Eastern markets, hardcoded USD currency format.',
      solution: 'Full i18n translation dictionary engine (EN, ES, FR, DE, JA, AR) with native RTL mirroring and dynamic multi-currency selector.'
    },
    {
      icon: <Accessibility size={18} className="text-emerald-500" />,
      title: '2. Accessibility (a11y) & WCAG 2.1 AA/AAA Compliance',
      status: 'Active in Prototype',
      bottlenecks: 'Custom clickable div elements lack ARIA roles (role="radio", aria-checked), keyboard focus rings, and screen reader announcements.',
      solution: 'Full ARIA attributes, native keyboard navigation traps (Space/Enter keys), high contrast ratios (>4.5:1), and VoiceOver/NVDA screen reader support.'
    },
    {
      icon: <Lock size={18} className="text-purple-500" />,
      title: '3. Data Security, GDPR/CCPA & Multi-Tenancy',
      status: 'Required for Prod',
      bottlenecks: 'Storing unencrypted client brand strategy data in browser localStorage risking data leakage on shared/corporate devices.',
      solution: 'AES-256 client-side encryption, OAuth 2.0 / SSO (Okta, Azure AD), role-based access control (RBAC), and explicit GDPR data processing consent.'
    },
    {
      icon: <WifiOff size={18} className="text-amber-500" />,
      title: '4. Network Resilience & Offline Sync Queue',
      status: 'Required for Prod',
      bottlenecks: 'Network drops in low-bandwidth global regions cause API submissions to fail without automatic retry background synchronization.',
      solution: 'Service Worker with IndexedDB offline queue + Background Sync API to automatically re-submit client briefs when connection returns.'
    },
    {
      icon: <ShieldAlert size={18} className="text-rose-500" />,
      title: '5. Server-Side Input Sanitization & Rate Limiting',
      status: 'Required for Prod',
      bottlenecks: 'Freeform text fields vulnerable to script injection (XSS) and spam bot submission without IP rate-limiting.',
      solution: 'Server-side HTML sanitization (DOMPurify), Cloudflare WAF, and Redis token bucket rate limiting (10 req/min per IP).'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans text-gray-800">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Globe size={20} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-gray-900 font-['Plus_Jakarta_Sans']">
                Global Production Readiness Audit
              </h3>
              <p className="text-xs text-gray-500">Why a simple web form is un-usable for global enterprise scale without these 5 pillars</p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Pillars List */}
        <div className="space-y-4">
          {pillars.map((p, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-gray-900">
                  {p.icon}
                  <span>{p.title}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  {p.status}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed font-sans">
                <strong className="text-gray-900">Why Unusable:</strong> {p.bottlenecks}
              </p>
              <p className="text-gray-800 leading-relaxed font-sans font-medium">
                <strong className="text-emerald-700">Production Solution:</strong> {p.solution}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-gray-900 text-white font-bold text-xs hover:bg-gray-800 transition-all"
          >
            Close Audit Report
          </button>
        </div>
      </div>
    </div>
  );
}
