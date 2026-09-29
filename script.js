const WHATSAPP_NUMBER = "5585987137949";
// Configuração de preços
const MARGEM_PADRAO = 2; // 100% sobre o custo

function calcularPreco(custo) {
  return Number(custo) * MARGEM_PADRAO;
}

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
const products = [
  {
    name: "Colágeno Complex",
    custo: 20.60, 
    category: "Colágenos",
    desc: "Suplemento em cápsulas da linha de cuidados e bem-estar.",
    icon: "🦴",
    image: "assets/colageno-complex.jpg",
    video: true,
  },
  {
    name: "Colágeno Tipo II + Vitamina C",
    custo: 27.17,
    category: "Colágenos",
    desc: "Suplemento alimentar em cápsulas com Colágeno Tipo II e Vitamina C.",
    icon: "🦴",
    image: "assets/colageno-tipo-2.jpg",
  },
  {
    name: "Magnésio Quelado",
    custo: 12.98,
    category: "Vitaminas e Minerais",
    desc: "Opção de magnésio em cápsulas para complementar a alimentação.",
    icon: "💊",
    image: "assets/magnesio-quelado.jpg",
  },
  {
    name: "Vitamina D3",
    custo: 12.90,
    category: "Vitaminas e Minerais",
    desc: "Vitamina D3 em cápsulas, conforme orientação do fabricante.",
    icon: "☀️",
    image: "assets/vitamina-d3.png",
  },
  {
    name: "Resfrimuni Mais",
    custo: 19.50,
    category: "Vitaminas e Minerais",
    desc: "Suplemento alimentar em cápsulas, conforme orientação do fabricante.",
    icon: "🌿",
    image: "assets/resfrimuni-mais.png",
  },
  {
    name: "Zinco Quelato",
    custo: 16.80,
    category: "Vitaminas e Minerais",
    desc: "Suplemento alimentar de zinco quelato em cápsulas, conforme orientação do fabricante.",
    icon: "💊",
    image: "assets/zinco-quelato.jpg",
  },
  {
    name: "Extrato de Própolis Verde",
    custo: 23.40,
    category: "Produtos Naturais",
    desc: "Extrato de própolis verde 30 ml, conforme orientação do fabricante.",
    icon: "🌿",
    image: "assets/extrato-propolis.png",
  },
  {
    name: "Ômega 3 Tripla Fonte",
    custo: 25.90,
    category: "Vitaminas e Minerais",
    desc: "Suplemento alimentar em cápsulas com DHA, EPA e ALA.",
    icon: "💊",
    image: "assets/omega-3.jpg",
  },
  {
    name: "Cúrcuma + Pimenta Negra",
    custo: 25.60,
    category: "Produtos Naturais",
    desc: "Combinação em cápsulas apresentada no catálogo Natuvel.",
    icon: "🌿",
    image: "assets/curcuma-pimenta-negra.jpg",
  },
  {
    name: "Cranberry + Vitaminas",
    custo: 24.60,
    category: "Vitaminas e Minerais",
    desc: "Cranberry combinado com vitaminas em cápsulas.",
    icon: "🍒",
    image: "assets/cranberry-vitaminas.jpg",
  },
  {
    name: "Psyllium Laranja & Acerola",
    custo: 21.97,
    category: "Fibras",
    desc: "Suplemento alimentar em cápsulas de Psyllium com Laranja e Acerola. Contém 100 cápsulas.",
    icon: "🌾",
    image: "assets/psyllium.jpg",
  },
  {
    name: "Super Gel 30 Ervas",
    custo: 12.30,
    category: "Pomadas e Géis",
    desc: "Gel massageador para cuidados corporais, conforme orientação do fabricante.",
    icon: "🧴",
    image: "assets/super-gel-30-ervas.jpg",
  },
  {
    name: "Canela de Velho",
    custo: 8.40,
    category: "Pomadas e Géis",
    desc: "Pomada massageadora para cuidados corporais, conforme orientações do fabricante.",
    icon: "🧴",
    image: "assets/canela-de-velho.jpg",
  },
  {
    name: "Sabonete Líquido Íntimo Bebelo",
    custo: 5.80,
    category: "Cuidados Pessoais",
    desc: "Sabonete líquido íntimo Bebelo Tutti Frutti, com ácido láctico. Conteúdo 200 mL.",
    icon: "🌸",
    image: "assets/sabonete-intimo-bebelo.webp",
  },

];
const grid = document.querySelector("#grid"),
  filters = document.querySelector("#filters"),
  search = document.querySelector("#search");
