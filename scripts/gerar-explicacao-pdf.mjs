import { readFile, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import { abrirDocumento, fecharDocumento, estilos, COR, PROPONENTE } from "./marca-propostas.mjs";

const ECRAS = "/Users/greenboblin/Documents/VibeCode/calculador-obras/Propostas/ecras/";

async function ecra(nome) {
  try {
    const dados = await readFile(`${ECRAS}${nome}.png`);
    return `data:image/png;base64,${dados.toString("base64")}`;
  } catch (err) {
    console.error(`Erro ao carregar ecra ${nome}:`, err);
    return "";
  }
}

function seccao({ titulo, tag, texto, imagem, legenda }) {
  return `
<section class="bloco" style="margin-bottom: 24px; page-break-inside: avoid;">
  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
    <h2 style="margin: 0; padding-left: 10px; border-left: 4px solid ${COR.dourado}; font-size: 13pt; color: ${COR.escuro};">${titulo}</h2>
    <span style="font-size: 7.5pt; font-weight: 700; color: ${COR.dourado}; background: ${COR.creme}; border: 1px solid ${COR.linha}; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.15em;">${tag}</span>
  </div>
  <p style="margin: 6px 0 10px; font-size: 9.5pt; color: ${COR.texto};">${texto}</p>
  ${
    imagem
      ? `<figure style="margin: 0; border: 1px solid ${COR.linha}; border-radius: 6px; overflow: hidden; background: #fafafa; box-shadow: 0 2px 6px rgba(0,0,0,0.06);">
           <div style="background: #e5e5e5; padding: 6px 12px; display: flex; align-items: center; gap: 6px; border-bottom: 1px solid ${COR.linha};">
             <span style="width: 8px; height: 8px; border-radius: 50%; background: #ff5f56; display: inline-block;"></span>
             <span style="width: 8px; height: 8px; border-radius: 50%; background: #ffbd2e; display: inline-block;"></span>
             <span style="width: 8px; height: 8px; border-radius: 50%; background: #27c93f; display: inline-block;"></span>
             <span style="font-size: 7.5pt; color: ${COR.apoio}; margin-left: 10px; font-family: monospace;">calculador-obras.app</span>
           </div>
           <img src="${imagem}" alt="${titulo}" style="width: 100%; display: block; max-height: 380px; object-fit: cover; object-position: top;">
         </figure>
         ${legenda ? `<p style="font-size: 8pt; color: ${COR.apoio}; text-align: center; margin: 4px 0 0; font-style: italic;">${legenda}</p>` : ""}`
      : ""
  }
</section>`;
}

async function gerarExplicacaoPdf() {
  const [calculadorImg, catalogoImg, propostaImg, definicoesImg, historicoImg] = await Promise.all([
    ecra("calculador"),
    ecra("catalogo"),
    ecra("proposta"),
    ecra("definicoes"),
    ecra("historico"),
  ]);

  const html = `<!doctype html>
<html lang="pt-PT">
<head>
  <meta charset="utf-8">
  <title>Calculador de Obras — O Software Explicado</title>
  <style>
    ${estilos()}
    main { padding: 24px 44px 20px; }
  </style>
</head>
<body>

${abrirDocumento({
  etiqueta: "GUIA DO SOFTWARE",
  titulo: "Calculador de Obras Explicado",
  referencia: "Guia Funcional e Apresentação",
})}

<main>
  <div style="margin-bottom: 18px;">
    <h1 style="font-size: 20pt; line-height: 1.2; margin: 0 0 6px; color: ${COR.escuro};">O Software está pronto. Aqui está como funciona, secção a secção.</h1>
    <p style="font-size: 10.5pt; color: ${COR.apoio}; margin: 0 0 14px;">
      Desenvolvido especificamente para simplificar o dia a dia do empreiteiro: cálculo rigoroso de custos reais e emissão de orçamentos profissionais em PDF sem complicações.
    </p>
    <div style="display: flex; gap: 10px; margin-bottom: 16px;">
      <span style="background:${COR.creme}; border:1px solid ${COR.linha}; border-radius:999px; padding:5px 14px; font-size:8.5pt; font-weight:600; color:${COR.escuro};">
        ● Modo Interno (Custos & Lucro)
      </span>
      <span style="background:${COR.creme}; border:1px solid ${COR.linha}; border-radius:999px; padding:5px 14px; font-size:8.5pt; font-weight:600; color:${COR.escuro};">
        ● Modo Cliente (Proposta A4 / PDF)
      </span>
      <span style="background:${COR.creme}; border:1px solid ${COR.linha}; border-radius:999px; padding:5px 14px; font-size:8.5pt; font-weight:600; color:${COR.escuro};">
        ● Catálogo com +40 Artigos
      </span>
    </div>
  </div>

  ${seccao({
    titulo: "1. Painel Principal de Obras & Medições",
    tag: "MODO CUSTOS",
    texto: "Permite listar todos os trabalhos da obra organizados por categorias profissionais (Demolições, Pladur, Pinturas, Eletricidade, Pavimentos). Para cada item, preenche-se apenas a quantidade — os custos unitários de material e mão de obra são calculados automaticamente, permitindo ajustes livres.",
    imagem: calculadorImg,
    legenda: "Ecrã de cálculo interno com lista de medições e separação entre materiais e mão de obra.",
  })}

  <div style="page-break-before: always;"></div>

  ${seccao({
    titulo: "2. Catálogo Pré-Configurado (+40 Itens)",
    tag: "CATÁLOGO TÉCNICO",
    texto: "Evita escrever descrições e procurar preços do zero. Contém mais de 40 tarefas comuns de construção com preços médios de referência em Portugal. Basta pesquisar ou filtrar por categoria e clicar em «+ Adicionar» para incluir no orçamento.",
    imagem: catalogoImg,
    legenda: "Janela de catálogo com pesquisa instantânea e filtros por especialidade.",
  })}

  ${seccao({
    titulo: "3. Blindagem de Custos, Margens & IVA",
    tag: "PROTEÇÃO FINANCEIRA",
    texto: "Painel lateral com sliders interativos para proteger a rentabilidade da obra: Desperdício de Material (cortes e quebras), Custos de Estaleiro/Viagens, Colchão de Imprevistos e Margem de Lucro Bruta (€ e %). Permite selecionar IVA a 23%, 6% ou Isento.",
    imagem: definicoesImg,
    legenda: "Configuração detalhada de coeficientes de segurança e cálculo do lucro previsto.",
  })}

  <div style="page-break-before: always;"></div>

  ${seccao({
    titulo: "4. Folha de Proposta Comercial em PDF (Vista Cliente)",
    tag: "PROPOSTA A4 / PDF",
    texto: "Com 1 clique no botão «Proposta Cliente (PDF)», o sistema oculta todos os custos internos de mão de obra e margens, gerando uma folha de proposta limpa em A4 com o logótipo da empresa, NIF, morada da obra, fases de pagamento e IBAN pronta a imprimir ou enviar por WhatsApp/Email.",
    imagem: propostaImg,
    legenda: "Vista de impressão A4 com preços unitários ao cliente e blindagem de custos internos.",
  })}

  ${seccao({
    titulo: "5. Histórico e Gravação em Tempo Real",
    tag: "HISTÓRICO & BACKUP",
    texto: "Todos os dados são guardados em tempo real no dispositivo (sem receio de fechar a janela). Permite gerir múltiplos orçamentos no histórico, duplicar propostas para novos clientes e exportar/importar cópias de segurança em ficheiro.",
    imagem: historicoImg,
    legenda: "Gestão rápida de orçamentos guardados com opções de carregar, duplicar e apagar.",
  })}

  <div class="rodape-documento">
    <span>${PROPONENTE.nome} · ${PROPONENTE.email} · ${PROPONENTE.telefone} · ${PROPONENTE.local}</span>
    <span>Calculador de Obras — Apresentação e Guia Funcional</span>
  </div>
</main>

${fecharDocumento}
</body>
</html>
`;

  const htmlPath = "/tmp/calculador-obras-explicado.html";
  const pdfPath = "/Users/greenboblin/Documents/VibeCode/calculador-obras/Propostas/calculador-obras-o-software-explicado.pdf";
  const vetraPdfPath = "/Users/greenboblin/Documents/VibeCode/VetraSolar/VetraSolar/Propostas/calculador-obras-o-software-explicado.pdf";

  await writeFile(htmlPath, html, "utf-8");

  const cmd = `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "${htmlPath}"`;
  execSync(cmd, { stdio: "inherit" });

  console.log("PDF Guia Explicativo gerado com sucesso em:", pdfPath);
}

gerarExplicacaoPdf().catch(console.error);
