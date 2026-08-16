'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Category, 
  ClientInfo, 
  CompanyInfo, 
  CostSettings, 
  QuoteItem, 
  StoredQuote, 
  Unit 
} from '../lib/types';
import { 
  DEFAULT_CLIENT, 
  DEFAULT_COMPANY, 
  DEFAULT_SAMPLE_ITEMS, 
  DEFAULT_SETTINGS, 
  deleteFromHistory, 
  getSavedQuotesList, 
  loadCurrentDraft, 
  saveCurrentDraft, 
  saveToHistory 
} from '../lib/storage';
import { calculateQuote } from '../lib/calculations';
import { PresetItem } from '../lib/presets';
import { Header } from '../components/Header';
import { ItemsTable } from '../components/ItemsTable';
import { CostSummarySidebar } from '../components/CostSummarySidebar';
import { CatalogModal } from '../components/CatalogModal';
import { CompanyModal } from '../components/CompanyModal';
import { ClientModal } from '../components/ClientModal';
import { HistoryModal } from '../components/HistoryModal';
import { ClientQuoteView } from '../components/ClientQuoteView';
import { SettingsView } from '../components/SettingsView';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'calculator' | 'proposal' | 'settings'>('calculator');
  
  // Quote State
  const [quoteId, setQuoteId] = useState<string>('draft-1');
  const [quoteTitle, setQuoteTitle] = useState<string>('Remodelação T2 - António Silva');
  const [company, setCompany] = useState<CompanyInfo>(DEFAULT_COMPANY);
  const [client, setClient] = useState<ClientInfo>(DEFAULT_CLIENT);
  const [settings, setSettings] = useState<CostSettings>(DEFAULT_SETTINGS);
  const [items, setItems] = useState<QuoteItem[]>(DEFAULT_SAMPLE_ITEMS);

  // Modals
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isClientOpen, setIsClientOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [savedQuotes, setSavedQuotes] = useState<StoredQuote[]>([]);

  // Toast / Status Message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1. Initial Load from LocalStorage
  useEffect(() => {
    const draft = loadCurrentDraft();
    setQuoteId(draft.id || 'draft-1');
    setQuoteTitle(draft.title || 'Remodelação');
    setCompany(draft.company || DEFAULT_COMPANY);
    setClient(draft.client || DEFAULT_CLIENT);
    setSettings(draft.settings || DEFAULT_SETTINGS);
    setItems(draft.items || DEFAULT_SAMPLE_ITEMS);
    setSavedQuotes(getSavedQuotesList());
    setIsLoaded(true);
  }, []);

  // 2. Realtime auto-save to current draft
  useEffect(() => {
    if (!isLoaded) return;
    const currentQuote: StoredQuote = {
      id: quoteId,
      title: quoteTitle,
      updatedAt: new Date().toISOString(),
      company,
      client,
      settings,
      items,
    };
    saveCurrentDraft(currentQuote);
  }, [quoteId, quoteTitle, company, client, settings, items, isLoaded]);

  // 3. Calculation Engine
  const calculations = useMemo(() => {
    return calculateQuote(items, settings);
  }, [items, settings]);

  // Handlers for Items
  const handleUpdateItem = (id: string, updates: Partial<QuoteItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDuplicateItem = (id: string) => {
    const target = items.find((i) => i.id === id);
    if (!target) return;
    const newItem: QuoteItem = {
      ...target,
      id: 'item-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
      description: target.description + ' (Cópia)',
    };
    setItems((prev) => [...prev, newItem]);
    showToast('Linha duplicada com sucesso');
  };

  const handleAddPresetItem = (preset: PresetItem) => {
    const newItem: QuoteItem = {
      id: 'item-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
      category: preset.category,
      description: preset.description,
      unit: preset.unit,
      quantity: preset.defaultQuantity,
      materialUnitCost: preset.materialUnitCost,
      laborUnitCost: preset.laborUnitCost,
      notes: preset.notes,
    };
    setItems((prev) => [...prev, newItem]);
    showToast(`Adicionado: ${preset.description.substring(0, 30)}...`);
  };

  const handleAddCustomItem = (category: Category = 'Alvenaria e Estruturas') => {
    const newItem: QuoteItem = {
      id: 'item-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
      category,
      description: 'Novo trabalho / serviço personalizado',
      unit: 'm²',
      quantity: 1,
      materialUnitCost: 10,
      laborUnitCost: 15,
    };
    setItems((prev) => [...prev, newItem]);
    showToast('Novo artigo manual criado');
  };

  // Handlers for Settings & Meta
  const handleUpdateSettings = (updates: Partial<CostSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const handleNewQuote = () => {
    const newQuoteNum = `ORC-${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;
    setQuoteId('quote-' + Date.now());
    setQuoteTitle('Novo Orçamento de Obra');
    setClient({
      ...DEFAULT_CLIENT,
      name: 'Novo Cliente',
      quoteNumber: newQuoteNum,
      quoteDate: new Date().toISOString().split('T')[0],
      jobAddress: '',
    });
    setItems([]);
    showToast('Novo orçamento em branco iniciado');
  };

  const handleSaveToHistory = () => {
    const currentQuote: StoredQuote = {
      id: quoteId || 'quote-' + Date.now(),
      title: quoteTitle,
      updatedAt: new Date().toISOString(),
      company,
      client,
      settings,
      items,
    };
    saveToHistory(currentQuote);
    setSavedQuotes(getSavedQuotesList());
    showToast('Orçamento guardado no histórico!');
  };

  const handleLoadQuote = (quote: StoredQuote) => {
    setQuoteId(quote.id);
    setQuoteTitle(quote.title);
    setCompany(quote.company || DEFAULT_COMPANY);
    setClient(quote.client || DEFAULT_CLIENT);
    setSettings(quote.settings || DEFAULT_SETTINGS);
    setItems(quote.items || []);
    showToast(`Carregado: ${quote.title}`);
  };

  const handleDeleteFromHistory = (id: string) => {
    deleteFromHistory(id);
    setSavedQuotes(getSavedQuotesList());
    showToast('Orçamento removido do histórico');
  };

  const handlePrintPdf = () => {
    setActiveTab('proposal');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleExportJson = () => {
    const currentQuote: StoredQuote = {
      id: quoteId,
      title: quoteTitle,
      updatedAt: new Date().toISOString(),
      company,
      client,
      settings,
      items,
    };
    const blob = new Blob([JSON.stringify(currentQuote, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(quoteTitle || 'orcamento').toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Ficheiro JSON exportado');
  };

  const handleImportJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string) as StoredQuote;
        if (parsed.items && parsed.company && parsed.client) {
          handleLoadQuote(parsed);
          showToast('Orçamento importado com sucesso');
        } else {
          alert('Ficheiro JSON inválido ou incompatível.');
        }
      } catch (err) {
        alert('Erro ao ler o ficheiro JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom duration-200 no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCatalog={() => setIsCatalogOpen(true)}
        onOpenCompany={() => setIsCompanyOpen(true)}
        onOpenClient={() => setIsClientOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onNewQuote={handleNewQuote}
        onSaveQuote={handleSaveToHistory}
        onPrintPdf={handlePrintPdf}
        quoteTitle={quoteTitle}
        setQuoteTitle={setQuoteTitle}
        quoteNumber={client.quoteNumber}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Tab 1: Calculator & Items Table */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Col: Items Table (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Quick Info Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Cliente / Local da Obra
                  </span>
                  <p className="font-bold text-slate-900 text-sm">
                    {client.name} {client.jobAddress && `— ${client.jobAddress}`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsClientOpen(true)}
                    className="text-xs text-sky-700 hover:text-sky-800 font-semibold bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-200/60 hover:bg-sky-100 transition"
                  >
                    Editar Cliente
                  </button>
                  <button
                    onClick={() => setIsCompanyOpen(true)}
                    className="text-xs text-amber-800 hover:text-amber-900 font-semibold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200/60 hover:bg-amber-100 transition"
                  >
                    Dados da Empresa
                  </button>
                </div>
              </div>

              {/* Editable Table */}
              <ItemsTable
                items={items}
                onUpdateItem={handleUpdateItem}
                onDeleteItem={handleDeleteItem}
                onDuplicateItem={handleDuplicateItem}
                onAddCustomItem={handleAddCustomItem}
                onOpenCatalog={() => setIsCatalogOpen(true)}
              />
            </div>

            {/* Right Col: Cost Summary & Margins Sidebar (4 cols) */}
            <div className="lg:col-span-4">
              <CostSummarySidebar
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                calculations={calculations}
              />
            </div>

          </div>
        )}

        {/* Tab 2: Client Proposal / PDF View */}
        {activeTab === 'proposal' && (
          <ClientQuoteView
            company={company}
            client={client}
            settings={settings}
            items={items}
            calculations={calculations}
            onBackToEdit={() => setActiveTab('calculator')}
            onPrint={handlePrintPdf}
          />
        )}

        {/* Tab 3: Detailed Settings View */}
        {activeTab === 'settings' && (
          <SettingsView
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onBackToCalculator={() => setActiveTab('calculator')}
          />
        )}

      </main>

      {/* Modals */}
      <CatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onAddItem={handleAddPresetItem}
        currentItems={items}
      />

      <CompanyModal
        isOpen={isCompanyOpen}
        onClose={() => setIsCompanyOpen(false)}
        company={company}
        onSaveCompany={(updated) => {
          setCompany(updated);
          showToast('Dados da empresa atualizados');
        }}
      />

      <ClientModal
        isOpen={isClientOpen}
        onClose={() => setIsClientOpen(false)}
        client={client}
        onSaveClient={(updated) => {
          setClient(updated);
          showToast('Dados do cliente atualizados');
        }}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedQuotes={savedQuotes}
        onLoadQuote={handleLoadQuote}
        onDeleteQuote={handleDeleteFromHistory}
        onNewQuote={handleNewQuote}
        onImportJson={handleImportJson}
        onExportJson={handleExportJson}
      />

    </div>
  );
}
