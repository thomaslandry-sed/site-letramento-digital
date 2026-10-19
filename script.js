
/* =====================================================
   Estudo e Planejamento 2026 | IA na práxis!
   JavaScript completo + animação do título do módulo 3
   ===================================================== */


/* =====================================================
   1. COPIAR PROMPTS
   ===================================================== */

async function copyPrompt(id) {
  const element = document.getElementById(id);

  if (!element) {
    console.error(`Não encontrei o prompt com id: ${id}`);
    alert("Não foi possível encontrar o prompt.");
    return;
  }

  const text = element.innerText || element.textContent || "";
  const button = document.querySelector(
    `button[onclick="copyPrompt('${id}')"]`
  );

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";

      document.body.appendChild(field);
      field.select();

      const copied = document.execCommand("copy");
      field.remove();

      if (!copied) {
        throw new Error("Não foi possível copiar o texto.");
      }
    }

    if (button) {
      const originalText = button.textContent;
      button.textContent = "✓ Copiado!";
      button.disabled = true;

      window.setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1600);
    }
  } catch (error) {
    console.error("Falha ao copiar o prompt:", error);

    alert(
      "Não foi possível copiar automaticamente. " +
      "Selecione e copie o texto manualmente."
    );
  }
}


/* =====================================================
   2. INFORMAÇÕES DAS FERRAMENTAS DE IA
   ===================================================== */

const iaData = {
  chatgpt: {
    title: "ChatGPT",
    description:
      "IA generativa focada em conversação, criação de textos, " +
      "planejamento de aulas, atividades, avaliações e apoio " +
      "à prática pedagógica.",
    link: "https://chatgpt.com"
  },

  gemini: {
    title: "Gemini",
    description:
      "IA do Google integrada ao ecossistema Workspace, ideal " +
      "para planejamento, análise de documentos, criação de " +
      "atividades e uso com Gems personalizados.",
    link: "https://gemini.google.com"
  },

  copilot: {
    title: "Copilot",
    description:
      "IA da Microsoft integrada ao Office, útil para apoio " +
      "em documentos, apresentações, planilhas e organização " +
      "do trabalho docente.",
    link: "https://copilot.microsoft.com"
  },

  perplexity: {
    title: "Perplexity",
    description:
      "IA focada em pesquisa, com respostas baseadas em fontes, " +
      "ideal para investigação, levantamento de dados e " +
      "aprofundamento teórico.",
    link: "https://www.perplexity.ai"
  },

  notebooklm: {
    title: "NotebookLM",
    description:
      "Ferramenta do Google para estudar documentos, PDFs e " +
      "textos longos, permitindo resumos, perguntas e " +
      "organização de ideias.",
    link: "https://notebooklm.google.com"
  },

  manus: {
    title: "Manus",
    description:
      "IA focada em automação e execução de tarefas mais " +
      "complexas, integrando múltiplas etapas em um único fluxo.",
    link: "https://manus.im/"
  },

  teachy: {
    title: "Teachy",
    description:
      "Plataforma de IA voltada para professores, com geração " +
      "de planos de aula, atividades, avaliações e materiais didáticos.",
    link: "https://www.teachy.com.br"
  },

  curipod: {
    title: "Curipod",
    description:
      "Ferramenta para criação de aulas interativas, com perguntas, " +
      "enquetes e atividades em tempo real para engajar os estudantes.",
    link: "https://curipod.com"
  },

  fliki: {
    title: "Fliki",
    description:
      "IA para transformar textos em vídeos e áudios, excelente " +
      "para criar materiais multimodais e acessíveis.",
    link: "https://fliki.ai"
  }
};


