/*
 * Estilo partilhado pelos documentos de Propostas.
 *
 * Replica a identidade visual das propostas comerciais Tiago Duarte / Proposta Digital:
 * Faixa escura no topo de cada página com logótipo dourado e dados à esquerda,
 * assunto e referência à direita, secções numeradas com barra dourada,
 * tabelas alternadas, caixas de destaque e rodapé institucional.
 */

export const COR = {
  escuro: "#1A1A1A",
  dourado: "#C69A3E",
  douradoClaro: "#D9B463",
  texto: "#1F1F1F",
  apoio: "#6E6E6E",
  bege: "#F4F0E6",
  begeEscuro: "#EAE3D3",
  linha: "#E2DDD1",
  creme: "#FAF7F0",
  verde: "#2E9E63",
};

export const PROPONENTE = {
  nome: "TIAGO DUARTE",
  subtitulo: "PROPOSTA DIGITAL",
  email: "tfv.duarte@gmail.com",
  telefone: "917 288 208",
  local: "Milagres",
};

/** Logótipo: quadrado dourado com um raio em SVG */
export const LOGO_SVG = `
<svg width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
  <rect width="56" height="56" rx="16" fill="${COR.dourado}"/>
  <path d="M31 12 L20 30 h7 l-2 14 11-18 h-7 z" fill="#FFFFFF"/>
</svg>`;

export function abrirDocumento({ etiqueta, titulo, referencia }) {
  return `
<table class="documento">
<thead><tr><td>
<header class="faixa">
  <div class="marca">
    ${LOGO_SVG}
    <div>
      <p class="marca-nome">${PROPONENTE.nome}</p>
      <p class="marca-sub">${PROPONENTE.subtitulo}</p>
    </div>
  </div>
  <div class="assunto">
    <p class="assunto-etiqueta">${etiqueta}</p>
    <p class="assunto-titulo">${titulo}</p>
    <p class="assunto-ref">${referencia}</p>
  </div>
</header>
</td></tr></thead>
<tfoot><tr><td><div class="espaco-rodape"></div></td></tr></tfoot>
<tbody><tr><td>`;
}

export const fecharDocumento = `</td></tr></tbody></table>`;

export function estilos({ alturaCabecalho = 132 } = {}) {
  return `
  @page {
    size: A4;
    margin: 15mm 0 15mm 0;
  }

  @page :first {
    margin-top: 0;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: ${COR.texto};
    font-size: 10pt;
    line-height: 1.55;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    background: #fff;
  }

  .documento { width: 100%; border-collapse: collapse; }
  .documento > thead > tr > td,
  .documento > tfoot > tr > td,
  .documento > tbody > tr > td { padding: 0; }

  .espaco-rodape { height: 20px; }

  .faixa {
    height: ${alturaCabecalho}px;
    background: ${COR.escuro};
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 44px;
    border-bottom: 3px solid ${COR.dourado};
  }

  .marca { display: flex; align-items: center; gap: 16px; }
  .marca-nome {
    margin: 0;
    font-size: 14pt;
    font-weight: 700;
    letter-spacing: 0.22em;
  }
  .marca-sub {
    margin: 3px 0 0;
    font-size: 7pt;
    letter-spacing: 0.28em;
    color: #9A9A9A;
  }

  .assunto { text-align: right; }
  .assunto-etiqueta {
    margin: 0;
    font-size: 7.5pt;
    letter-spacing: 0.24em;
    color: ${COR.douradoClaro};
    font-weight: 600;
  }
  .assunto-titulo {
    margin: 4px 0 0;
    font-size: 16pt;
    font-weight: 700;
    color: #fff;
  }
  .assunto-ref {
    margin: 5px 0 0;
    font-size: 8pt;
    color: #9A9A9A;
  }

  main {
    padding: 28px 44px 20px;
  }

  h2 {
    font-size: 13pt;
    margin: 24px 0 10px;
    padding-left: 12px;
    border-left: 4px solid ${COR.dourado};
    line-height: 1.25;
    color: ${COR.escuro};
  }
  h2 .n { margin-right: 8px; color: ${COR.dourado}; font-weight: 700; }

  h3 {
    font-size: 10.5pt;
    color: ${COR.dourado};
    margin: 14px 0 4px;
    font-weight: 700;
  }

  h2, h3 {
    break-after: avoid;
    page-break-after: avoid;
    break-inside: avoid;
  }

  p { margin: 0 0 10px; }
  .apoio { color: ${COR.apoio}; }
  .pequeno { font-size: 8.5pt; }

  .destinatario {
    margin-bottom: 12px;
    font-size: 10pt;
    padding-bottom: 10px;
    border-bottom: 1px solid ${COR.linha};
  }
  .destinatario .sep { color: ${COR.linha}; margin: 0 12px; }

  table { width: 100%; border-collapse: collapse; margin: 12px 0 6px; }

  .tabela-cabeca th {
    background: ${COR.escuro};
    color: ${COR.douradoClaro};
    font-size: 7.5pt;
    letter-spacing: 0.18em;
    text-align: left;
    padding: 10px 16px;
  }
  .tabela-cabeca th:last-child { text-align: right; }

  td { padding: 12px 16px; vertical-align: top; }
  tr.linha td { background: ${COR.bege}; }
  tr.linha-alt td { background: ${COR.creme}; }
  td.valor { text-align: right; font-weight: 700; white-space: nowrap; font-size: 11.5pt; }
  td .desc { display: block; color: ${COR.apoio}; font-size: 8.5pt; margin-top: 3px; }

  tr.total td {
    background: ${COR.escuro};
    color: ${COR.douradoClaro};
    font-weight: 700;
    font-size: 11pt;
  }
  tr.total td.valor { color: #fff; font-size: 12.5pt; }

  .prazos td:first-child {
    width: 140px;
    color: ${COR.dourado};
    font-weight: 700;
  }
  .prazos tr td { background: ${COR.bege}; }
  .prazos tr:nth-child(even) td { background: ${COR.creme}; }

  .assinaturas {
    display: flex;
    gap: 48px;
    margin-top: 36px;
    page-break-inside: avoid;
  }
  .assinaturas > div { flex: 1; }
  .assinaturas .linha-assinatura {
    border-bottom: 1px solid ${COR.texto};
    height: 40px;
    margin-bottom: 6px;
  }

  .nota-rodape {
    font-size: 8pt;
    color: ${COR.apoio};
    margin-top: 6px;
  }

  .destaque-box {
    background: ${COR.creme};
    border: 1px solid ${COR.linha};
    border-left: 4px solid ${COR.dourado};
    padding: 12px 16px;
    border-radius: 4px;
    margin: 12px 0;
  }

  .rodape-documento {
    border-top: 1px solid ${COR.linha};
    padding-top: 10px;
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    font-size: 8pt;
    color: ${COR.apoio};
  }

  .evitar-corte { page-break-inside: avoid; }
`;
}
