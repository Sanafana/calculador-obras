import { writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import { abrirDocumento, fecharDocumento, estilos, COR, PROPONENTE } from "./marca-propostas.mjs";

const REF = "PROP-2026-OBR";
const DATA = "16 de agosto de 2026";
const DEMO = "http://localhost:3000";

const html = `<!doctype html>
<html lang="pt-PT">
<head>
  <meta charset="utf-8">
  <title>Proposta Comercial — Calculador de Obras</title>
  <style>
    ${estilos()}
  </style>
</head>
<body>

${abrirDocumento({
  etiqueta: "PROPOSTA COMERCIAL",
  titulo: "Web App Calculador de Obras",
  referencia: `Ref. ${REF} · ${DATA}`,
})}

<main>
  <p class="destinatario">
    Para: <strong>Profissional / Empresa de Obras e Remodelações</strong>
    <span class="sep">|</span>
    A/C: <strong>Gerência</strong>
  </p>

  <h2><span class="n">1.</span>Enquadramento</h2>
  <p>
    Elaborar orçamentos de construção e remodelação em folhas de papel ou folhas de cálculo complexas consome horas de trabalho, potencia erros de medição e frequentemente deixa de fora custos reais que corroem a rentabilidade da empresa: tempos de deslocação, montagem de estaleiro, desperdício de materiais em cortes e quebras, e margens de imprevistos.
  </p>
  <p>
    Por outro lado, entregar propostas manuscritas ou em mensagens informais de WhatsApp desvaloriza a perceção de profissionalismo e dificulta a cobrança do preço justo em obras de maior valor.
  </p>
  <p>
    Esta proposta apresenta o desenvolvimento e implementação de uma <strong>Web App exclusiva de Orçamentação e Gestão de Obras</strong>, desenhada para que qualquer membro da equipa consiga orçamentar uma obra completa em menos de 3 minutos, com margens de lucro blindadas e emissão imediata de propostas profissionais em PDF prontas para assinatura.
  </p>

  <h2><span class="n">2.</span>O que está incluído</h2>

  <h3>Catálogo Técnico de Construção & Remodelações</h3>
  <p>
    Mais de 40 artigos e tarefas de construção civil pré-configurados com rendimentos médios e preços de referência do mercado nacional: demolições, alvenarias, tetos e divisórias em Pladur, pinturas, eletricidade, canalização, pavimentos e revestimentos, carpintarias, caixilharias e limpezas de obra. Permite adicionar artigos à obra com 1 clique.
  </p>

  <h3>Motor de Cálculo e Blindagem de Margens (Cálculo Interno)</h3>
  <p>
    Painel de parametrização em tempo real com sliders visuais para proteção financeira:
  </p>
  <ul style="margin: 6px 0 12px 20px; padding: 0;">
    <li><strong>Desperdício de Material (ex: 8%):</strong> Acrescenta automaticamente a percentagem de perdas e cortes ao custo dos materiais.</li>
    <li><strong>Estaleiro & Deslocações (ex: 5%):</strong> Cobre combustível, transporte e desgaste de ferramentas.</li>
    <li><strong>Imprevistos & Risco (ex: 5%):</strong> Fundo de maneio para surpresas técnicas durante a execução.</li>
    <li><strong>Margem de Lucro Bruto (ex: 25%):</strong> Calcula de imediato o lucro líquido em euros (€) que a empresa vai auferir.</li>
    <li><strong>IVA Parametrizável:</strong> Seleção rápida entre 23% (Normal), 6% (Reabilitação Urbana), 13% ou Isenção (Autoliquidação).</li>
  </ul>

  <h3>Gerador de Propostas Comerciais em PDF (Vista do Cliente)</h3>
  <p>
    Transforma instantaneamente a folha de cálculo interna numa proposta comercial elegante em formato A4, com o logótipo da empresa, NIF, morada da obra, discriminação clara dos trabalhos, condições de pagamento faseadas, IBAN e espaço para assinaturas de adjudicação. <em>Os custos internos, mão de obra discriminada e margens de lucro ficam 100% confidenciais e ocultos do cliente.</em>
  </p>

  <h3>Gravação Automática e Histórico de Propostas</h3>
  <p>
    Sistema de salvaguarda contínua em tempo real no dispositivo (sem risco de perda de dados) com histórico completo de orçamentos anteriores para consulta, duplicação e exportação/importação de backups em ficheiro.
  </p>

  <h3>Totalmente Adaptado a Telemóvel, Tablet e Computador</h3>
  <p>
    Interface rápida e responsiva que permite efetuar levantamentos de medidas e lançar artigos diretamente no local da obra através do telemóvel.
  </p>

  <h2><span class="n">3.</span>Demonstração Funcional</h2>
  <p>
    A aplicação encontra-se integralmente desenvolvida e funcional para demonstração em tempo real. O documento anexo <em>«Calculador de Obras — O Software Explicado»</em> detalha o funcionamento e os ecrãs de cada módulo.
  </p>

  <div style="page-break-before: always;"></div>

  <h2><span class="n">4.</span>Investimento</h2>
  <table>
    <thead class="tabela-cabeca">
      <tr><th>DESCRIÇÃO</th><th>VALOR</th></tr>
    </thead>
    <tbody>
      <tr class="linha">
        <td>
          <strong>Web App Calculador de Obras & Gerador de Propostas</strong>
          <span class="desc">
            Aplicação completa com catálogo técnico personalizável, motor de cálculo de margens/desperdício/IVA, gerador de propostas em PDF, histórico de orçamentos, personalização de logótipo e dados da empresa.
          </span>
        </td>
        <td class="valor">650 €</td>
      </tr>
      <tr class="linha-alt">
        <td>
          <strong>Alojamento Cloud & Suporte Anual (Opcional, Recomendado)</strong>
          <span class="desc">
            Alojamento de alta velocidade com certificado SSL seguro, subdomínio próprio, cópias de segurança automáticas e suporte técnico a atualizações.
          </span>
        </td>
        <td class="valor">90 € / ano</td>
      </tr>
      <tr class="total">
        <td>Total Inicial de Desenvolvimento e Entrega</td>
        <td class="valor">650 €</td>
      </tr>
    </tbody>
  </table>
  <p class="nota-rodape">* Valores sem IVA. Sem custos recorrentes de licenças de software de terceiros.</p>

  <h2><span class="n">5.</span>Condições de Pagamento e Prazos</h2>
  <table class="prazos">
    <tbody>
      <tr>
        <td>Pagamento</td>
        <td>50% na adjudicação · 50% na entrega e formação de utilização.</td>
      </tr>
      <tr>
        <td>Prazo de Entrega</td>
        <td>5 a 7 dias úteis após fornecimento dos dados da empresa e tabela de preços base.</td>
      </tr>
      <tr>
        <td>Garantia</td>
        <td>90 dias de garantia com retificação gratuita de qualquer anomalia técnica.</td>
      </tr>
    </tbody>
  </table>

  <h2><span class="n">6.</span>Propriedade</h2>
  <p>
    Concluído o pagamento, a aplicação e todos os dados registados são propriedade integral e exclusiva do cliente, sem qualquer fidelização ou dependência técnica.
  </p>

  <div class="evitar-corte">
    <h2><span class="n">7.</span>Adjudicação</h2>
    <p>Para adjudicar esta proposta, basta apor a assinatura e devolver digitalmente:</p>
    
    <div class="assinaturas">
      <div>
        <p class="pequeno" style="font-weight:700; color:${COR.apoio};">PELO CLIENTE</p>
        <div class="linha-assinatura"></div>
        <p class="pequeno">Nome e data: ________________________________</p>
      </div>
      <div>
        <p class="pequeno" style="font-weight:700; color:${COR.apoio};">O PROPONENTE</p>
        <div class="linha-assinatura"></div>
        <p class="pequeno">${PROPONENTE.nome} · ${DATA}</p>
      </div>
    </div>
  </div>

  <div class="rodape-documento">
    <span>${PROPONENTE.nome} · ${PROPONENTE.email} · ${PROPONENTE.telefone} · ${PROPONENTE.local}</span>
    <span>Proposta Comercial · Ref. ${REF} · Válida por 30 dias</span>
  </div>
</main>

${fecharDocumento}
</body>
</html>
`;

async function gerarPdf() {
  const htmlPath = "/tmp/proposta-calculador-obras.html";
  const pdfPath = "/Users/greenboblin/Documents/VibeCode/calculador-obras/Propostas/proposta-calculador-obras.pdf";
  const vetraPdfPath = "/Users/greenboblin/Documents/VibeCode/VetraSolar/VetraSolar/Propostas/proposta-calculador-obras.pdf";

  await writeFile(htmlPath, html, "utf-8");
  
  const cmd = `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "${htmlPath}"`;
  execSync(cmd, { stdio: "inherit" });
  
  // Also copy to VetraSolar/Propostas
  try {
    execSync(`cp "${pdfPath}" "${vetraPdfPath}"`);
  } catch (e) {
    console.error("Erro a copiar para VetraSolar:", e);
  }

  console.log("PDF Proposta Comercial gerado com sucesso em:", pdfPath);
}

gerarPdf().catch(console.error);
