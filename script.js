/* =====================================================
   FICHA DE RAMON — PARTE 2
   Interações com JavaScript
===================================================== */

/* Configuração EmailJS — dados fornecidos para o projeto Êxodo */
const EMAILJS_PUBLIC_KEY = "4dPzOiz4XNUmgrrzf";
const EMAILJS_SERVICE_ID = "service_kwyjaao";
const EMAILJS_TEMPLATE_ID = "template_azbnfen";

/* Seleção dos elementos principais da página */
const menuTopo = document.querySelector(".topbar");
const menuToggle = document.getElementById("menuToggle");
const menuNavegacao = document.getElementById("menuNavegacao");

const listaItens = document.getElementById("itemList");
const contadorInventario = document.getElementById("inventoryCount");
const botoesFiltro = document.querySelectorAll(".filter-button");

const botaoXp = document.getElementById("ganharXp");
const textoXp = document.getElementById("xpTexto");
const barraXp = document.getElementById("xpBarra");
const trilhoXp = document.getElementById("xpTrack");
const feedbackXp = document.getElementById("xpFeedback");

const storyContent = document.querySelector(".story-content");
const storyToggle = document.getElementById("storyToggle");

const themeToggle = document.getElementById("themeToggle");
const saudacaoHero = document.getElementById("saudacaoHero");

/* Dados do inventário: cada objeto representa um item */
const inventario = [
    { id: 1, nome: "Katana Grande", tipo: "arma", raridade: "Lendário", descricao: "A principal arma utilizada por Ramon durante suas jornadas.", icone: "fa-khanda" },
    { id: 2, nome: "Equipamentos Científicos", tipo: "equipamento", raridade: "Raro", descricao: "Instrumentos utilizados em pesquisas e explorações.", icone: "fa-flask" },
    { id: 3, nome: "Material de Pesquisa", tipo: "pesquisa", raridade: "Comum", descricao: "Anotações, registros e informações coletadas durante as jornadas.", icone: "fa-book" },
    { id: 4, nome: "Kit de Exploração", tipo: "equipamento", raridade: "Incomum", descricao: "Materiais de apoio para investigar ambientes desconhecidos.", icone: "fa-compass" },
    { id: 5, nome: "Dinheiros", tipo: "recurso", raridade: "Comum", descricao: "92 unidades disponíveis para as necessidades da jornada.", icone: "fa-coins" },
    { id: 6, nome: "Registros de Campo", tipo: "pesquisa", raridade: "Raro", descricao: "Anotações científicas reunidas durante as investigações.", icone: "fa-file-lines" },
    { id: 7, nome: "Kit de Primeiros Socorros", tipo: "equipamento", raridade: "Incomum", descricao: "Materiais básicos para atendimento durante expedições.", icone: "fa-kit-medical" },
    { id: 8, nome: "Lanterna de Campo", tipo: "equipamento", raridade: "Comum", descricao: "Iluminação portátil para locais pouco iluminados.", icone: "fa-lightbulb" },
    { id: 9, nome: "Caderno de Anotações", tipo: "pesquisa", raridade: "Comum", descricao: "Caderno pessoal para registrar hipóteses e descobertas.", icone: "fa-book-open" },
    { id: 10, nome: "Mapa de Expedição", tipo: "pesquisa", raridade: "Raro", descricao: "Mapa com rotas, observações e pontos de interesse.", icone: "fa-map" },
    { id: 11, nome: "Comunicador", tipo: "equipamento", raridade: "Incomum", descricao: "Dispositivo para manter contato com integrantes da equipe.", icone: "fa-tower-broadcast" },
    { id: 12, nome: "Amostras de Zitanium", tipo: "recurso", raridade: "Épico", descricao: "Amostras coletadas para análise e estudo científico.", icone: "fa-gem" },
    { id: 13, nome: "Chave de Acesso", tipo: "recurso", raridade: "Raro", descricao: "Chave encontrada durante uma investigação.", icone: "fa-key" },
    { id: 14, nome: "Estojo de Instrumentos", tipo: "equipamento", raridade: "Comum", descricao: "Pequenos instrumentos úteis para trabalhos de campo.", icone: "fa-toolbox" },
    { id: 15, nome: "Relatório de Anomalias", tipo: "pesquisa", raridade: "Épico", descricao: "Documento com observações sobre fenômenos inexplicados.", icone: "fa-file-circle-question" },
    { id: 16, nome: "Fragmento Desconhecido", tipo: "recurso", raridade: "Lendário", descricao: "Fragmento de origem desconhecida aguardando análise.", icone: "fa-puzzle-piece" }
];

