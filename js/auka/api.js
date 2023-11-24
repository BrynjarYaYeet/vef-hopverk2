const URL_products =
  "https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products";

export async function getAllProds() {
  let response;
  try {
    response = await fetch(URL_products);
  } catch (error) {
    console.warn("villa við að sækja gögn", error);
    return null;
  }

  if (!response.ok) {
    console.error("Fékk ekki 200 status frá API", response);
    return null;
  }

  let data;

  try {
    data = await response.json();
  } catch (e) {
    console.error("Villa við að lesa gögn", e);
    return null;
  }

  return data;
}

export async function getProductById(id) {
  const url = new URL(`products/${id}`, URL_products);

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    console.warn("villa við að sækja gögn", error);
    return null;
  }

  if (!response.ok) {
    console.error("Fékk ekki 200 status frá API", response);
    return null;
  }
  let data;

  try {
    data = await response.json();
  } catch (e) {
    console.error("Villa við að lesa gögn", e);
    return null;
  }
  return data;
}

export async function getThreeProductsByCategory(category) {
  const url = new URL(`products?limit=3&category=${category}`, URL_products);

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    console.warn("villa við að sækja gögn", error);
    return null;
  }

  if (!response.ok) {
    console.error("Fékk ekki 200 status frá API", response);
    return null;
  }
  let data;

  try {
    data = await response.json();
  } catch (e) {
    console.error("Villa við að lesa gögn", e);
    return null;
  }
  return data;
}