/* =====================================================
   3. INICIALIZAÇÃO DA PÁGINA
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------------
     3.1. JANELA DAS FERRAMENTAS DE IA
     ----------------------------------------------- */

  const modal = document.getElementById("ia-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription =
    document.getElementById("modal-description");
  const modalLink = document.getElementById("modal-link");
  const closeButton = document.querySelector(".close");

  document.querySelectorAll(".ia-buttons button").forEach(
    (button) => {
      button.addEventListener("click", () => {
        const ia = iaData[button.dataset.ia];

        if (
          !ia ||
          !modal ||
          !modalTitle ||
          !modalDescription ||
          !modalLink
        ) {
          return;
        }

        modalTitle.textContent = ia.title;
        modalDescription.textContent = ia.description;
        modalLink.href = ia.link;

        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
      });
    }
  );

  function closeModal() {
    if (!modal) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });


  /* -----------------------------------------------
     3.2. MENU RESPONSIVO DO CABEÇALHO
     ----------------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-navigation");

  if (menuToggle && navigation) {

    function closeMenu() {
      navigation.classList.remove("is-open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute(
        "aria-label",
        "Abrir menu de navegação"
      );
    }

    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Fechar menu de navegação"
          : "Abrir menu de navegação"
      );
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1100) {
        closeMenu();
      }
    });
  }


  /* -----------------------------------------------
     3.3. BARRA DE PROGRESSO DA LEITURA
     ----------------------------------------------- */

  const progress = document.createElement("div");

  progress.className = "reading-progress";
  progress.setAttribute("aria-hidden", "true");

  document.body.prepend(progress);

  function updateProgress() {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const percent = scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;

    progress.style.width =
      `${Math.min(100, Math.max(0, percent))}%`;
  }

  window.addEventListener("scroll", updateProgress, {
    passive: true
  });

  window.addEventListener("resize", updateProgress);

  updateProgress();


  /* -----------------------------------------------
     3.4. BOTÃO FLUTUANTE PARA VOLTAR AO TOPO
     ----------------------------------------------- */

  const backToTop = document.createElement("button");

  backToTop.type = "button";
  backToTop.className = "back-to-top";
  backToTop.textContent = "↑";

  backToTop.setAttribute("aria-label", "Voltar ao topo");
  backToTop.hidden = true;

  document.body.appendChild(backToTop);

  function updateBackToTop() {
    backToTop.hidden = window.scrollY < 400;
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });


  /* -----------------------------------------------
     3.5. ANIMAÇÃO DE ENTRADA DOS MÓDULOS
     ----------------------------------------------- */

  const modules = [
    ...document.querySelectorAll(".module")
  ];

  if (
    "IntersectionObserver" in window &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    modules.forEach((module) => {
      module.classList.add("js-reveal");
      observer.observe(module);
    });
  }


  /* -----------------------------------------------
     3.6. BUSCA FUNCIONAL DE PROMPTS
     BARRA POSICIONADA ANTES DO PRIMEIRO MÓDULO
     ----------------------------------------------- */

  if (modules.length) {

    const searchArea = document.createElement("div");
    searchArea.className = "prompt-search-area";

    const search = document.createElement("input");

    search.type = "search";
    search.className = "prompt-search";
    search.placeholder =
      "Busque por palavras-chave do prompt";

    search.setAttribute(
      "aria-label",
      "Buscar prompts nos módulos"
    );

    const feedback = document.createElement("p");

    feedback.className = "search-feedback";
    feedback.setAttribute("aria-live", "polite");

    searchArea.append(search, feedback);

    // ALTERAÇÃO:
    // A barra de pesquisa agora aparece imediatamente
    // antes do primeiro módulo pedagógico.
    // Não é mais inserida antes da seção de Letramento Digital.

    modules[0].parentNode.insertBefore(
      searchArea,
      modules[0]
    );

    const promptCards = modules.flatMap((module) =>
      [...module.querySelectorAll(".prompt-box")].map(
        (card) => ({ card, module })
      )
    );

    function normalizarTexto(texto) {
      return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR")
        .trim();
    }

    function pesquisarPrompts() {
      const termo = normalizarTexto(search.value);

      const palavras = termo
        .split(/\s+/)
        .filter(Boolean);

      let quantidade = 0;

      promptCards.forEach(({ card }) => {
        const conteudo = normalizarTexto(
          card.textContent || ""
        );

        const corresponde = palavras.every((palavra) =>
          conteudo.includes(palavra)
        );

        card.hidden = !corresponde;

        if (corresponde) {
          quantidade++;
        }
      });

      modules.forEach((module) => {
        const cards = [
          ...module.querySelectorAll(".prompt-box")
        ];

        const temCartoes = cards.length > 0;

        const temResultado = cards.some(
          (card) => !card.hidden
        );

        module.hidden =
          termo.length > 0 &&
          temCartoes &&
          !temResultado;
      });

      if (!termo) {
        feedback.textContent = "";
      } else if (quantidade === 0) {
        feedback.textContent =
          "Nenhum prompt encontrado. Tente outras palavras.";
      } else {
        feedback.textContent =
          `${quantidade} prompt(s) encontrado(s).`;
      }
    }

    search.addEventListener("input", pesquisarPrompts);
    search.addEventListener("search", pesquisarPrompts);
  }


  /* -----------------------------------------------
     3.7. ANIMAÇÃO REPETÍVEL DO TÍTULO DO MÓDULO 3
     ----------------------------------------------- */

  const tituloCanvas = document.querySelector(
    "#mod3 .titulo-scroll-animado"
  );

  const prefereMenosMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (tituloCanvas) {

    // Em navegadores sem IntersectionObserver,
    // mantém o título visível normalmente.
    if (
      !("IntersectionObserver" in window) ||
      prefereMenosMovimento
    ) {
      tituloCanvas.classList.add(
        "titulo-animado-visivel"
      );
    } else {

      const observadorTitulo = new IntersectionObserver(
        (entradas) => {
          entradas.forEach((entrada) => {

            if (entrada.isIntersecting) {
              // Ativa a animação quando o título
              // entra na área visível da tela.
              entrada.target.classList.add(
                "titulo-animado-visivel"
              );
            } else {
              // Remove a classe quando o título sai
              // para permitir que anime novamente.
              entrada.target.classList.remove(
                "titulo-animado-visivel"
              );
            }

          });
        },
        {
          threshold: 0.3,
          rootMargin: "0px 0px -30px 0px"
        }
      );

      observadorTitulo.observe(tituloCanvas);
    }
  }

});