/* Pesquisa complementar: localStorage guarda os dados no navegador.
   Assim, XP, tema e favoritos continuam salvos após atualizar a página. */
const nivelInicial = 13; // Nível original de Ramon na ficha
const nivelMaximo = 20;
const xpPorNivel = 100;
const xpPorMissao = 20;
const missoes = [
    "Reconhecimento da região",
    "Coleta de amostras",
    "Análise de evidências",
    "Registro de campo",
    "Investigação de anomalias",
    "Relatório para a Guilda",
    "Expedição avançada"
];

// Recupera o progresso salvo. Também migra o XP do sistema antigo.
let progressoSalvo = null;
try {
    progressoSalvo = JSON.parse(localStorage.getItem("ramonProgresso"));
} catch (erro) {
    progressoSalvo = null;
}

const xpAntigo = Number(localStorage.getItem("ramonXp")) || 0;
let nivelAtual = progressoSalvo?.nivel ?? (xpAntigo >= xpPorNivel ? nivelInicial + 1 : nivelInicial);
let xpAtual = progressoSalvo?.xp ?? (xpAntigo >= xpPorNivel ? 0 : xpAntigo);
let missoesConcluidas = progressoSalvo?.missoes ?? 0;
let renascimentos = progressoSalvo?.renascimentos ?? 0;
let filtroAtual = "todos";
let favoritos = [];
try {
    favoritos = JSON.parse(localStorage.getItem("ramonFavoritos")) || [];
    if (!Array.isArray(favoritos)) favoritos = [];
} catch (erro) {
    favoritos = [];
}

/* Menu hambúrguer: abre e fecha no celular e no tablet */
if (menuToggle && menuTopo && menuNavegacao) {
    menuToggle.addEventListener("click", () => {
        const menuAberto = menuTopo.classList.toggle("menu-open");

        menuToggle.setAttribute("aria-expanded", String(menuAberto));
        menuToggle.setAttribute("aria-label", menuAberto ? "Fechar menu" : "Abrir menu");
    });

    menuNavegacao.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menuTopo.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        });
    });

    document.addEventListener("click", (event) => {
        if (!menuTopo.contains(event.target)) {
            menuTopo.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        }
    });
}

/* Navegação com smooth scroll para todos os links internos da página.
   O cálculo considera a altura do cabeçalho fixo para não esconder o título da seção. */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const destinoId = decodeURIComponent(link.getAttribute("href").slice(1));
        const destino = document.getElementById(destinoId);

        if (!destino) return;

        event.preventDefault();

        // Fecha o menu mobile antes de iniciar a navegação.
        if (menuTopo && menuToggle) {
            menuTopo.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        }

        const alturaCabecalho = menuTopo
            ? menuTopo.getBoundingClientRect().height
            : 0;
        const distanciaTopo = destino.getBoundingClientRect().top + window.scrollY;
        const posicaoFinal = Math.max(0, distanciaTopo - alturaCabecalho - 12);

        window.scrollTo({
            top: posicaoFinal,
            behavior: "smooth"
        });

        // Atualiza o endereço com a seção selecionada sem provocar salto instantâneo.
        history.replaceState(null, "", `#${encodeURIComponent(destinoId)}`);
    });
});

