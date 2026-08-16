'use client';

import React from 'react';
import { CostSettings } from '../lib/types';
import { Sliders, Percent, ShieldCheck, Truck, AlertTriangle, Check, HelpCircle } from 'lucide-react';

interface SettingsViewProps {
  settings: CostSettings;
  onUpdateSettings: (updates: Partial<CostSettings>) => void;
  onBackToCalculator: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onBackToCalculator,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-500" />
            Parâmetros de Custos, Margens & IVA
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Defina como o motor calcula o custo real de obra, os fatores de segurança e a rentabilidade.
          </p>
        </div>

        <button
          onClick={onBackToCalculator}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-xs self-start sm:self-auto"
        >
          Voltar ao Calculador
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Margem de Lucro */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Margem de Lucro Bruto</h3>
              <p className="text-xs text-slate-500">Percentagem de lucro adicionada sobre o custo total de produção.</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">Margem Pretendida:</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.profitMarginPercent}
                  onChange={(e) => onUpdateSettings({ profitMarginPercent: parseFloat(e.target.value) || 0 })}
                  className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-right font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="font-bold text-slate-700">%</span>
              </div>
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
            <p className="text-[11px] text-slate-500">
              Valor típico em construção/reabilitação residencial: <strong>20% a 35%</strong>.
            </p>
          </div>
        </div>

        {/* Card 2: Desperdício de Materiais */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Desperdício & Quebras de Materiais</h3>
              <p className="text-xs text-slate-500">Compensação para cortes de cerâmica, placas de pladur, tintas, etc.</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">Taxa de Desperdício:</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={settings.wastePercent}
                  onChange={(e) => onUpdateSettings({ wastePercent: parseFloat(e.target.value) || 0 })}
                  className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-right font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="font-bold text-slate-700">%</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={settings.wastePercent}
              onChange={(e) => onUpdateSettings({ wastePercent: parseFloat(e.target.value) || 0 })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <p className="text-[11px] text-slate-500">
              Valor recomendado para remodelações: <strong>7% a 10%</strong>.
            </p>
          </div>
        </div>

        {/* Card 3: Imprevistos e Risco */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Margem para Imprevistos (Colchão de Risco)</h3>
              <p className="text-xs text-slate-500">Protege a empresa contra canos ocultos danificados, roços extra ou atrasos.</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">Fator de Risco:</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="25"
                  value={settings.contingencyPercent}
                  onChange={(e) => onUpdateSettings({ contingencyPercent: parseFloat(e.target.value) || 0 })}
                  className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-right font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="font-bold text-slate-700">%</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={settings.contingencyPercent}
              onChange={(e) => onUpdateSettings({ contingencyPercent: parseFloat(e.target.value) || 0 })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <p className="text-[11px] text-slate-500">
              Valor recomendado para obras em edifícios antigos: <strong>5% a 10%</strong>.
            </p>
          </div>
        </div>

        {/* Card 4: Estaleiro e Custos Indiretos */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Estaleiro, Combustível & Deslocações</h3>
              <p className="text-xs text-slate-500">Custo indireto de carrinhas, pequenas ferramentas, desgaste de discos e logística.</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">Custos Indiretos:</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={settings.indirectCostPercent}
                  onChange={(e) => onUpdateSettings({ indirectCostPercent: parseFloat(e.target.value) || 0 })}
                  className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-right font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="font-bold text-slate-700">%</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="1"
              value={settings.indirectCostPercent}
              onChange={(e) => onUpdateSettings({ indirectCostPercent: parseFloat(e.target.value) || 0 })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <p className="text-[11px] text-slate-500">
              Valor padrão: <strong>4% a 8%</strong>.
            </p>
          </div>
        </div>

      </div>

      {/* Explicação da Fórmula */}
      <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
          <HelpCircle className="w-4 h-4" />
          Como o Calculador blinda o construtor contra prejuízos:
        </h3>
        <div className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
          <p>
            1. <strong>Custo Direto:</strong> (Quantidade × Preço Material) + (Quantidade × Preço Mão de Obra).
          </p>
          <p>
            2. <strong>Ajuste de Desperdício:</strong> Aplica {settings.wastePercent}% apenas sobre os materiais para cobrir quebras e recortes.
          </p>
          <p>
            3. <strong>Fatores Indiretos e Risco:</strong> Adiciona {settings.indirectCostPercent}% de estaleiro/transporte + {settings.contingencyPercent}% de imprevistos. Isto gera o <strong>Custo Real Total de Produção</strong>.
          </p>
          <p>
            4. <strong>Aplicação da Margem:</strong> Aplica a margem de {settings.profitMarginPercent}% sobre a totalidade do custo, gerando o <strong>Preço de Venda sem IVA</strong>.
          </p>
          <p>
            5. <strong>Proposta ao Cliente:</strong> Na proposta final entregue ao cliente, cada linha de trabalho é automaticamente ajustada com a sua parcela de margem proporcional, garantindo que o cliente vê apenas preços unitários limpos e competitivos.
          </p>
        </div>
      </div>

    </div>
  );
};
