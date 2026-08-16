# Calculador de Custos & Gerador de Orçamentos de Obras

Aplicação web profissional e intuitiva criada para construtores, empreiteiros e profissionais de remodelações calcularem com precisão o custo real de cada obra, protegerem as suas margens e gerarem propostas comerciais em PDF em menos de 5 minutos, sem precisarem de mexer no Excel.

---

## Principais Funcionalidades

1. **Catálogo de Tarefas Pré-Configurado (Mercado Português)**
   - Preços médios de materiais e mão de obra em Portugal para: Demolições, Alvenarias, Pladur/Tetos, Pinturas, Eletricidade, Canalização, Pavimentos/Revestimentos, Carpintarias/Caixilharias, Climatização/AVAC e Isolamentos.
   - Adição com 1 clique de artigos com quantidades e custos predefinidos.

2. **Blindagem de Custos & Margens em Tempo Real**
   - **Desperdício de Material:** Ajuste percentual (ex: 8%) para cobrir quebras e cortes.
   - **Estaleiro & Deslocações:** Custos indiretos de transporte e ferramentas (ex: 5%).
   - **Imprevistos & Risco:** Colchão de segurança para imprevistos em obra (ex: 5%).
   - **Margem de Lucro Bruta:** Ajuste imediato por slider (ex: 25%) com cálculo do lucro líquido em euros (€).
   - **IVA Configurável:** 23% (Normal), 6% (Reabilitação Urbana), 13% ou Isenção.

3. **Duas Vistas: Painel Interno vs Proposta de Cliente**
   - **Vista do Empreiteiro:** Decomposição total de custos de compra, mão de obra e lucro real.
   - **Vista do Cliente:** Proposta limpa e formal com preços unitários ajustados, sem revelar os custos internos e margens do construtor.

4. **Exportação & Impressão PDF Formato A4**
   - Folha timbrada com dados da empresa, NIF, IBAN para pagamento, condições de adjudicação, prazos e campos de assinatura formal.

5. **Histórico & Salvaguarda Local**
   - Gravação automática em tempo real no browser (`localStorage`).
   - Gestão de múltiplos orçamentos no Histórico.
   - Exportação e importação de backups em formato JSON.

---

## Como Executar Localmente

```bash
cd /Users/greenboblin/Documents/VibeCode/calculador-obras
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
