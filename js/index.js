import { renderAll } from "./auka/ui.js";

async function onSearch(e) {
  e.preventDefault();

  if (!e.target || !(e.target instanceof Element)) {
    return;
  }

  await renderAll(document.body);
  window.history.pushState({}, '', `/products`);
}

let allarVorur = document.getElementById('allProds');
allarVorur.addEventListener('click', onSearch);

function route() {
    
    const currentURL = window.location.href;
    const containsProducts = currentURL.includes('/products');
  
    if(containsProducts){
      renderAll(document.body);
    }

  }
  
  // Bregst við því þegar við notum vafra til að fara til baka eða áfram.
  
window.onpopstate = () => {
    empty(document.body);
    route();
};
  
  
// Athugum í byrjun hvað eigi að birta.
route();

window.onload = route();