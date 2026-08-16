import { writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import { abrirDocumento, fecharDocumento, estilos, COR, PROPONENTE } from "./marca-propostas.mjs";

const REF = "PROP-2026-IG-AUTO";
const DATA = "16 de agosto de 2026";

const html = `<!doctype html>
<html lang="pt-PT">
<head>
  <meta charset="utf-8">
  <title>Proposta Comercial — Instagram Automático via WhatsApp</title>
  <style>
    ${estilos()}
    main { padding: 26px 44px 20px; }
  </style>
</head>
<body>

${abrirDocumento({
  etiqueta: "PROPOSTA COMERCIAL & SERVIÇO",
  titulo: "Instagram Automático via WhatsApp",
  referencia: `Ref. ${REF} · ${DATA}`,
})}

<main>
  <p class="destinatario">
    Para: <strong>Profissional / Empresa de Obras e Remodelações</strong>
    <span class="sep">|</span>
    A/C: <strong>Gerência</strong>
  </p>

  <h2><span class="n">1.</span>O Desafio</h2>
  <p>
    Os clientes que procuram serviços de remodelação e construção civil vão primeiro ao Instagram para ver fotografias de obras concluídas e avaliar a confiança na empresa.
  </p>
  <p>
    No entanto, no dia a dia das obras, <strong>não há tempo para gerir redes sociais</strong>: escolher fotos, escrever textos apelativos, pesquisar hashtags, criar montagens de «Antes e Depois» ou responder a quem pede preços. Contratar uma agência tradicional de marketing é caro (300 € a 500 €/mês) e exige reuniões constantes.
  </p>

  <h2><span class="n">2.</span>A Solução: Como Funciona na Prática (Sem Perder Tempo)</h2>
  <p>
    Criámos um sistema 100% automatizado, chave-na-mão, onde <strong>todo o trabalho da sua parte demora menos de 30 segundos</strong> através do WhatsApp que já utiliza no telemóvel:
  </p>

  <div class="destaque-box" style="background: ${COR.creme}; border-left: 4px solid ${COR.dourado}; padding: 14px 18px; margin: 14px 0;">
    <p style="margin: 0 0 8px; font-weight: 700; color: ${COR.escuro}; font-size: 11pt;">O Seu Único Passo:</p>
    <p style="margin: 0; font-size: 9.5pt; color: ${COR.texto};">
      1. Tira 1 ou 2 fotos da obra no local.<br>
      2. Envia para o WhatsApp do sistema com um áudio curto:<br>
      <em>«Acabámos agora esta casa de banho em Leiria, levou teto falso em pladur, chão novo e loiças suspensas.»</em>
    </p>
  </div>

  <p style="margin-top: 12px;"><strong>O que a nossa tecnologia faz de forma 100% automática por trás:</strong></p>
  <ul style="margin: 6px 0 14px 20px; padding: 0;">
    <li><strong>Tratamento da Imagem:</strong> Aplica o logótipo da sua empresa com marca de água profissional e gera montagens de «Antes vs Depois».</li>
    <li><strong>Redação Profissional (IA):</strong> Transcreve o seu áudio e redige uma legenda comercial impecável em Português de Portugal, detalhando os trabalhos e convidando quem vê a pedir orçamento.</li>
    <li><strong>Hashtags e Localização:</strong> Adiciona automaticamente as melhores tags para atrair clientes da sua região (#obrasleiria, #remodelacoes, #pladur, etc.).</li>
    <li><strong>Publicação Direta:</strong> Agenda e publica no Feed e nos Stories do seu Instagram empresarial.</li>
    <li><strong>Triagem de Pedidos de Orçamento (DMs):</strong> Responde automaticamente a quem comentar «Preço» ou «Orçamento», recolhendo o contacto e enviando-o de imediato para o seu telemóvel.</li>
  </ul>

  <div style="page-break-before: always;"></div>

  <h2><span class="n">3.</span>Investimento & Planos</h2>
  <p>
    Toda a infraestrutura técnica (servidores na nuvem, inteligência artificial, ligações seguras à Meta e manutenção) fica integralmente a nosso cargo.
  </p>

  <table>
    <thead class="tabela-cabeca">
      <tr><th>SERVIÇO</th><th>VALOR</th></tr>
    </thead>
    <tbody>
      <tr class="linha">
        <td>
          <strong>Configuração Inicial & Integração (Setup Único)</strong>
          <span class="desc">
            Ligação da conta de Instagram Profissional ao sistema de WhatsApp, criação dos modelos visuais de imagem com o logótipo da empresa, parametrização do tom de voz e configuração das respostas automáticas de captação de clientes.
          </span>
        </td>
        <td class="valor">290 €</td>
      </tr>
      <tr class="linha-alt">
        <td>
          <strong>Gestão, Servidores & Inteligência Artificial (Mensalidade)</strong>
          <span class="desc">
            Alojamento da infraestrutura, processamento ilimitado de publicações via áudio/foto no WhatsApp, inteligência artificial de redação, publicação automática e suporte contínuo. <em>Sem período de fidelização (cancele quando quiser).</em>
          </span>
        </td>
        <td class="valor">49 € / mês</td>
      </tr>
      <tr class="total">
        <td>Total Inicial (Setup + 1.º Mês de Serviço)</td>
        <td class="valor">339 €</td>
      </tr>
    </tbody>
  </table>
  <p class="nota-rodape">* Valores sem IVA. Sem fidelização obrigatória.</p>

  <h2><span class="n">4.</span>Principais Vantagens</h2>
  <ul style="margin: 8px 0 14px 20px; padding: 0;">
    <li><strong>Zero tempo perdido ao computador:</strong> Basta mandar uma mensagem de WhatsApp como faz para um amigo.</li>
    <li><strong>Presença profissional constante:</strong> O seu Instagram mantém-se sempre atualizado com trabalhos recentes.</li>
    <li><strong>Mais clientes locais:</strong> Se o sistema lhe trouxer apenas 1 obra a cada 6 meses, já pagou o investimento de vários anos.</li>
    <li><strong>Chave-na-mão:</strong> Não precisa de configurar servidores, APIs ou ferramentas complicadas — tratamos de tudo.</li>
  </ul>

  <h2><span class="n">5.</span>Prazos & Ativação</h2>
  <table class="prazos">
    <tbody>
      <tr>
        <td>Prazo de Ativação</td>
        <td>3 a 5 dias úteis após fornecimento dos acessos à página e envio do logótipo.</td>
      </tr>
      <tr>
        <td>Acompanhamento</td>
        <td>Formação rápida de 10 minutos por chamada/WhatsApp para testar o primeiro envio.</td>
      </tr>
    </tbody>
  </table>

  <div class="evitar-corte">
    <h2><span class="n">6.</span>Adjudicação</h2>
    <p>Para ativar o serviço, basta apor a sua assinatura e devolver digitalmente:</p>
    
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
  const htmlPath = "/tmp/proposta-instagram-automatico.html";
  const pdfPath = "/Users/greenboblin/Documents/VibeCode/calculador-obras/Propostas/proposta-instagram-automatico.pdf";
  const vetraPdfPath = "/Users/greenboblin/Documents/VibeCode/VetraSolar/VetraSolar/Propostas/proposta-instagram-automatico.pdf";

  await writeFile(htmlPath, html, "utf-8");

  const cmd = `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --print-to-pdf="${pdfPath}" --no-pdf-header-footer "${htmlPath}"`;
  execSync(cmd, { stdio: "inherit" });

  console.log("PDF Proposta Instagram Automático gerado com sucesso em:", pdfPath);
}

gerarPdf().catch(console.error);
