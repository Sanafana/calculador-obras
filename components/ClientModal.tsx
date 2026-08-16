'use client';

import React from 'react';
import { ClientInfo } from '../lib/types';
import { UserCheck, X, Check, MapPin } from 'lucide-react';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientInfo;
  onSaveClient: (updated: ClientInfo) => void;
}

export const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  client,
  onSaveClient,
}) => {
  const [formData, setFormData] = React.useState<ClientInfo>(client);

  React.useEffect(() => {
    setFormData(client);
  }, [client, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveClient(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-sky-500" />
            <h2 className="text-lg font-bold text-slate-900">Dados do Cliente & Local da Obra</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Nome do Cliente / Dono de Obra</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: João Ferreira / Imobiliária Exemplo"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">NIF do Cliente (opcional)</label>
              <input
                type="text"
                value={formData.nif}
                onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: 234 567 890"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Telefone / Telemóvel</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: 961 234 567"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Email do Cliente</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: cliente@email.pt"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                Morada da Obra / Local de Execução
              </label>
              <input
                type="text"
                value={formData.jobAddress}
                onChange={(e) => setFormData({ ...formData, jobAddress: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: Rua das Flores, nº 45, 1º Esq, Lisboa"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Número do Orçamento</label>
              <input
                type="text"
                value={formData.quoteNumber}
                onChange={(e) => setFormData({ ...formData, quoteNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900 font-mono"
                placeholder="ORC-2026/042"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Data da Proposta</label>
              <input
                type="date"
                value={formData.quoteDate}
                onChange={(e) => setFormData({ ...formData, quoteDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Validade (dias)</label>
              <input
                type="number"
                min="1"
                value={formData.validityDays}
                onChange={(e) => setFormData({ ...formData, validityDays: parseInt(e.target.value) || 30 })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="30"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Prazo Estimado de Execução</label>
              <input
                type="text"
                value={formData.workDuration}
                onChange={(e) => setFormData({ ...formData, workDuration: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: 25 a 30 dias úteis"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Condições de Pagamento</label>
              <textarea
                rows={2}
                value={formData.paymentTerms}
                onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: 40% adjudicação, 40% meio da obra, 20% conclusão."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Garantia / Notas Gerais</label>
              <textarea
                rows={2}
                value={formData.generalNotes}
                onChange={(e) => setFormData({ ...formData, generalNotes: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Garantias legais, limpeza final, remoção de entulhos..."
              />
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Gravar Cliente</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