/* =====================================================
   4. TESTAR PROMPT NO GEMINI
   Copia o prompt e abre o Gemini em nova aba.
   ===================================================== */

async function testarGemini(id) {
  const elemento = document.getElementById(id);

  if (!elemento) {
    console.error(`Não encontrei o prompt com id: ${id}`);
    alert("Não foi possível encontrar o prompt.");
    return;
  }

  const prompt = elemento.innerText.trim();

  if (!prompt) {
    alert("Este prompt está vazio.");
    return;
  }

  const janelaGemini = window.open(
    "https://gemini.google.com/app",
    "_blank"
  );

  if (!janelaGemini) {
    alert(
      "O navegador bloqueou a nova aba. " +
      "Permita pop-ups para este site e tente novamente."
    );
    return;
  }

  try {
    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(prompt);
    } else {
      const field = document.createElement("textarea");

      field.value = prompt;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.left = "-9999px";

      document.body.appendChild(field);
      field.select();

      const copied = document.execCommand("copy");
      field.remove();

      if (!copied) {
        throw new Error("Falha ao copiar o prompt.");
      }
    }

    alert(
      "Prompt copiado com sucesso! 🚀\n\n" +
      "O Gemini foi aberto em uma nova aba.\n\n" +
      "Clique no campo de mensagem e pressione " +
      "Ctrl + V para inserir o prompt."
    );

  } catch (error) {
    console.error(
      "Erro ao copiar o prompt para o Gemini:",
      error
    );

    alert(
      "O Gemini foi aberto, mas não foi possível " +
      "copiar o prompt automaticamente. " +
      "Tente usar o botão Copiar."
    );
  }
}


