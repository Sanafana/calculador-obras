'use client';

import React, { useState } from 'react';
import { Category, QuoteItem } from '../lib/types';
import { PRESET_CATEGORIES, PRESET_ITEMS, PresetItem } from '../lib/presets';
import { formatCurrency } from '../lib/calculations';
import { Search, Plus, Check, X, Tag } from 'lucide-react';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (preset: PresetItem) => void;
  currentItems: QuoteItem[];
}

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  onAddItem,
  currentItems,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const filteredItems = PRESET_ITEMS.filter((item) => {
    const matchCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const handleAdd = (preset: PresetItem) => {
    onAddItem(preset);
    setAddedIds((prev) => ({ ...prev, [preset.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [preset.id]: false }));
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-500" />
              Catálogo de Preços & Serviços de Obras
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Escolha as tarefas prontas com custos médios de materiais e mão de obra (preços PT-PT).
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="p-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por trabalho (ex: pladur, pintura, demolição, cerâmico)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-800 placeholder-slate-400"
            />
          </div>

          <div className="sm:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-700 font-medium"
            >
              <option value="Todas">Todas as Categorias ({PRESET_ITEMS.length})</option>
              {PRESET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Items List */}
        <div className="p-6 overflow-y-auto flex-1 divide-y divide-slate-100 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Nenhum serviço encontrado para a pesquisa indicada.
            </div>
          ) : (
            filteredItems.map((item) => {
              const directUnitCost = item.materialUnitCost + item.laborUnitCost;
              const isRecentlyAdded = addedIds[item.id];

              return (
                <div
                  key={item.id}
                  className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200/60"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Unidade: {item.unit}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mt-1">{item.description}</h3>
                    {item.notes && <p className="text-xs text-slate-500 mt-0.5">{item.notes}</p>}
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-600">
                      <span>
                        Materiais: <strong className="text-slate-800">{formatCurrency(item.materialUnitCost)}/{item.unit}</strong>
                      </span>
                      <span>
                        Mão de Obra: <strong className="text-slate-800">{formatCurrency(item.laborUnitCost)}/{item.unit}</strong>
                      </span>
                      <span className="bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded">
                        Custo Base: {formatCurrency(directUnitCost)}/{item.unit}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleAdd(item)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition ${
                        isRecentlyAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                      }`}
                    >
                      {isRecentlyAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Adicionado!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Adicionar à Obra</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-2xl">
          <span className="text-xs text-slate-500">
            A mostrar {filteredItems.length} de {PRESET_ITEMS.length} serviços disponíveis.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold transition"
          >
            Concluir / Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
