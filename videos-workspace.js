
/* ==============================================================
   CONFIGURE AQUI OS 6 VÍDEOS
   Cole o link completo de cada vídeo no campo youtubeUrl.
   Exemplo: youtubeUrl: "https://www.youtube.com/watch?v=ID_REAL"
   Enquanto youtubeUrl estiver vazio, o cartão fica marcado
   como "Link em breve" (sem levar a um vídeo inexistente).
   Edite também título e descrição para corresponder ao vídeo.
   ============================================================== */
const videos = [
  {
    titulo: "Google Drive",
    categoria: "Armazenamento e organização",
    descricao: "Aprenda a organizar arquivos em pastas, compartilhar materiais com segurança e acessar documentos de diferentes dispositivos.",
    icone: "fa-brands fa-google-drive",
    cor: "drive",
    youtubeUrl: "https://www.youtube.com/watch?v=bSxhsxjXxOA"
  },
  {
    titulo: "Google Documentos",
    categoria: "Criação de documentos",
    descricao: "Descubra como criar, formatar e editar textos colaborativamente, adicionar comentários e preparar materiais de aula.",
    icone: "fa-solid fa-file-lines",
    cor: "docs",
    youtubeUrl: "https://www.youtube.com/watch?v=P2UBh5g9v9Y"
  },
  {
    titulo: "Google Planilhas",
    categoria: "Dados e organização",
    descricao: "Conheça os recursos para montar tabelas, utilizar fórmulas básicas e acompanhar informações da rotina escolar.",
    icone: "fa-solid fa-table-cells-large",
    cor: "sheets",
    youtubeUrl: "https://www.youtube.com/watch?v=yVExkEfiBwo"
  },
  {
    titulo: "Google Apresentações",
    categoria: "Aulas e apresentações",
    descricao: "Crie slides visuais e objetivos, insira imagens e organize apresentações para tornar suas aulas mais dinâmicas.",
    icone: "fa-solid fa-display",
    cor: "slides",
    youtubeUrl: "https://www.youtube.com/watch?v=zkyzwFHxhQk"
  },
  {
    titulo: "Google Formulários",
    categoria: "Avaliações e pesquisas",
    descricao: "Veja como preparar questionários, coletar respostas e usar formulários para atividades, pesquisas e avaliações.",
    icone: "fa-solid fa-list-check",
    cor: "forms",
    youtubeUrl: "https://www.youtube.com/watch?v=7KRR0z4mZnI"
  },
  {
    titulo: "Google Sala de Aula",
    categoria: "Gestão de atividades",
    descricao: "Explore como organizar turmas, publicar atividades, compartilhar materiais e acompanhar a participação dos estudantes.",
    icone: "fa-solid fa-chalkboard-user",
    cor: "classroom",
    youtubeUrl: "https://www.youtube.com/watch?v=mKn3gdt5bSU"
  }
];

const grid = document.getElementById("video-grid");
const search = document.getElementById("video-search");
const count = document.getElementById("video-count");
const empty = document.getElementById("empty-state");
const clear = document.getElementById("clear-search");

function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

function urlYoutubeValida(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && (
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "m.youtube.com" ||
      parsed.hostname === "youtu.be"
    );
  } catch { return false; }
}

function criarCard(video, indice) {
  const article = document.createElement("article");
  article.className = `video-card theme-${video.cor}`;
  const disponivel = urlYoutubeValida(video.youtubeUrl);

  const cover = document.createElement("div");
  cover.className = "video-cover";
  cover.innerHTML = `
    <span class="cover-orbit orbit-1" aria-hidden="true"></span>
    <span class="cover-orbit orbit-2" aria-hidden="true"></span>
    <span class="cover-icon" aria-hidden="true"><i class="${video.icone}"></i></span>
    <span class="cover-play" aria-hidden="true"><i class="fa-solid fa-play"></i></span>
    <span class="cover-number">AULA ${String(indice + 1).padStart(2, "0")}</span>
  `;

  const content = document.createElement("div");
  content.className = "card-content";
  const category = document.createElement("span");
  category.className = "card-category";
  category.textContent = video.categoria;
  const title = document.createElement("h3");
  title.textContent = video.titulo;
  const desc = document.createElement("p");
  desc.textContent = video.descricao;
  content.append(category, title, desc);

  if (disponivel) {
    const anchor = document.createElement("a");
    anchor.className = "watch-link";
    anchor.href = video.youtubeUrl;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.setAttribute("aria-label", `Assistir à videoaula sobre ${video.titulo} no YouTube (abre nova aba)`);
    anchor.innerHTML = '<span>Assistir no YouTube</span><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>';
    content.append(anchor);
    // Toda a capa também leva ao vídeo.
    const coverLink = anchor.cloneNode(true);
    coverLink.className = "cover-click-target";
    coverLink.textContent = "";
    cover.append(coverLink);
  } else {
    const pending = document.createElement("span");
    pending.className = "watch-pending";
    pending.innerHTML = '<i class="fa-regular fa-clock" aria-hidden="true"></i> Link em breve';
    content.append(pending);
  }

  article.append(cover, content);
  return article;
}

function atualizar() {
  const termos = normalizar(search.value.trim()).split(/\s+/).filter(Boolean);
  const encontrados = videos.map((video, indice) => ({ video, indice })).filter(({ video }) => {
    const texto = normalizar(`${video.titulo} ${video.categoria} ${video.descricao}`);
    return termos.every(termo => texto.includes(termo));
  });
  grid.replaceChildren(...encontrados.map(({ video, indice }) => criarCard(video, indice)));
  count.textContent = encontrados.length;
  empty.hidden = encontrados.length !== 0;
  clear.hidden = search.value.length === 0;
}

search.addEventListener("input", atualizar);
clear.addEventListener("click", () => { search.value = ""; atualizar(); search.focus(); });
atualizar();


/* Barra azul de progresso de leitura, seguindo a lógica de index.html */
const readingProgress = document.createElement("div");
readingProgress.className = "reading-progress";
readingProgress.setAttribute("aria-hidden", "true");
document.body.prepend(readingProgress);

function atualizarProgressoLeitura() {
  const alturaRolavel = document.documentElement.scrollHeight - window.innerHeight;
  const percentual = alturaRolavel > 0 ? (window.scrollY / alturaRolavel) * 100 : 0;
  readingProgress.style.width = `${Math.min(100, Math.max(0, percentual))}%`;
}
window.addEventListener("scroll", atualizarProgressoLeitura, { passive: true });
window.addEventListener("resize", atualizarProgressoLeitura);
atualizarProgressoLeitura();
