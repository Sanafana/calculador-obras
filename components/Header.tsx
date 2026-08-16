'use client';

import React from 'react';
import { 
  Building2, 
  FileText, 
  Printer, 
  Settings2, 
  PlusCircle, 
  FolderOpen, 
  Save, 
  UserCheck, 
  Calculator,
  Eye,
  Sliders
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'calculator' | 'proposal' | 'settings';
  setActiveTab: (tab: 'calculator' | 'proposal' | 'settings') => void;
  onOpenCatalog: () => void;
  onOpenCompany: () => void;
  onOpenClient: () => void;
  onOpenHistory: () => void;
  onNewQuote: () => void;
  onSaveQuote: () => void;
  onPrintPdf: () => void;
  quoteTitle: string;
  setQuoteTitle: (title: string) => void;
  quoteNumber: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenCatalog,
  onOpenCompany,
  onOpenClient,
  onOpenHistory,
  onNewQuote,
  onSaveQuote,
  onPrintPdf,
  quoteTitle,
  setQuoteTitle,
  quoteNumber,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          
          {/* Logo & Project Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center shadow-inner text-slate-950 font-black text-xl">
              <Calculator className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {quoteNumber || 'ORC-2026'}
                </span>
                <input
                  type="text"
                  value={quoteTitle}
                  onChange={(e) => setQuoteTitle(e.target.value)}
                  className="bg-transparent hover:bg-slate-800/60 focus:bg-slate-800 text-slate-100 font-semibold text-lg px-2 py-0.5 rounded border border-transparent focus:border-slate-700 outline-none transition w-64 sm:w-80 truncate"
                  placeholder="Nome do Orçamento..."
                />
              </div>
              <p className="text-xs text-slate-400 ml-2">Calculador de Custos & Gerador de Propostas</p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                activeTab === 'calculator'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Calculador (Custos)</span>
            </button>
            <button
              onClick={() => setActiveTab('proposal')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                activeTab === 'proposal'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Proposta Cliente (PDF)</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                activeTab === 'settings'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Margens & IVA</span>
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onOpenCatalog}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs sm:text-sm font-medium transition shadow-sm"
              title="Adicionar do Catálogo Pré-Configurado"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Catálogo</span>
            </button>

            <button
              onClick={onOpenClient}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs sm:text-sm font-medium transition border border-slate-700"
              title="Dados do Cliente e Local da Obra"
            >
              <UserCheck className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Cliente</span>
            </button>

            <button
              onClick={onOpenCompany}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs sm:text-sm font-medium transition border border-slate-700"
              title="Dados da Empresa Emissora"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Empresa</span>
            </button>

            <button
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs sm:text-sm font-medium transition border border-slate-700"
              title="Orçamentos Gravados"
            >
              <FolderOpen className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">Histórico</span>
            </button>

            <button
              onClick={onSaveQuote}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs sm:text-sm font-medium transition border border-slate-700"
              title="Guardar no Histórico"
            >
              <Save className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline">Guardar</span>
            </button>

            <button
              onClick={onPrintPdf}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs sm:text-sm font-semibold transition shadow-sm"
              title="Imprimir / Exportar PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Gerar PDF</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
