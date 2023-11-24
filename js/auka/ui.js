import {
  getAllProds,
  getProductById,
  getThreeProductsByCategory,
} from "./api.js";
import { el } from "./element.js";

function setLoading(parentElement, takki) {
  let loadingElement = parentElement.querySelector(".loading");

  if (!loadingElement) {
    loadingElement = el("div", { class: "loading" }, "Sæki gögn...");
    parentElement.appendChild(loadingElement);
  }

  const button = takki.querySelector("button");

  if (button) {
    button.setAttribute("disabled", "disabled");
  }
}

function setNotLoading(parentElement, takki) {
  const loadingElement = parentElement.querySelector(".loading");

  if (loadingElement) {
    loadingElement.remove();
  }

  const disabledButton = takki.querySelector("button[disabled]");

  if (disabledButton) {
    disabledButton.removeAttribute("disabled");
  }
}

function createAllProds(results) {
  const wrap = el("section", { class: "wrapper" });

  if (!results) {
    // Error state
    const item = el("span", { class: "result" }, "Villa við að sækja gögn.");
    wrap.appendChild(item);
  } else {
    // Empty state
    if (results.length === 0) {
      const item = el("span", { class: "result" }, "Ekkert fannst.");
      wrap.appendChild(item);
    }

    // Data state
    for (const result of results) {
      const item = el(
        "div",
        { class: "box" },
        el("a", { href: `/?id=${result.id}` }, result.title),
        el("span", { class: "verd_allar_vorur" }, result.price, "kr."),
        el("span", { class: "category_allar_vorur" }, result.category_title),
        el("img", {
          src: result.image,
          alt: "mynd",
          class: "mynd_allar_vorur",
        }),
      );
      wrap.appendChild(item);
    }
  }

  return el("div", { class: "results" }, el("h2", {}, "Allar vörur"), wrap);
}

function createOneProduct(results) {
  const wrap = el("section", { class: "product-wrapper" });

  if (!results) {
    // Error state
    const item = el("span", { class: "result" }, "Villa við að sækja gögn.");
    wrap.appendChild(item);
  } else {
    // Empty state
    if (results.length === 0) {
      const item = el("span", { class: "result" }, "Ekkert fannst.");
      wrap.appendChild(item);
    }

    // Data state
    const item = el(
      "div",
      { class: "product-box" },
      el(
        "div",
        { class: "verd-og-category" },
        el("span", { class: "verd_ein_vara" }, results.price, "kr."),
        el("span", { class: "category_ein_vara" }, results.category_title),
      ),
      el("img", { src: results.image, alt: "mynd", class: "mynd_ein_vara" }),
      el("span", { class: "desc_ein_vara" }, results.description),
      el("a", { href: "/products" }, "Til baka"),
    );
    wrap.appendChild(item);
  }
  return el("div", { class: "results" }, el("h2", {}, results.title), wrap);
}

function createThreeProducts(results) {
  const wrap = el("section", { class: "wrapper" });

  if (!results) {
    // Error state
    const item = el("span", { class: "result" }, "Villa við að sækja gögn.");
    wrap.appendChild(item);
  } else {
    // Empty state
    if (results.length === 0) {
      const item = el("span", { class: "result" }, "Ekkert fannst.");
      wrap.appendChild(item);
    }

    // Data state
    for (const result of results.items) {
      const item = el(
        "div",
        { class: "box" },
        el("a", { href: `/?id=${result.id}` }, result.title),
        el("span", { class: "verd_allar_vorur" }, result.price, "kr."),
        el("span", { class: "category_allar_vorur" }, result.category_title),
        el("img", {
          src: result.image,
          alt: "mynd",
          class: "mynd_allar_vorur",
        }),
      );
      wrap.appendChild(item);
    }
  }

  return el(
    "div",
    { class: "results-recommend" },
    el("h2", {}, "Fleyri vörur eins og þessi!"),
    wrap,
  );
}