/* Cria os cards do inventário usando createElement e forEach */
function mostrarInventario() {
    listaItens.innerHTML = "";

    const itensFiltrados = inventario.filter((item) => {
        return filtroAtual === "todos" || item.tipo === filtroAtual;
    });

    itensFiltrados.forEach((item) => {
        const card = document.createElement("article");
        card.className = "item";

        const icone = document.createElement("div");
        icone.className = "item-icon";

        const imagemIcone = document.createElement("i");
        imagemIcone.className = "fa-solid " + item.icone;
        imagemIcone.setAttribute("aria-hidden", "true");
        icone.appendChild(imagemIcone);

        const conteudo = document.createElement("div");

        const raridade = document.createElement("span");
        raridade.textContent = "RARIDADE • " + item.raridade.toUpperCase();

        const nome = document.createElement("h3");
        nome.textContent = item.nome;

        const descricao = document.createElement("p");
        descricao.textContent = item.descricao;

        const botaoFavorito = document.createElement("button");
        botaoFavorito.type = "button";
        botaoFavorito.className = "item-action";
        botaoFavorito.dataset.id = item.id;

        const estaFavoritado = favoritos.includes(item.id);
        botaoFavorito.classList.toggle("is-favorite", estaFavoritado);
        botaoFavorito.setAttribute("aria-pressed", String(estaFavoritado));
        botaoFavorito.textContent = estaFavoritado ? "★ FAVORITADO" : "☆ FAVORITAR";

        conteudo.appendChild(raridade);
        conteudo.appendChild(nome);
        conteudo.appendChild(descricao);
        conteudo.appendChild(botaoFavorito);

        card.appendChild(icone);
        card.appendChild(conteudo);
        listaItens.appendChild(card);
    });

    contadorInventario.textContent =
        itensFiltrados.length + (itensFiltrados.length === 1 ? " item exibido" : " itens exibidos") +
        " • " + inventario.length + " no total";
}

/* Os filtros mostram qual categoria está selecionada */
botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
        filtroAtual = botao.dataset.filter;

        botoesFiltro.forEach((outroBotao) => {
            const ativo = outroBotao === botao;
            outroBotao.classList.toggle("active", ativo);
            outroBotao.setAttribute("aria-pressed", String(ativo));
        });

        mostrarInventario();
    });
});

/* Delegação de eventos: atende os botões criados dinamicamente */
if (listaItens) {
    listaItens.addEventListener("click", (event) => {
        const botao = event.target.closest(".item-action");

        if (botao) {
            const idItem = Number(botao.dataset.id);
            const jaFavoritado = favoritos.includes(idItem);

            if (jaFavoritado) {
                favoritos = favoritos.filter((id) => id !== idItem);
            } else {
                favoritos.push(idItem);
            }

            localStorage.setItem("ramonFavoritos", JSON.stringify(favoritos));
            mostrarInventario();
        }
    });
}

/* Atualiza a progressão, a missão atual e o nível do personagem */
function salvarProgresso() {
    localStorage.setItem("ramonProgresso", JSON.stringify({
        nivel: nivelAtual,
        xp: xpAtual,
        missoes: missoesConcluidas,
        renascimentos: renascimentos
    }));
}


/* Atributos: evolução automática nos níveis definidos pelo jogador. */
const evolucoesAtributos = [
    { nivel: 14, atributo: "Vigor", chave: "vigor", efeito: "+8 de vida máxima" },
    { nivel: 16, atributo: "Intelecto", chave: "intelecto", efeito: "+5 de sanidade máxima" },
    { nivel: 18, atributo: "Força", chave: "forca", efeito: "+1 de defesa" },
    { nivel: 20, atributo: "Intelecto", chave: "intelecto", efeito: "+5 de sanidade máxima" }
];