/* =====================================================
   CARROSSEL DE GEMS — IA NA PRÁXIS
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".gems-carousel");
  const track = document.getElementById("gemsCarouselTrack");

  if (!carousel || !track) return;

  const slides = Array.from(track.querySelectorAll(".gems-slide"));
  const prevButton = carousel.querySelector(".gems-carousel-prev");
  const nextButton = carousel.querySelector(".gems-carousel-next");

  const dots = Array.from(
    document.querySelectorAll(".gems-carousel-dot")
  );

  const counter = document.querySelector(".gems-carousel-counter");

  if (!slides.length) return;

  let activeIndex = 0;
  let scrollFrame = null;

  const totalSlides = slides.length;

  // Identifica cada slide para tecnologias assistivas.
  slides.forEach((slide, index) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute(
      "aria-label",
      `Gem ${index + 1} de ${totalSlides}`
    );
  });

  // Atualiza os controles visuais.
  function updateCarousel(index) {
    activeIndex = Math.max(0, Math.min(index, totalSlides - 1));

    // Atualiza os indicadores.
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;

      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-pressed", String(isActive));
    });

    // Atualiza o contador.
    if (counter) {
      counter.innerHTML =
        `${String(activeIndex + 1).padStart(2, "0")} ` +
        `<span>/</span> ` +
        `${String(totalSlides).padStart(2, "0")}`;
    }

    // Desabilita as setas nas extremidades.
    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === totalSlides - 1;
  }

  // Navega até um cartão específico.
  function goToSlide(index) {
    const targetIndex = Math.max(
      0,
      Math.min(index, totalSlides - 1)
    );

    const targetSlide = slides[targetIndex];

    track.scrollTo({
      left: targetSlide.offsetLeft - slides[0].offsetLeft,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth"
    });

    updateCarousel(targetIndex);
  }

  // Botão anterior.
  prevButton.addEventListener("click", () => {
    goToSlide(activeIndex - 1);
  });

  // Botão próximo.
  nextButton.addEventListener("click", () => {
    goToSlide(activeIndex + 1);
  });

  // Navegação direta pelos indicadores.
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // Atualiza os controles quando o usuário desliza o carrossel.
  track.addEventListener("scroll", () => {
    if (scrollFrame !== null) {
      cancelAnimationFrame(scrollFrame);
    }

    scrollFrame = requestAnimationFrame(() => {
      const trackPosition = track.getBoundingClientRect().left;

      let closestIndex = 0;
      let closestDistance = Infinity;

      slides.forEach((slide, index) => {
        const slidePosition = slide.getBoundingClientRect().left;
        const distance = Math.abs(slidePosition - trackPosition);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      updateCarousel(closestIndex);
      scrollFrame = null;
    });
  });

  // Permite navegar com as setas do teclado
  // quando a área do carrossel está selecionada.
  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(activeIndex + 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(activeIndex - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      goToSlide(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      goToSlide(totalSlides - 1);
    }
  });

  // Estado inicial.
  updateCarousel(0);
});

/*aqui*/

/* ================================================
   ANIMAÇÕES DA SEÇÃO LETRAMENTO DIGITAL
   ================================================ */