let active = "Todos";
const cats = ["Todos", ...new Set(products.map((p) => p.category))];
function wa(m) {
  return WHATSAPP_NUMBER.includes("SEUNUMERO")
    ? "https://wa.me/?text=" + encodeURIComponent(m)
    : "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(m);
}
function renderFilters() {
  filters.innerHTML = cats
    .map(
      (c) =>
        `<button class="filter ${c === active ? "active" : ""}" data-c="${c}">${c}</button>`,
    )
    .join("");
  filters.querySelectorAll("button").forEach(
    (b) =>
      (b.onclick = () => {
        active = b.dataset.c;
        renderFilters();
        render();
      }),
  );
}
function render() {
  const t = search.value.toLowerCase();
  const arr = products.filter(
    (p) =>
      (active === "Todos" || p.category === active) &&
      (p.name.toLowerCase().includes(t) ||
        p.category.toLowerCase().includes(t)),
  );
  grid.innerHTML = arr.length
    ? arr
        .map(
          (p) =>
            `<article class="card">${p.image ? `<img class="product-img" src="${p.image}" alt="${p.name}">` : `<span class="icon">${p.icon}</span>`}<span class="pill">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p>${p.custo ? `<div class="price">${formatarPreco(calcularPreco(p.custo))}</div>` : ""}${p.video ? '<a href="#video">Ver vídeo →</a>' : ""}<a class="btn" href="${wa("Olá! Vi o produto " + p.name + " na NatuLife Store e quero saber o valor, disponibilidade e entrega.")}">Quero saber mais</a></article>`,
        )
        .join("")
    : '<div class="empty">Nenhum produto encontrado.</div>';
}
document
  .querySelectorAll(".wa")
  .forEach((a) => (a.href = wa(a.dataset.msg || "Olá! Quero atendimento.")));
search.oninput = render;
document.querySelector(".menu-btn").onclick = () =>
  document.querySelector(".nav").classList.toggle("open");
document.querySelector("#year").textContent = new Date().getFullYear();
renderFilters();
render();

// ===== PRODUTOS AUTOMÁTICOS =====
async function carregarProdutosAutomaticos() {
  try {
    const resposta = await fetch("./produtos.json");
    const produtosAutomaticos = await resposta.json();

    console.log("Produtos carregados:", produtosAutomaticos);
    const kit = produtosAutomaticos.find(
  produto => produto.id === "kit-natulife"
);

if (kit) {
  const preco = document.querySelector(".video-price");

  const nome = document.querySelector(".video-title");

if (nome) {
  nome.textContent = kit.nome;
}

const descricao = document.querySelector(".video-description");

if (descricao) {
  descricao.textContent = kit.descricao;
}

const imagemKit = document.querySelector(".video-item img");

if (imagemKit && kit.imagem) {
  imagemKit.src = kit.imagem;
  imagemKit.alt = kit.nome;
}
  if (preco) {
    preco.textContent = kit.preco;
  }
  const botaoMercadoLivre = document.querySelector(".mercado-livre");

if (botaoMercadoLivre) {
  botaoMercadoLivre.href = kit.linkCompra;
}
const videoKit = document.querySelector(".video-item video");

if (videoKit && kit.video) {
  videoKit.src = kit.video;
  videoKit.load();
}
}
  } catch (erro) {
    console.error("Erro ao carregar produtos.json:", erro);
  }
}

carregarProdutosAutomaticos();