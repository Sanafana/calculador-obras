export type Unit = 'm²' | 'm³' | 'ml' | 'un' | 'hora' | 'dia' | 'vg' | 'kg';

export type Category =
  | 'Demolição e Estaleiro'
  | 'Alvenaria e Estruturas'
  | 'Pladur e Tetos Falsos'
  | 'Pinturas e Acabamentos'
  | 'Eletricidade e Iluminação'
  | 'Canalização e Sanitários'
  | 'Pavimentos e Revestimentos'
  | 'Carpintarias e Caixilharias'
  | 'Climatização e AVAC'
  | 'Isolamentos e Impermeabilização'
  | 'Outros Trabalhos';

export interface QuoteItem {
  id: string;
  category: Category;
  description: string;
  unit: Unit;
  quantity: number;
  materialUnitCost: number; // Custo de compra do material por unidade (€)
  laborUnitCost: number;    // Custo de mão de obra direta por unidade (€)
  notes?: string;
}

export interface CostSettings {
  wastePercent: number;        // Desperdício de materiais (% ex: 8%)
  indirectCostPercent: number; // Deslocações, ferramentas, estaleiro (% ex: 5%)
  contingencyPercent: number;  // Imprevistos e risco da obra (% ex: 5%)
  profitMarginPercent: number; // Margem de lucro bruto pretendida (% ex: 25%)
  vatRate: number;             // IVA: 6, 13, 23 ou 0
}

export interface CompanyInfo {
  name: string;
  commercialName: string;
  nif: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  iban: string;
  bankName: string;
  logoUrl?: string;
}

export interface ClientInfo {
  name: string;
  nif: string;
  phone: string;
  email: string;
  jobAddress: string;
  quoteNumber: string;
  quoteDate: string;
  validityDays: number;
  paymentTerms: string;
  workDuration: string;
  generalNotes: string;
}

export interface QuoteCalculations {
  rawMaterialCost: number;
  rawLaborCost: number;
  rawDirectCost: number;
  wasteAmount: number;
  materialCostWithWaste: number;
  indirectCostAmount: number;
  contingencyAmount: number;
  totalCostPrice: number; // Custo total para o construtor (materiais + mão obra + desperdício + estaleiro + imprevistos)
  
  profitAmount: number;   // Lucro bruto em €
  subtotalSellPrice: number; // Preço de venda sem IVA
  vatAmount: number;
  totalClientPrice: number;  // Preço final ao cliente com IVA

  profitPercentageOnCost: number; // Margem sobre o custo (%)
  profitPercentageOnSell: number; // Margem sobre a venda (%)
}

export interface StoredQuote {
  id: string;
  title: string;
  updatedAt: string;
  company: CompanyInfo;
  client: ClientInfo;
  settings: CostSettings;
  items: QuoteItem[];
}
