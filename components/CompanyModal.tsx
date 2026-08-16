'use client';

import React from 'react';
import { CompanyInfo } from '../lib/types';
import { Building2, X, Check } from 'lucide-react';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyInfo;
  onSaveCompany: (updated: CompanyInfo) => void;
}

export const CompanyModal: React.FC<CompanyModalProps> = ({
  isOpen,
  onClose,
  company,
  onSaveCompany,
}) => {
  const [formData, setFormData] = React.useState<CompanyInfo>(company);

  React.useEffect(() => {
    setFormData(company);
  }, [company, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCompany(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900">Dados da Empresa / Empreiteiro</h2>
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
              <label className="block font-semibold text-slate-700 mb-1">Razão Social / Nome da Empresa</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: Constrular Obras e Remodelações, Lda."
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nome Comercial / Marca</label>
              <input
                type="text"
                value={formData.commercialName}
                onChange={(e) => setFormData({ ...formData, commercialName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: Constrular"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">NIF da Empresa</label>
              <input
                type="text"
                value={formData.nif}
                onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: 512 345 678"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Telefone / Telemóvel</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: 912 345 678"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email de Contacto</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: geral@empresa.pt"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Morada da Sede / Escritório</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: Av. da Liberdade, nº 100, 2º Dto"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Código Postal & Localidade</label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: 1250-140 Lisboa"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Cidade</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: Lisboa"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">IBAN para Pagamento</label>
              <input
                type="text"
                value={formData.iban}
                onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900 font-mono"
                placeholder="PT50 0000 ..."
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nome do Banco</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-slate-900"
                placeholder="Ex: Millennium BCP / CGD / Santander"
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
              <span>Gravar Dados</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
