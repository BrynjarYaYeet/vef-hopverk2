import { renderAll, renderOneProduct } from "./auka/ui.js";
import { empty } from "./auka/element.js";
import { getThreeProductsByCategory } from "./auka/api.js";

async function onSearch(e) {
  e.preventDefault();

  if (!e.target || !(e.target instanceof Element)) {
    return;
  }

  await renderAll(document.body);
  window.history.pushState({}, "", `/products`);
}

let allarVorur = document.getElementById("allProds");
allarVorur.addEventListener("click", onSearch);

let faraAHeimasidu = document.getElementById("heimasida");
faraAHeimasidu.addEventListener("click", faraHeimasida);

function faraHeimasida() {
  window.location.href = window.location.origin;
}

function route() {
  const currentURL = window.location.href;
  const containsProducts = currentURL.includes("/products");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (containsProducts) {
    renderAll(document.body);
  } else if (id) {
    renderOneProduct(document.body, id);
  }
}

// Bregst við því þegar við notum vafra til að fara til baka eða áfram.

window.onpopstate = () => {
  empty(document.body);
  route();
};

// Athugum í byrjun hvað eigi að birta.
route();
//window.onload = route;