function atualizarAtributos() {
    const ganhos = evolucoesAtributos.filter((item) => nivelAtual >= item.nivel);
    const total = (chave) => ganhos.filter((item) => item.chave === chave).length;
    const vigor = 3 + total("vigor");
    const intelecto = 3 + total("intelecto");
    const forca = total("forca");
    const vidaMaxima = 235 + total("vigor") * 8;
    const sanidadeMaxima = 100 + total("intelecto") * 5;
    const sanidadeAtual = 67 + total("intelecto") * 5;
    const defesa = 25 + total("forca");
    const valores = {
        forcaValor: forca, vigorValor: vigor, intelectoValor: intelecto,
        agilidadeValor: 4, menteValor: 5, defesaValor: defesa,
        defesaAtributoPrincipal: defesa, defesaCombate: defesa,
        vidaTexto: `${vidaMaxima} / ${vidaMaxima}`,
        sanidadeTexto: `${sanidadeAtual} / ${sanidadeMaxima}`,
        nivelHero: `NÍVEL ${nivelAtual}`, nivelPerfil: nivelAtual,
        nivelProf: `NÍVEL ${nivelAtual}`
    };
    Object.entries(valores).forEach(([id, valor]) => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = valor;
    });
    const vidaBarra = document.getElementById("vidaBarra");
    const sanidadeBarra = document.getElementById("sanidadeBarra");
    if (vidaBarra) vidaBarra.style.width = "100%";
    if (sanidadeBarra) sanidadeBarra.style.width = `${(sanidadeAtual / sanidadeMaxima) * 100}%`;
    const proxima = evolucoesAtributos.find((item) => nivelAtual < item.nivel);
    const feedback = document.getElementById("atributoFeedback");
    if (feedback) feedback.textContent = proxima
        ? `Próximo atributo: ${proxima.atributo} no nível ${proxima.nivel} (${proxima.efeito}).`
        : "Todos os atributos planejados foram evoluídos.";
}

function atualizarXp(mensagem = "Complete uma missão para ganhar experiência.") {
    const porcentagem = (xpAtual / xpPorNivel) * 100;
    const nivelTexto = document.getElementById("nivelTexto");
    const missaoTexto = document.getElementById("missaoTexto");
    const rebirthTexto = document.getElementById("rebirthTexto");
    const botaoResetXp = document.getElementById("resetXp");

    textoXp.textContent = xpAtual + " / " + xpPorNivel + " XP";
    barraXp.style.width = porcentagem + "%";
    trilhoXp.setAttribute("aria-valuenow", String(xpAtual));
    nivelTexto.textContent = "NÍVEL " + nivelAtual + " / " + nivelMaximo;
    missaoTexto.textContent = nivelAtual >= nivelMaximo
        ? "Todas as missões principais foram concluídas."
        : "Próxima missão: " + missoes[missoesConcluidas % missoes.length];
    rebirthTexto.textContent = "Renascimentos: " + renascimentos;
    feedbackXp.textContent = mensagem;

    const nivelMaximoAtingido = nivelAtual >= nivelMaximo;
    botaoXp.disabled = nivelMaximoAtingido;
    botaoXp.innerHTML = nivelMaximoAtingido
        ? 'NÍVEL MÁXIMO ALCANÇADO <i class="fa-solid fa-trophy"></i>'
        : 'FAZER MISSÃO <i class="fa-solid fa-arrow-up"></i>';
    botaoResetXp.disabled = false;
    atualizarAtributos();
}

if (botaoXp) {
    botaoXp.addEventListener("click", () => {
        if (nivelAtual >= nivelMaximo) return;

        xpAtual += xpPorMissao;
        missoesConcluidas++;
        let mensagem = "Missão concluída! +" + xpPorMissao + " XP. A próxima missão foi liberada.";

        while (xpAtual >= xpPorNivel && nivelAtual < nivelMaximo) {
            xpAtual -= xpPorNivel;
            nivelAtual++;
            const evolucao = evolucoesAtributos.find((item) => item.nivel === nivelAtual);
            mensagem = evolucao
                ? `Nível ${nivelAtual}! ${evolucao.atributo} aumentou em 1 (${evolucao.efeito}). Próxima missão liberada!`
                : `Nível up! Ramon chegou ao nível ${nivelAtual}. Uma nova missão foi desbloqueada!`;
        }

        if (nivelAtual >= nivelMaximo) {
            xpAtual = 0;
            mensagem = "Nível máximo! Ramon alcançou o nível " + nivelMaximo + " e concluiu sua jornada.";
        }

        salvarProgresso();
        atualizarXp(mensagem);
    });
}

