'use client';

import React from 'react';
import { CostSettings, QuoteCalculations } from '../lib/types';
import { formatCurrency } from '../lib/calculations';
import { 
  TrendingUp, 
  ShieldCheck, 
  Percent, 
  AlertTriangle, 
  Truck, 
  DollarSign, 
  HelpCircle,
  PiggyBank
} from 'lucide-react';

interface CostSummarySidebarProps {
  settings: CostSettings;
  onUpdateSettings: (updates: Partial<CostSettings>) => void;
  calculations: QuoteCalculations;
}

export const CostSummarySidebar: React.FC<CostSummarySidebarProps> = ({
  settings,
  onUpdateSettings,
  calculations,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-6 sticky top-20 no-print">
      
      {/* Top Banner: Total Client Price Preview */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-xl p-4 shadow-sm border border-slate-700/50">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
          <span className="font-medium">Preço Final Proposta (c/ IVA)</span>
          <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded text-[11px] border border-amber-500/30">
            IVA {settings.vatRate}%
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight">
          {formatCurrency(calculations.totalClientPrice)}
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-slate-700/60">
          <span>Subtotal s/ IVA:</span>
          <span className="font-semibold text-slate-200">
            {formatCurrency(calculations.subtotalSellPrice)}
          </span>
        </div>
      </div>

      {/* Estimativa de Lucro do Empreiteiro */}
      <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <PiggyBank className="w-4 h-4 text-emerald-600" />
            Lucro Bruto Previsto
          </span>
          <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
            {calculations.profitPercentageOnCost}% s/ custo
          </span>
        </div>
        <div className="text-2xl font-black text-emerald-700">
          {formatCurrency(calculations.profitAmount)}
        </div>
        <p className="text-[11px] text-emerald-600/90 mt-1">
          Ganhos líquidos após cobrir todos os custos diretos, desperdício e imprevistos.
        </p>
      </div>

      {/* Sliders de Ajuste Automático */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Percent className="w-3.5 h-3.5 text-amber-500" />
          Margens & Coeficientes de Segurança
        </h4>

        {/* Margem de Lucro */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              Margem de Lucro
              <span className="text-[10px] text-slate-400 font-normal">(bruta)</span>
            </span>
            <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
              {settings.profitMarginPercent}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="60"
            step="1"
            value={settings.profitMarginPercent}
            onChange={(e) => onUpdateSettings({ profitMarginPercent: parseFloat(e.target.value) || 0 })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0% (Custo)</span>
            <span>25% (Recomendado)</span>
            <span>50%+</span>
          </div>
        </div>

        {/* Desperdício de Materiais */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              Desperdício de Material
              <span className="text-[10px] text-slate-400 font-normal">(cortes/quebras)</span>
            </span>
            <span className="text-slate-800 font-bold">{settings.wastePercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={settings.wastePercent}
            onChange={(e) => onUpdateSettings({ wastePercent: parseFloat(e.target.value) || 0 })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0%</span>
            <span>+ {formatCurrency(calculations.wasteAmount)} adicionados</span>
            <span>20%</span>
          </div>
        </div>

        {/* Imprevistos e Risco */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              Imprevistos & Risco
              <span className="text-[10px] text-slate-400 font-normal">(colchão)</span>
            </span>
            <span className="text-slate-800 font-bold">{settings.contingencyPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            step="1"
            value={settings.contingencyPercent}
            onChange={(e) => onUpdateSettings({ contingencyPercent: parseFloat(e.target.value) || 0 })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0%</span>
            <span>+ {formatCurrency(calculations.contingencyAmount)} reserva</span>
            <span>15%</span>
          </div>
        </div>

        {/* Custos Indiretos / Estaleiro */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              Estaleiro & Deslocações
              <span className="text-[10px] text-slate-400 font-normal">(logística)</span>
            </span>
            <span className="text-slate-800 font-bold">{settings.indirectCostPercent}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            step="1"
            value={settings.indirectCostPercent}
            onChange={(e) => onUpdateSettings({ indirectCostPercent: parseFloat(e.target.value) || 0 })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0%</span>
            <span>+ {formatCurrency(calculations.indirectCostAmount)}</span>
            <span>15%</span>
          </div>
        </div>

        {/* Taxa de IVA */}
        <div className="pt-2 border-t border-slate-100">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Taxa de IVA Aplicável
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { label: '23%', rate: 23, desc: 'Normal' },
              { label: '6%', rate: 6, desc: 'Reabilitação' },
              { label: '13%', rate: 13, desc: 'Intermédio' },
              { label: '0%', rate: 0, desc: 'Isento' },
            ].map((v) => (
              <button
                key={v.rate}
                onClick={() => onUpdateSettings({ vatRate: v.rate })}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center border ${
                  settings.vatRate === v.rate
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{v.label}</span>
                <span className="text-[9px] font-normal opacity-80">{v.desc}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Tabela Resumo dos Custos Internos (Confidencial) */}
      <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Decomposição do Custo Real
        </h4>

        <div className="flex justify-between text-slate-600">
          <span>Materiais (bruto):</span>
          <span className="font-semibold text-slate-800">{formatCurrency(calculations.rawMaterialCost)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>+ Desperdício ({settings.wastePercent}%):</span>
          <span className="font-semibold text-slate-800">{formatCurrency(calculations.wasteAmount)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Mão de Obra Direta:</span>
          <span className="font-semibold text-slate-800">{formatCurrency(calculations.rawLaborCost)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>+ Estaleiro ({settings.indirectCostPercent}%):</span>
          <span className="font-semibold text-slate-800">{formatCurrency(calculations.indirectCostAmount)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>+ Imprevistos ({settings.contingencyPercent}%):</span>
          <span className="font-semibold text-slate-800">{formatCurrency(calculations.contingencyAmount)}</span>
        </div>

        <div className="flex justify-between text-slate-900 font-bold pt-2 border-t border-dashed border-slate-200">
          <span>Custo Total de Produção:</span>
          <span className="text-rose-600">{formatCurrency(calculations.totalCostPrice)}</span>
        </div>

        <div className="flex justify-between text-emerald-800 font-bold">
          <span>+ Margem de Lucro ({settings.profitMarginPercent}%):</span>
          <span>+ {formatCurrency(calculations.profitAmount)}</span>
        </div>

        <div className="flex justify-between text-slate-900 font-extrabold pt-1">
          <span>Subtotal Venda (s/ IVA):</span>
          <span>{formatCurrency(calculations.subtotalSellPrice)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>IVA ({settings.vatRate}%):</span>
          <span>{formatCurrency(calculations.vatAmount)}</span>
        </div>
      </div>

    </div>
  );
};