(function () {
    "use strict";

    function iniciarAnimacoesLetramento() {

        const secao = document.getElementById(
            "prompts-letramento"
        );

        if (!secao) return;

        // Evita inicialização duplicada
        if (secao.dataset.animacoesIniciadas === "true") {
            return;
        }

        secao.dataset.animacoesIniciadas = "true";

        // Elementos que receberão animação
        const elementos = secao.querySelectorAll(
            ".letramento-header h2, " +
            ".letramento-divider, " +
            ".letramento-prompt-title"
        );

        // Respeita a preferência de movimento reduzido
        const movimentoReduzido = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (movimentoReduzido ||
            !("IntersectionObserver" in window)) {

            elementos.forEach(elemento => {
                elemento.classList.add("letramento-visivel");
            });

            return;
        }

        // Observador de entrada e saída da tela
        const observer = new IntersectionObserver(
            (entradas) => {

                entradas.forEach(entrada => {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add(
                            "letramento-visivel"
                        );

                    } else {

                        // Permite repetir a animação
                        // quando o usuário voltar à seção
                        entrada.target.classList.remove(
                            "letramento-visivel"
                        );

                    }

                });

            },
            {
                root: null,
                rootMargin: "0px 0px -8% 0px",
                threshold: 0.15
            }
        );

        elementos.forEach(elemento => {
            observer.observe(elemento);
        });
    }

    // Executa após o carregamento do HTML
    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            iniciarAnimacoesLetramento
        );

    } else {

        iniciarAnimacoesLetramento();

    }

})();


document.addEventListener("DOMContentLoaded", () => {
    const fluxo = document.getElementById("fluxoIA");
    if (!fluxo) return;

    const etapas = [...fluxo.querySelectorAll(".etapa")];
    const descricao = document.getElementById("fluxoDescricao");
    const pausar = document.getElementById("pausarFluxo");
    const reiniciar = document.getElementById("reiniciarFluxo");

    const textos = [
        "Tudo começa com uma ideia pedagógica.",
        "O professor transforma a ideia em um prompt claro.",
        "A IA gera uma primeira versão do material.",
        "O professor analisa criticamente o resultado.",
        "O conteúdo é adaptado à realidade da turma.",
        "A atividade está pronta para aplicação!"
    ];

    let indice = 0;
    let intervalo = null;

    function mostrarEtapa(numero) {
        indice = numero;

        etapas.forEach((etapa, i) => {
            etapa.classList.toggle("ativa", i === indice);
            etapa.classList.toggle("concluida", i < indice);
            etapa.setAttribute(
                "aria-current",
                i === indice ? "step" : "false"
            );
        });

        descricao.textContent = textos[indice];

        descricao.style.animation = "none";
        void descricao.offsetWidth;
        descricao.style.animation = "";
    }

    function parar() {
        clearInterval(intervalo);
        intervalo = null;
        pausar.textContent = "▶ Continuar";
    }

    function iniciar() {
        clearInterval(intervalo);

        intervalo = setInterval(() => {
            mostrarEtapa((indice + 1) % etapas.length);
        }, 3000);

        pausar.textContent = "⏸ Pausar";
    }

    etapas.forEach((etapa, i) => {
        etapa.addEventListener("click", () => {
            mostrarEtapa(i);
            parar();
        });
    });

    pausar.addEventListener("click", () => {
        if (intervalo) parar();
        else iniciar();
    });

    reiniciar.addEventListener("click", () => {
        mostrarEtapa(0);
        iniciar();
    });

    mostrarEtapa(0);

    if (!window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) {
        iniciar();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(
        "#prompts-letramento .tip strong"
    ).forEach(elemento => {

        if (!elemento.textContent.includes("💡")) return;

        elemento.innerHTML = elemento.innerHTML.replace(
            "💡",
            '<i class="fa-solid fa-lightbulb lampada-tip" aria-hidden="true"></i>'
        );

    });
});


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".letramento-prompt pre").forEach(pre => {
        let texto = pre.textContent;

        // Protege caracteres especiais do HTML
        texto = texto
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // **Texto** vira negrito
        texto = texto.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );

        // #, ##, ### etc. viram títulos em negrito
        texto = texto.replace(
            /^(#{1,6})\s+(.+)$/gm,
            (_, hashes, titulo) =>
                `<strong class="prompt-heading">${titulo}</strong>`
        );

        // Linhas que começam com números viram negrito
        texto = texto.replace(
            /^(\s*\d+[\.\-\)]\s+.+)$/gm,
            '<strong class="prompt-heading">$1</strong>'
        );

        pre.innerHTML = texto;
    });
});