/* Rebirth: reinicia a progressão sem apagar tema ou favoritos */
const botaoResetXp = document.getElementById("resetXp");
if (botaoResetXp) {
    botaoResetXp.addEventListener("click", () => {
        const confirmou = window.confirm("Deseja renascer? O nível e o XP voltarão ao início da ficha (nível 13). Seus favoritos e tema serão mantidos.");
        if (!confirmou) return;

        nivelAtual = nivelInicial;
        xpAtual = 0;
        missoesConcluidas = 0;
        renascimentos++;
        salvarProgresso();
        atualizarXp("Renascimento concluído! A jornada de Ramon recomeçou no nível " + nivelInicial + ".");
    });
}

/* História: alterna entre prévia e texto completo */
if (storyToggle && storyContent) {
    storyToggle.addEventListener("click", () => {
        const historiaAberta = storyContent.classList.toggle("story-expanded");

        storyToggle.setAttribute("aria-expanded", String(historiaAberta));
        storyToggle.innerHTML = historiaAberta
            ? 'VER MENOS <i class="fa-solid fa-chevron-up"></i>'
            : 'VER HISTÓRIA COMPLETA <i class="fa-solid fa-book-open"></i>';
    });
}

/* Modo visual alternativo da Guilda */
function atualizarTema() {
    const modoAtivo = document.body.classList.contains("guild-night");

    themeToggle.setAttribute("aria-pressed", String(modoAtivo));
    themeToggle.setAttribute("aria-label", modoAtivo ? "Desativar modo alternativo" : "Ativar modo alternativo");
    themeToggle.innerHTML = modoAtivo
        ? '<i class="fa-solid fa-sun"></i><span>MODO ORIGINAL</span>'
        : '<i class="fa-solid fa-moon"></i><span>MODO NOTURNO</span>';
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("guild-night");
        const modoAtivo = document.body.classList.contains("guild-night");
        localStorage.setItem("ramonTema", modoAtivo ? "noturno" : "original");
        atualizarTema();
    });
}

/* Saudação conforme o horário local de quem acessa a página */
function definirSaudacao() {
    const hora = new Date().getHours();
    let saudacao = "Boa noite";

    if (hora >= 5 && hora < 12) {
        saudacao = "Bom dia";
    } else if (hora >= 12 && hora < 18) {
        saudacao = "Boa tarde";
    }

    saudacaoHero.textContent = saudacao + ", viajante.";
}

/* Validação do formulário de contato com a Guilda */
const abrirBotao = document.getElementById("abrirFormulario");
const formularioArea = document.getElementById("formularioGuilda");
const formulario = document.getElementById("guildForm");
const feedbackFormulario = document.getElementById("guildFeedback");

function mostrarFeedbackFormulario(mensagem, tipo) {
    feedbackFormulario.textContent = mensagem;
    feedbackFormulario.className = "guild-feedback " + tipo;
    feedbackFormulario.hidden = false;
}

