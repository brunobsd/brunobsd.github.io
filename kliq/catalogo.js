// Produtos fixos do protótipo. A mesma lista existe em
// mobile/android/app/src/main/kotlin/br/com/kliq/kliq/CatalogoDeTeste.kt; mantenha as duas iguais.
const produtos = [
  { id: "1", nome: "Camiseta Básica", precoEmCentavos: 5990, emoji: "👕", rotuloDaOpcao: "Tamanho", opcoes: ["P", "M", "G", "GG"] },
  { id: "2", nome: "Vestido Floral", precoEmCentavos: 12990, emoji: "👗", rotuloDaOpcao: "Tamanho", opcoes: ["P", "M", "G"] },
  { id: "3", nome: "Batom Matte", precoEmCentavos: 3490, emoji: "💄", rotuloDaOpcao: "Cor", opcoes: ["Vermelho", "Nude", "Rosa"] },
];

const PACOTE_DO_APP = "br.com.kliq.kliq";
const ENDERECO_DO_APK = "https://github.com/brunobsd/brunobsd.github.io/releases/latest/download/kliq-teste.apk";

function buscarProduto(id) {
  return produtos.find((produto) => produto.id === id);
}

function formatarPreco(centavos) {
  return (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Plano B quando o Instagram abre o link no navegador dele: aciona o app pelo esquema kliq://.
// Sem o app instalado, o Android cai no endereço de reserva (a área de download).
function linkParaAbrirNaBolha(produtoId) {
  const reserva = encodeURIComponent(`${location.origin}/kliq/#baixar`);
  return `intent://p/${produtoId}#Intent;scheme=kliq;package=${PACOTE_DO_APP};S.browser_fallback_url=${reserva};end`;
}

// Mesmo formato gerado pelo app: id~opcao~quantidade, separados por vírgula.
function linkDoCheckout(itens) {
  const valor = itens.map((item) => `${item.produtoId}~${item.opcao}~${item.quantidade}`).join(",");
  return `/kliq/checkout/?itens=${encodeURIComponent(valor)}`;
}

function lerItensDoCheckout(valor) {
  return (valor || "")
    .split(",")
    .map((parte) => parte.split("~"))
    .filter((partes) => partes.length === 3)
    .map(([produtoId, opcao, quantidade]) => ({ produtoId, opcao, quantidade: Number.parseInt(quantidade, 10) }))
    .filter((item) => buscarProduto(item.produtoId) && item.quantidade > 0);
}
