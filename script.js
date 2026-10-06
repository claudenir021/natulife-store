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

let products = [];

const grid = document.querySelector("#grid"),
  filters = document.querySelector("#filters"),
  search = document.querySelector("#search");
let active = "Todos";
let cats = ["Todos"];
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
            `<article class="card">${p.image ? `<img class="product-img" src="${p.image}" alt="${p.name}">` : `<span class="icon">${p.icon}</span>`}<span class="pill">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p>${p.custo ? `<div class="price">${formatarPreco(calcularPreco(p.custo))}</div>` : ""}${p.video ? '<a href="#video">Ver vídeo →</a>' : ""}<a class="btn" href="${wa("Olá! Vi o produto " + p.name + " - " + (p.id === "kit-natulife" ? p.preco : formatarPreco(calcularPreco(p.custo)))+ " na NatuLife Store e quero saber sobre disponibilidade e entrega.")}">Quero saber mais</a></article>`,
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



// ===== PRODUTOS AUTOMÁTICOS =====
async function carregarProdutosAutomaticos() {
  try {
    const resposta = await fetch("./produtos.json");
    const produtosAutomaticos = await resposta.json();
products = produtosAutomaticos
  .filter((produto) => produto.ativo !== false)
  .map((produto) => ({
    ...produto,
    name: produto.nome || "",
    desc: produto.descricao || "",
    category: produto.categoria || "Produtos",
    image: produto.imagem || "",
    custo: Number(produto.custo) || 0,
    preco: produto.preco || "",
    video: produto.video || "",
    linkCompra: produto.linkCompra || ""
  }));

cats = [
  "Todos",
  ...new Set(products.map((produto) => produto.category).filter(Boolean))
];

renderFilters();
render();
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