'use client';

import React from 'react';
import { ClientInfo, CompanyInfo, CostSettings, QuoteCalculations, QuoteItem } from '../lib/types';
import { calculateItemClientPrice, formatCurrency, formatNumber } from '../lib/calculations';
import { Building2, User, Calendar, Clock, CreditCard, ShieldCheck, Printer, ArrowLeft } from 'lucide-react';

interface ClientQuoteViewProps {
  company: CompanyInfo;
  client: ClientInfo;
  settings: CostSettings;
  items: QuoteItem[];
  calculations: QuoteCalculations;
  onBackToEdit: () => void;
  onPrint: () => void;
}

export const ClientQuoteView: React.FC<ClientQuoteViewProps> = ({
  company,
  client,
  settings,
  items,
  calculations,
  onBackToEdit,
  onPrint,
}) => {
  // Group items by category
  const categories = Array.from(new Set(items.map((i) => i.category)));

  return (
    <div className="space-y-6">
      {/* Control Banner (Hidden on Print) */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md no-print">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à Edição</span>
          </button>
          <div>
            <h3 className="font-bold text-sm">Pré-visualização da Proposta Comercial</h3>
            <p className="text-xs text-slate-400">
              Esta é a versão formal sem custos internos que é impressa ou guardada em PDF para o cliente.
            </p>
          </div>
        </div>

        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir / Guardar PDF</span>
        </button>
      </div>

      {/* Printable A4 Proposal Sheet */}
      <div className="bg-white text-slate-900 rounded-2xl shadow-lg border border-slate-200 p-8 sm:p-12 max-w-4xl mx-auto print-page print:border-none print:shadow-none print:p-0">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-900 pb-6 gap-6">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950 uppercase">
              {company.commercialName || company.name}
            </h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              Construção Civil & Remodelações
            </p>
            
            <div className="mt-3 text-xs text-slate-600 space-y-0.5">
              <p>{company.address} — {company.postalCode} {company.city}</p>
              <p>NIF: <span className="font-semibold text-slate-900">{company.nif}</span></p>
              <p>Tel: {company.phone} | Email: {company.email}</p>
            </div>
          </div>

          <div className="text-left sm:text-right bg-slate-50 p-4 rounded-xl border border-slate-200 sm:bg-transparent sm:p-0 sm:border-none">
            <div className="inline-block bg-slate-900 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 print:bg-slate-900">
              PROPOSTA DE ORÇAMENTO
            </div>
            <p className="text-base font-extrabold text-slate-950">{client.quoteNumber || 'ORC-2026'}</p>
            <p className="text-xs text-slate-600 mt-1">Data: <span className="font-medium">{client.quoteDate}</span></p>
            <p className="text-xs text-slate-600">Validade: <span className="font-medium">{client.validityDays} dias</span></p>
          </div>
        </div>

        {/* Client & Job Location Box */}
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-1">
              Destinatário / Cliente
            </span>
            <p className="font-bold text-slate-900 text-sm">{client.name}</p>
            {client.nif && <p className="text-slate-600 mt-0.5">NIF: {client.nif}</p>}
            {client.phone && <p className="text-slate-600">Tel: {client.phone}</p>}
            {client.email && <p className="text-slate-600">Email: {client.email}</p>}
          </div>

          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block mb-1">
              Local da Obra / Execução
            </span>
            <p className="font-semibold text-slate-900">{client.jobAddress || 'A indicar'}</p>
            <p className="text-slate-500 mt-2 text-[11px]">
              Prazo Estimado: <strong className="text-slate-800">{client.workDuration}</strong>
            </p>
          </div>
        </div>

        {/* Items Table by Category */}
        <div className="space-y-6 my-6">
          {categories.map((cat, catIdx) => {
            const catItems = items.filter((i) => i.category === cat);
            let catTotal = 0;

            return (
              <div key={cat} className="page-break-inside-avoid">
                <div className="bg-slate-100 px-3 py-1.5 rounded-t-lg border-b border-slate-300 font-bold text-xs uppercase tracking-wider text-slate-800 flex justify-between">
                  <span>{catIdx + 1}. {cat}</span>
                </div>

                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-[10px] uppercase font-semibold">
                      <th className="py-2 px-3 w-7/12">Discriminação dos Trabalhos</th>
                      <th className="py-2 px-2 w-16 text-center">Unid.</th>
                      <th className="py-2 px-2 w-16 text-right">Qtd</th>
                      <th className="py-2 px-2 w-24 text-right">Pr. Unit.</th>
                      <th className="py-2 px-3 w-28 text-right font-bold text-slate-800">Total (€)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {catItems.map((item) => {
                      const clientPrice = calculateItemClientPrice(item, calculations);
                      catTotal += clientPrice.totalPrice;

                      return (
                        <tr key={item.id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3">
                            <p className="font-semibold text-slate-900">{item.description}</p>
                            {item.notes && (
                              <p className="text-[11px] text-slate-500 italic mt-0.5">{item.notes}</p>
                            )}
                          </td>
                          <td className="py-2.5 px-2 text-center text-slate-600 font-mono">{item.unit}</td>
                          <td className="py-2.5 px-2 text-right font-semibold text-slate-800">
                            {formatNumber(item.quantity)}
                          </td>
                          <td className="py-2.5 px-2 text-right text-slate-600 font-mono">
                            {formatCurrency(clientPrice.unitPrice)}
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-slate-900 font-mono">
                            {formatCurrency(clientPrice.totalPrice)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50/50 font-bold text-xs border-t border-slate-200">
                      <td colSpan={4} className="py-1.5 px-3 text-right text-slate-600">
                        Subtotal {cat}:
                      </td>
                      <td className="py-1.5 px-3 text-right text-slate-900 font-mono">
                        {formatCurrency(catTotal)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            );
          })}
        </div>

        {/* Totals Summary Table */}
        <div className="page-break-inside-avoid flex justify-end my-8">
          <div className="w-full sm:w-80 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between text-slate-700">
              <span>Total dos Trabalhos (s/ IVA):</span>
              <span className="font-bold text-slate-900 font-mono">
                {formatCurrency(calculations.subtotalSellPrice)}
              </span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>IVA ({settings.vatRate}%):</span>
              <span className="font-bold text-slate-900 font-mono">
                {formatCurrency(calculations.vatAmount)}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t-2 border-slate-900">
              <span>VALOR TOTAL:</span>
              <span className="text-slate-950 font-mono">
                {formatCurrency(calculations.totalClientPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Conditions, Bank Details & Notes */}
        <div className="page-break-inside-avoid space-y-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">
                Condições de Pagamento
              </h4>
              <p className="text-slate-700 leading-relaxed">{client.paymentTerms}</p>

              {company.iban && (
                <div className="mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px]">
                  <p className="font-semibold text-slate-900">Dados para Transferência Bancária:</p>
                  <p className="font-mono text-slate-800 font-bold">{company.iban}</p>
                  {company.bankName && <p className="text-slate-500">Banco: {company.bankName}</p>}
                </div>
              )}
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider mb-1">
                Garantia e Notas Gerais
              </h4>
              <p className="text-slate-700 leading-relaxed">{client.generalNotes}</p>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-8 mt-6 border-t border-slate-200">
            <div className="text-center">
              <div className="border-b border-slate-400 w-48 mx-auto mb-1"></div>
              <p className="text-[10px] font-bold uppercase text-slate-500">Pela Empresa</p>
              <p className="text-[11px] font-semibold text-slate-800">{company.name}</p>
            </div>
            <div className="text-center">
              <div className="border-b border-slate-400 w-48 mx-auto mb-1"></div>
              <p className="text-[10px] font-bold uppercase text-slate-500">O Cliente (Aceitação da Proposta)</p>
              <p className="text-[11px] font-semibold text-slate-800">{client.name}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
