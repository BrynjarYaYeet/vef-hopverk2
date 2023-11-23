import { getAllProds } from "./api.js";
import { el } from "./element.js";

function setLoading(parentElement, takki) {
    let loadingElement = parentElement.querySelector('.loading');
  
    if (!loadingElement) {
      loadingElement = el('div', { class: 'loading' }, 'Sæki gögn...');
      parentElement.appendChild(loadingElement);
    }

    const button = takki.querySelector('button');

    if (button) {
      button.setAttribute('disabled', 'disabled');
    }
  }
  
  function setNotLoading(parentElement, takki) {
    const loadingElement = parentElement.querySelector('.loading');
  
    if (loadingElement) {
      loadingElement.remove();
    }

    const disabledButton = takki.querySelector('button[disabled]');

    if (disabledButton) {
      disabledButton.removeAttribute('disabled');
    }
  
}

function createAllProds(results) {
  const wrap = el('section', { class: 'wrapper' });

  if (!results) {
    // Error state
    const item = el('span', { class: 'result' }, 'Villa við að sækja gögn.');
    wrap.appendChild(item);
  } else {
    // Empty state
    if (results.length === 0) {
      const item = el('span', { class: 'result' }, 'Ekkert fannst.');
      wrap.appendChild(item);
    }

    // Data state
    console.log(results);
    for (const result of results) {
      const item = el(
        'div',
        { class: 'box' },
        el('a', { href: `/?id=${result.id}` }, result.title),
        el('span', { class: 'verd_allar_vorur' }, result.price, 'kr.'),
        el('span', { class: 'category_allar_vorur'}, result.category_title),
        el('img', { src: result.image, alt: 'mynd', class: 'mynd_allar_vorur'}),
      );
      wrap.appendChild(item);
    }
  }

  return el(
    'div',
    { class: 'results' },
    el('h2', {}, 'Allar vörur'),
    wrap,
  );
}


export async function renderAll(parentElement){
      const mainElement = parentElement.querySelector('main');
      const headerElement = parentElement.querySelector('header');

      if (!mainElement) {
        console.warn('fann ekki <main> element');
        return;
      }

      if (!headerElement) {
        console.warn('fann ekki <header> element');
        return;
      }
    
      const resultsElement = mainElement.querySelector('.box');
      if (resultsElement) {
        resultsElement.remove();
      }

      setLoading(mainElement, headerElement);
      const results = await getAllProds();
      setNotLoading(mainElement, headerElement);
    
      const resultsEl = createAllProds(results.items);
    
      mainElement.appendChild(resultsEl);
}