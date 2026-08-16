import { CostSettings, QuoteCalculations, QuoteItem } from './types';

export function calculateQuote(items: QuoteItem[], settings: CostSettings): QuoteCalculations {
  let rawMaterialCost = 0;
  let rawLaborCost = 0;

  for (const item of items) {
    const qty = Number(item.quantity) || 0;
    const matUnit = Number(item.materialUnitCost) || 0;
    const labUnit = Number(item.laborUnitCost) || 0;

    rawMaterialCost += qty * matUnit;
    rawLaborCost += qty * labUnit;
  }

  const rawDirectCost = rawMaterialCost + rawLaborCost;

  // Desperdício de materiais (% sobre os materiais)
  const wastePercent = Number(settings.wastePercent) || 0;
  const wasteAmount = rawMaterialCost * (wastePercent / 100);
  const materialCostWithWaste = rawMaterialCost + wasteAmount;

  // Base de custo direto ajustado com desperdício
  const adjustedDirectCost = materialCostWithWaste + rawLaborCost;

  // Custos indiretos / estaleiro (% sobre o custo direto ajustado)
  const indirectPercent = Number(settings.indirectCostPercent) || 0;
  const indirectCostAmount = adjustedDirectCost * (indirectPercent / 100);

  // Imprevistos e Risco (% sobre a soma anterior)
  const contingencyPercent = Number(settings.contingencyPercent) || 0;
  const baseBeforeContingency = adjustedDirectCost + indirectCostAmount;
  const contingencyAmount = baseBeforeContingency * (contingencyPercent / 100);

  // Custo Total de Produção (Cost Price para o empreiteiro)
  const totalCostPrice = baseBeforeContingency + contingencyAmount;

  // Margem de Lucro Bruta (% sobre o Custo Total)
  const profitMarginPercent = Number(settings.profitMarginPercent) || 0;
  const profitAmount = totalCostPrice * (profitMarginPercent / 100);

  // Preço de Venda sem IVA (Subtotal da proposta)
  const subtotalSellPrice = totalCostPrice + profitAmount;

  // IVA
  const vatRate = Number(settings.vatRate) || 0;
  const vatAmount = subtotalSellPrice * (vatRate / 100);
  const totalClientPrice = subtotalSellPrice + vatAmount;

  // Métricas de rentabilidade
  const profitPercentageOnCost = totalCostPrice > 0 ? (profitAmount / totalCostPrice) * 100 : 0;
  const profitPercentageOnSell = subtotalSellPrice > 0 ? (profitAmount / subtotalSellPrice) * 100 : 0;

  return {
    rawMaterialCost: round2(rawMaterialCost),
    rawLaborCost: round2(rawLaborCost),
    rawDirectCost: round2(rawDirectCost),
    wasteAmount: round2(wasteAmount),
    materialCostWithWaste: round2(materialCostWithWaste),
    indirectCostAmount: round2(indirectCostAmount),
    contingencyAmount: round2(contingencyAmount),
    totalCostPrice: round2(totalCostPrice),
    profitAmount: round2(profitAmount),
    subtotalSellPrice: round2(subtotalSellPrice),
    vatAmount: round2(vatAmount),
    totalClientPrice: round2(totalClientPrice),
    profitPercentageOnCost: round2(profitPercentageOnCost),
    profitPercentageOnSell: round2(profitPercentageOnSell),
  };
}

export function calculateItemClientPrice(item: QuoteItem, calculations: QuoteCalculations): {
  unitPrice: number;
  totalPrice: number;
} {
  const qty = Number(item.quantity) || 0;
  const directCostItem = (Number(item.materialUnitCost) || 0) + (Number(item.laborUnitCost) || 0);

  // Proporção de acréscimo global (Custo + Desperdício + Indiretos + Imprevistos + Margem) sobre o Custo Direto Bruto
  const globalMultiplier = calculations.rawDirectCost > 0
    ? calculations.subtotalSellPrice / calculations.rawDirectCost
    : 1;

  const itemSellUnitPrice = directCostItem * globalMultiplier;
  const itemSellTotalPrice = itemSellUnitPrice * qty;

  return {
    unitPrice: round2(itemSellUnitPrice),
    totalPrice: round2(itemSellTotalPrice),
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat('pt-PT', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(val);
}

function round2(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}
