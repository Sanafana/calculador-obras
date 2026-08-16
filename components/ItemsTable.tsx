'use client';

import React from 'react';
import { Category, QuoteItem, Unit } from '../lib/types';
import { PRESET_CATEGORIES } from '../lib/presets';
import { formatCurrency } from '../lib/calculations';
import { 
  Trash2, 
  Copy, 
  Plus, 
  MessageSquare, 
  Layers, 
  Hammer, 
  Package, 
  HelpCircle 
} from 'lucide-react';

interface ItemsTableProps {
  items: QuoteItem[];
  onUpdateItem: (id: string, updates: Partial<QuoteItem>) => void;
  onDeleteItem: (id: string) => void;
  onDuplicateItem: (id: string) => void;
  onAddCustomItem: (category?: Category) => void;
  onOpenCatalog: () => void;
}

const UNITS: Unit[] = ['m²', 'm³', 'ml', 'un', 'hora', 'dia', 'vg', 'kg'];

export const ItemsTable: React.FC<ItemsTableProps> = ({
  items,
  onUpdateItem,
  onDeleteItem,
  onDuplicateItem,
  onAddCustomItem,
  onOpenCatalog,
}) => {
  // Group items by category preserving category order
  const categoriesPresent = Array.from(new Set(items.map((i) => i.category)));

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300 shadow-xs">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Layers className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Ainda não adicionou trabalhos à obra</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
          Comece por selecionar tarefas comuns do catálogo pré-configurado ou adicione itens personalizados.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onOpenCatalog}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Abrir Catálogo de Serviços</span>
          </button>
          <button
            onClick={() => onAddCustomItem()}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Artigo Personalizado</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Table Control Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 text-sm">Trabalhos & Medições da Obra</span>
          <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full">
            {items.length} {items.length === 1 ? 'artigo' : 'artigos'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCatalog}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition shadow-2xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Catálogo</span>
          </button>
          <button
            onClick={() => onAddCustomItem()}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition shadow-2xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Artigo Manual</span>
          </button>
        </div>
      </div>

      {/* Category Groups */}
      {categoriesPresent.map((category) => {
        const categoryItems = items.filter((i) => i.category === category);
        const categoryMaterialTotal = categoryItems.reduce(
          (acc, i) => acc + (Number(i.quantity) || 0) * (Number(i.materialUnitCost) || 0),
          0
        );
        const categoryLaborTotal = categoryItems.reduce(
          (acc, i) => acc + (Number(i.quantity) || 0) * (Number(i.laborUnitCost) || 0),
          0
        );
        const categoryDirectTotal = categoryMaterialTotal + categoryLaborTotal;

        return (
          <div key={category} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Category Header */}
            <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">{category}</h3>
                <span className="text-xs text-slate-400">({categoryItems.length})</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                <span>
                  Mat: <strong className="text-slate-900">{formatCurrency(categoryMaterialTotal)}</strong>
                </span>
                <span>
                  Mão de Obra: <strong className="text-slate-900">{formatCurrency(categoryLaborTotal)}</strong>
                </span>
                <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                  Subtotal Base: {formatCurrency(categoryDirectTotal)}
                </span>
                <button
                  onClick={() => onAddCustomItem(category)}
                  className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1 hover:underline ml-2"
                >
                  <Plus className="w-3 h-3" />
                  Item nesta categoria
                </button>
              </div>
            </div>

            {/* Desktop / Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[11px] font-bold tracking-wider bg-slate-50/30">
                    <th className="py-2.5 px-4 w-5/12">Descrição do Trabalho</th>
                    <th className="py-2.5 px-2 w-24 text-center">Unidade</th>
                    <th className="py-2.5 px-2 w-28 text-right">Qtd</th>
                    <th className="py-2.5 px-2 w-32 text-right">
                      <span className="flex items-center justify-end gap-1" title="Custo de compra do material">
                        <Package className="w-3 h-3 text-slate-400" /> Custo Mat. (€)
                      </span>
                    </th>
                    <th className="py-2.5 px-2 w-32 text-right">
                      <span className="flex items-center justify-end gap-1" title="Custo de mão de obra direta">
                        <Hammer className="w-3 h-3 text-slate-400" /> Custo M.O. (€)
                      </span>
                    </th>
                    <th className="py-2.5 px-3 w-32 text-right font-bold text-slate-700">Total Base</th>
                    <th className="py-2.5 px-2 w-20 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categoryItems.map((item) => {
                    const itemQty = Number(item.quantity) || 0;
                    const itemMat = Number(item.materialUnitCost) || 0;
                    const itemLab = Number(item.laborUnitCost) || 0;
                    const itemTotal = itemQty * (itemMat + itemLab);

                    return (
                      <tr key={item.id} className="hover:bg-amber-50/20 transition group">
                        {/* Description & Notes */}
                        <td className="py-2.5 px-4">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => onUpdateItem(item.id, { description: e.target.value })}
                            className="w-full bg-transparent border border-transparent hover:border-slate-200 focus:border-amber-400 focus:bg-white rounded px-2 py-1 text-slate-900 font-medium text-xs sm:text-sm outline-none transition"
                            placeholder="Descrição do serviço..."
                          />
                          {item.notes !== undefined ? (
                            <div className="mt-1 flex items-center gap-1.5 px-2">
                              <MessageSquare className="w-3 h-3 text-slate-400 shrink-0" />
                              <input
                                type="text"
                                value={item.notes || ''}
                                onChange={(e) => onUpdateItem(item.id, { notes: e.target.value })}
                                placeholder="Especificação técnica, marca ou nota para a proposta..."
                                className="w-full bg-transparent text-[11px] text-slate-500 hover:text-slate-700 border-b border-dashed border-slate-200 focus:border-amber-400 outline-none pb-0.5"
                              />
                            </div>
                          ) : (
                            <button
                              onClick={() => onUpdateItem(item.id, { notes: '' })}
                              className="text-[11px] text-slate-400 hover:text-amber-600 ml-2 mt-0.5 opacity-0 group-hover:opacity-100 transition inline-block"
                            >
                              + Adicionar nota técnica
                            </button>
                          )}
                        </td>

                        {/* Unit */}
                        <td className="py-2.5 px-2 text-center">
                          <select
                            value={item.unit}
                            onChange={(e) => onUpdateItem(item.id, { unit: e.target.value as Unit })}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700 outline-none focus:ring-1 focus:ring-amber-500 text-center"
                          >
                            {UNITS.map((u) => (
                              <option key={u} value={u}>
                                {u}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Quantity */}
                        <td className="py-2.5 px-2 text-right">
                          <input
                            type="number"
                            min="0"
                            step="any"
                            value={item.quantity === 0 ? '' : item.quantity}
                            onChange={(e) =>
                              onUpdateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })
                            }
                            className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-right font-bold text-slate-900 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white"
                          />
                        </td>

                        {/* Material Unit Cost */}
                        <td className="py-2.5 px-2 text-right">
                          <div className="relative inline-block">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.materialUnitCost === 0 ? '' : item.materialUnitCost}
                              onChange={(e) =>
                                onUpdateItem(item.id, {
                                  materialUnitCost: parseFloat(e.target.value) || 0,
                                })
                              }
                              className="w-28 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-right font-medium text-slate-800 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white"
                              placeholder="0.00"
                            />
                          </div>
                        </td>

                        {/* Labor Unit Cost */}
                        <td className="py-2.5 px-2 text-right">
                          <div className="relative inline-block">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.laborUnitCost === 0 ? '' : item.laborUnitCost}
                              onChange={(e) =>
                                onUpdateItem(item.id, {
                                  laborUnitCost: parseFloat(e.target.value) || 0,
                                })
                              }
                              className="w-28 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-right font-medium text-slate-800 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white"
                              placeholder="0.00"
                            />
                          </div>
                        </td>

                        {/* Line Total */}
                        <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                          {formatCurrency(itemTotal)}
                        </td>

                        {/* Actions */}
                        <td className="py-2.5 px-2 text-center">
                          <div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition">
                            <button
                              onClick={() => onDuplicateItem(item.id)}
                              title="Duplicar linha"
                              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteItem(item.id)}
                              title="Apagar linha"
                              className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};