if (abrirBotao && formularioArea) {
    abrirBotao.addEventListener("click", () => {
        const vaiAbrir = formularioArea.hidden;
        formularioArea.hidden = !vaiAbrir;

        abrirBotao.setAttribute("aria-expanded", String(vaiAbrir));
        abrirBotao.innerHTML = vaiAbrir
            ? 'FECHAR FORMULÁRIO <i class="fa-solid fa-xmark"></i>'
            : 'CONTATAR A GUILDA <i class="fa-solid fa-envelope"></i>';

        if (vaiAbrir) {
            formularioArea.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}

if (formulario) {
    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = document.getElementById("guildNome");
        const email = document.getElementById("guildEmail");
        const telefone = document.getElementById("guildTelefone");
        const assunto = document.getElementById("guildAssunto");
        const mensagem = document.getElementById("guildMensagem");
        const consentimento = document.getElementById("guildConsentimento");
        const campos = [nome, email, assunto, mensagem]; // Telefone é opcional.

        campos.forEach((campo) => campo.classList.remove("invalid"));

        const campoVazio = campos.find((campo) => !campo.value.trim());

        if (campoVazio) {
            campoVazio.classList.add("invalid");
            mostrarFeedbackFormulario(
                "Envio não realizado. Preencha o campo: " + campoVazio.labels[0].textContent,
                "error"
            );
            campoVazio.focus();
            return;
        }

        if (!email.validity.valid) {
            email.classList.add("invalid");
            mostrarFeedbackFormulario("E-mail inválido. Confira o endereço informado.", "error");
            email.focus();
            return;
        }

        if (!consentimento.checked) {
            mostrarFeedbackFormulario("Marque o consentimento para continuar.", "error");
            consentimento.focus();
            return;
        }

        if (!window.emailjs) {
            mostrarFeedbackFormulario("A biblioteca EmailJS não carregou. Confira sua conexão e se o script do EmailJS está no index.html antes do script.js.", "error");
            return;
        }

        const botaoEnviar = formulario.querySelector('button[type="submit"]');
        const textoOriginal = botaoEnviar ? botaoEnviar.innerHTML : "";
        if (botaoEnviar) {
            botaoEnviar.disabled = true;
            botaoEnviar.textContent = "ENVIANDO...";
        }

        try {
            const dadosEmail = {
                // Variáveis do template personalizado:
                from_name: nome.value.trim(),
                reply_to: email.value.trim(),
                phone: telefone.value.trim(),
                subject: assunto.value,
                message: mensagem.value.trim(),

                // Aliases comuns do template padrão "Contact Us":
                name: nome.value.trim(),
                email: email.value.trim(),
                title: assunto.value,
                telefone: telefone.value.trim(),
                assunto: assunto.value,
                user_name: nome.value.trim(),
                user_email: email.value.trim()
            };

            const resposta = await window.emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                dadosEmail,
                { publicKey: EMAILJS_PUBLIC_KEY }
            );

            if (!resposta || resposta.status !== 200) {
                throw new Error(`Resposta inesperada do serviço: ${resposta?.status ?? "sem status"}`);
            }

            mostrarFeedbackFormulario(
                "Mensagem enviada com sucesso! A Guilda recebeu sua solicitação.",
                "success"
            );
            formulario.reset();
            campos.forEach((campo) => campo.classList.remove("invalid"));
        } catch (erro) {
            const detalhe = erro?.text || erro?.message || "Erro sem descrição retornada pelo serviço.";
            mostrarFeedbackFormulario(
                `O EmailJS recusou o envio. Detalhe: ${detalhe} (código: ${erro?.status ?? "não informado"}). Confira o destinatário e as variáveis do template.`,
                "error"
            );
        } finally {
            if (botaoEnviar) {
                botaoEnviar.disabled = false;
                botaoEnviar.innerHTML = textoOriginal;
            }
        }
    });

    formulario.querySelectorAll("input, select, textarea").forEach((campo) => {
        campo.addEventListener("input", () => campo.classList.remove("invalid"));
        campo.addEventListener("change", () => campo.classList.remove("invalid"));
    });
}

/* Recupera as preferências e atualiza a interface ao carregar */
const temaSalvo = localStorage.getItem("ramonTema");
if (temaSalvo === "noturno") {
    document.body.classList.add("guild-night");
}

mostrarInventario();
atualizarXp();
atualizarTema();
definirSaudacao();
