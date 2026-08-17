import React from 'react';
import { Database, X, Code2, Server, CheckCircle2, Zap } from 'lucide-react';
import { BACKEND_ARCHITECTURE_DOCS } from '../utils/backendDocs';

export default function BackendModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans text-gray-800">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Database size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-['Plus_Jakarta_Sans']">
                Backend Architecture & Persistence
              </h3>
              <p className="text-xs text-gray-500">How the production backend works for client intake</p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 1. Persistence & State Sync */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs text-emerald-900">
          <div className="flex items-center gap-2 font-bold text-emerald-700">
            <CheckCircle2 size={16} />
            <span>Frontend Persistence Active (LocalStorage)</span>
          </div>
          <p className="leading-relaxed text-emerald-800">
            Your intake state (answers, current step, tab preferences) is automatically persisted in <code className="font-mono bg-emerald-100 px-1 py-0.5 rounded">localStorage</code>. Refreshing the browser or returning later will keep 100% of your progress intact.
          </p>
        </div>

        {/* 2. Tech Stack Overview */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <Server size={15} className="text-indigo-600" />
            <span>Production Backend Tech Stack</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {BACKEND_ARCHITECTURE_DOCS.techStack.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-gray-50 border border-gray-200 font-medium text-gray-800">
                • {item}
              </div>
            ))}
          </div>
        </div>

        {/* 3. API Endpoints Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <Code2 size={15} className="text-[#e11d48]" />
            <span>REST API Endpoints Specification</span>
          </h4>

          <div className="space-y-2.5">
            {BACKEND_ARCHITECTURE_DOCS.endpoints.map((ep, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2 font-mono">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-gray-900 text-white">
                    {ep.method}
                  </span>
                  <span className="font-bold text-gray-900">{ep.path}</span>
                </div>
                <p className="font-sans text-gray-600 text-xs font-normal">{ep.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Database Schema */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <Zap size={15} className="text-amber-500" />
            <span>Database Model (Prisma / PostgreSQL)</span>
          </h4>
          <pre className="p-4 rounded-2xl bg-gray-900 text-emerald-400 font-mono text-xs overflow-x-auto">
            {BACKEND_ARCHITECTURE_DOCS.databaseSchema}
          </pre>
        </div>

        <div className="pt-2 flex justify-end border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-gray-900 text-white font-bold text-xs hover:bg-gray-800 transition-all"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