function createNewestProducts(array) {
  const wrap = el("section", { class: "wrapper" });

  if (!array) {
    // Error state
    const item = el("span", { class: "result" }, "Villa við að sækja gögn.");
    wrap.appendChild(item);
  } else {
    // Empty state
    if (array.length === 0) {
      const item = el("span", { class: "result" }, "Ekkert fannst.");
      wrap.appendChild(item);
    }

    // Data state
    for (const result of array) {
      const item = el(
        "div",
        { class: "box" },
        el("a", { href: `/?id=${result.id}` }, result.title),
        el("span", { class: "verd_allar_vorur" }, result.price, "kr."),
        el("span", { class: "category_allar_vorur" }, result.category_title),
        el("img", {
          src: result.image,
          alt: "mynd",
          class: "mynd_allar_vorur",
        }),
      );
      wrap.appendChild(item);
    }
  }

  return el(
    "div",
    { class: "results-recommend" },
    el("h2", {}, "Nýjustu vörur!"),
    wrap,
  );
}

export async function renderAll(parentElement) {
  const mainElement = parentElement.querySelector("main");
  const headerElement = parentElement.querySelector("header");

  if (!mainElement) {
    console.warn("fann ekki <main> element");
    return;
  }

  if (!headerElement) {
    console.warn("fann ekki <header> element");
    return;
  }

  const resultsElement = mainElement.querySelector(".wrapper");
  const resultsElementHeader = mainElement.querySelector(".results");
  const resultsRecommendHeader =
    mainElement.querySelector(".results-recommend");
  if (resultsElement) {
    resultsElement.remove();
  }
  if (resultsElementHeader) {
    resultsElementHeader.remove();
  }

  if (resultsRecommendHeader) {
    resultsRecommendHeader.remove();
  }

  setLoading(mainElement, headerElement);
  const results = await getAllProds();
  setNotLoading(mainElement, headerElement);

  const resultsEl = createAllProds(results.items);

  mainElement.appendChild(resultsEl);
}

export async function renderOneProduct(parentElement, id) {
  const mainElement = parentElement.querySelector("main");
  const headerElement = parentElement.querySelector("header");

  if (!mainElement) {
    console.warn("fann ekki <main> element");
    return;
  }

  if (!headerElement) {
    console.warn("fann ekki <header> element");
    return;
  }

  const resultsElement = mainElement.querySelector(".wrapper");
  const resultsElementHeader = mainElement.querySelector(".results");
  const resultsRecommendHeader =
    mainElement.querySelector(".results-recommend");
  if (resultsElement) {
    resultsElement.remove();
  }
  if (resultsElementHeader) {
    resultsElementHeader.remove();
  }

  if (resultsRecommendHeader) {
    resultsRecommendHeader.remove();
  }

  setLoading(mainElement, headerElement);
  const results = await getProductById(id);
  const categoryResults = await getThreeProductsByCategory(results.category_id);
  setNotLoading(mainElement, headerElement);

  const resultsEl = createOneProduct(results);
  const resultsCateegoryEl = createThreeProducts(categoryResults);

  mainElement.appendChild(resultsEl);
  mainElement.appendChild(resultsCateegoryEl);
}

function processObjectsBasedOnDate(arrayOfObjects) {
  arrayOfObjects.sort((a, b) => new Date(b.created) - new Date(a.created));

  const sixNewestObjects = arrayOfObjects.slice(0, 6);

  return sixNewestObjects;
}

export async function renderFrontPage(parentElement) {
  const mainElement = parentElement.querySelector("main");
  const headerElement = parentElement.querySelector("header");

  if (!mainElement) {
    console.warn("fann ekki <main> element");
    return;
  }

  if (!headerElement) {
    console.warn("fann ekki <header> element");
    return;
  }

  const resultsElement = mainElement.querySelector(".wrapper");
  const resultsElementHeader = mainElement.querySelector(".results");
  const resultsRecommendHeader =
    mainElement.querySelector(".results-recommend");
  if (resultsElement) {
    resultsElement.remove();
  }
  if (resultsElementHeader) {
    resultsElementHeader.remove();
  }

  if (resultsRecommendHeader) {
    resultsRecommendHeader.remove();
  }
  setLoading(mainElement, headerElement);
  const results = await getAllProds();
  setNotLoading(mainElement, headerElement);

  const newObjects = processObjectsBasedOnDate(results.items);

  const resultsNewestEl = createNewestProducts(newObjects);

  mainElement.appendChild(resultsNewestEl);
}
