'use client';

import React from 'react';
import { StoredQuote } from '../lib/types';
import { calculateQuote, formatCurrency } from '../lib/calculations';
import { FolderOpen, X, Trash2, ArrowRight, PlusCircle, Download, Upload } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedQuotes: StoredQuote[];
  onLoadQuote: (quote: StoredQuote) => void;
  onDeleteQuote: (id: string) => void;
  onNewQuote: () => void;
  onImportJson: (file: File) => void;
  onExportJson: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  savedQuotes,
  onLoadQuote,
  onDeleteQuote,
  onNewQuote,
  onImportJson,
  onExportJson,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImportJson(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-bold text-slate-900">Histórico de Orçamentos Gravados</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons Top */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => {
              onNewQuote();
              onClose();
            }}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Criar Novo Orçamento em Branco</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onExportJson}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
              title="Guardar cópia de segurança em ficheiro JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Backup</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
              title="Carregar ficheiro JSON"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Importar</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* Quotes List */}
        <div className="p-6 overflow-y-auto max-h-96 space-y-3">
          {savedQuotes.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              <FolderOpen className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              Nenhum orçamento guardado no histórico. Guarde o orçamento atual ou crie um novo.
            </div>
          ) : (
            savedQuotes.map((quote) => {
              const calcs = calculateQuote(quote.items, quote.settings);

              return (
                <div
                  key={quote.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/20 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        {quote.client.quoteNumber || 'ORC'}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{quote.title || 'Sem título'}</h4>
                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                      Cliente: <strong className="text-slate-700">{quote.client.name}</strong> • {quote.items.length} trabalhos
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="text-slate-500">
                        Custo: <strong>{formatCurrency(calcs.totalCostPrice)}</strong>
                      </span>
                      <span className="text-emerald-700 font-semibold">
                        Lucro: <strong>{formatCurrency(calcs.profitAmount)}</strong>
                      </span>
                      <span className="text-slate-900 font-extrabold">
                        Total: <strong>{formatCurrency(calcs.totalClientPrice)}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => {
                        onLoadQuote(quote);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1 shadow-2xs"
                    >
                      <span>Abrir</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteQuote(quote.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Apagar do histórico"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold transition"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
