import { ClientInfo, CompanyInfo, CostSettings, QuoteItem, StoredQuote } from './types';
import { PRESET_ITEMS } from './presets';

export const DEFAULT_COMPANY: CompanyInfo = {
  name: 'Constrular - Obras e Remodelações, Lda.',
  commercialName: 'Constrular Remodelações',
  nif: '512 345 678',
  phone: '912 345 678',
  email: 'geral@constrular-obras.pt',
  address: 'Avenida da Liberdade, nº 100, 2º Dto',
  city: 'Lisboa',
  postalCode: '1250-140 Lisboa',
  iban: 'PT50 0033 0000 1234 5678 9012 3',
  bankName: 'Millennium BCP',
  logoUrl: '',
};

export const DEFAULT_CLIENT: ClientInfo = {
  name: 'António Silva',
  nif: '234 567 890',
  phone: '961 234 567',
  email: 'antonio.silva@email.pt',
  jobAddress: 'Rua das Flores, nº 45, 1º Esq, 1200-195 Lisboa',
  quoteNumber: 'ORC-2026/042',
  quoteDate: new Date().toISOString().split('T')[0],
  validityDays: 30,
  paymentTerms: '40% na adjudicação / início dos trabalhos, 40% a meio da execução, 20% na conclusão e entrega.',
  workDuration: '25 a 30 dias úteis a contar da data de início',
  generalNotes: 'Proposta inclui todos os materiais e mão de obra descritos, remoção de entulhos a vazadouro e limpeza final de obra. Garantia de 5 anos nos termos da lei.',
};

export const DEFAULT_SETTINGS: CostSettings = {
  wastePercent: 8,        // 8% de desperdício em materiais
  indirectCostPercent: 5, // 5% de estaleiro/deslocação
  contingencyPercent: 5,  // 5% de imprevistos
  profitMarginPercent: 25,// 25% de margem de lucro bruto
  vatRate: 23,            // 23% IVA normal
};

export const DEFAULT_SAMPLE_ITEMS: QuoteItem[] = [
  {
    id: 'item-1',
    category: 'Demolição e Estaleiro',
    description: 'Demolição manual de paredes de alvenaria simples c/ ensacamento e limpeza',
    unit: 'm²',
    quantity: 18,
    materialUnitCost: 1.5,
    laborUnitCost: 14.0,
    notes: 'Abertura de espaço para cozinha aberta (open-space)',
  },
  {
    id: 'item-2',
    category: 'Demolição e Estaleiro',
    description: 'Aluguer e colocação de contentor de entulho (5m³) c/ transporte a vazadouro autorizado e taxas',
    unit: 'un',
    quantity: 1,
    materialUnitCost: 165.0,
    laborUnitCost: 25.0,
  },
  {
    id: 'item-3',
    category: 'Pladur e Tetos Falsos',
    description: 'Execução de teto falso em gesso cartonado (Pladur 13mm) c/ estrutura metálica e isolamento em lã mineral',
    unit: 'm²',
    quantity: 42,
    materialUnitCost: 16.0,
    laborUnitCost: 15.0,
    notes: 'Sala e Cozinha com tratamento de juntas Q3',
  },
  {
    id: 'item-4',
    category: 'Pinturas e Acabamentos',
    description: 'Pintura geral de paredes interiores c/ 1 demão de primário e 2 demãos de tinta plástica lavável',
    unit: 'm²',
    quantity: 110,
    materialUnitCost: 3.8,
    laborUnitCost: 6.5,
    notes: 'Cor branco mate lavável CIN Vinylclean',
  },
  {
    id: 'item-5',
    category: 'Eletricidade e Iluminação',
    description: 'Ponto elétrico completo (tomada 2P+T ou interruptor) c/ abertura de roço, tubagem VD, cablagem e aparelhagem',
    unit: 'un',
    quantity: 16,
    materialUnitCost: 14.0,
    laborUnitCost: 22.0,
    notes: 'Série Efapel Logus90 branco',
  },
  {
    id: 'item-6',
    category: 'Eletricidade e Iluminação',
    description: 'Ponto de luz no teto c/ abertura em teto falso, cablagem e ligação de foco LED embutido',
    unit: 'un',
    quantity: 12,
    materialUnitCost: 12.0,
    laborUnitCost: 15.0,
    notes: 'Focos LED 7W 3000K branco quente',
  },
  {
    id: 'item-7',
    category: 'Pavimentos e Revestimentos',
    description: 'Fornecimento e colocação de piso flutuante laminado AC5 (8mm) c/ tela acústica de 2mm e rodapés lacados',
    unit: 'm²',
    quantity: 45,
    materialUnitCost: 19.5,
    laborUnitCost: 10.5,
    notes: 'Acabamento carvalho natural c/ rodapé 8cm branco',
  },
  {
    id: 'item-8',
    category: 'Outros Trabalhos',
    description: 'Limpeza profunda de fim de obra c/ máquinas industriais e produtos desincrustantes',
    unit: 'vg',
    quantity: 1,
    materialUnitCost: 40.0,
    laborUnitCost: 160.0,
  },
];

const STORAGE_KEY = 'vibe_calculador_obras_current';
const SAVED_LIST_KEY = 'vibe_calculador_obras_history';

export function loadCurrentDraft(): StoredQuote {
  if (typeof window === 'undefined') {
    return {
      id: 'draft-1',
      title: 'Remodelação T2 - ' + DEFAULT_CLIENT.name,
      updatedAt: new Date().toISOString(),
      company: DEFAULT_COMPANY,
      client: DEFAULT_CLIENT,
      settings: DEFAULT_SETTINGS,
      items: DEFAULT_SAMPLE_ITEMS,
    };
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Erro ao ler draft:', e);
  }

  return {
    id: 'draft-1',
    title: 'Remodelação T2 - ' + DEFAULT_CLIENT.name,
    updatedAt: new Date().toISOString(),
    company: DEFAULT_COMPANY,
    client: DEFAULT_CLIENT,
    settings: DEFAULT_SETTINGS,
    items: DEFAULT_SAMPLE_ITEMS,
  };
}

export function saveCurrentDraft(quote: StoredQuote) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quote));
  } catch (e) {
    console.error('Erro ao guardar draft:', e);
  }
}

export function getSavedQuotesList(): StoredQuote[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(SAVED_LIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(quote: StoredQuote) {
  if (typeof window === 'undefined') return;
  try {
    const list = getSavedQuotesList();
    const existingIndex = list.findIndex((q) => q.id === quote.id);
    const updated = { ...quote, updatedAt: new Date().toISOString() };

    let newList: StoredQuote[];
    if (existingIndex >= 0) {
      newList = [...list];
      newList[existingIndex] = updated;
    } else {
      newList = [updated, ...list];
    }
    localStorage.setItem(SAVED_LIST_KEY, JSON.stringify(newList));
  } catch (e) {
    console.error('Erro ao guardar histórico:', e);
  }
}

export function deleteFromHistory(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const list = getSavedQuotesList();
    const newList = list.filter((q) => q.id !== id);
    localStorage.setItem(SAVED_LIST_KEY, JSON.stringify(newList));
  } catch (e) {
    console.error('Erro ao apagar do histórico:', e);
  }
}
