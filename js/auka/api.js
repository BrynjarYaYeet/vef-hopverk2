const URL_products = 'https://vef1-2023-h2-api-791d754dda5b.herokuapp.com/products';

export async function getAllProds(){
    debugger;
    let response;
    try {
        response = await fetch(URL_products);
    } catch (error) {
        console.warn('villa við að sækja gögn', error);
        return null;
    }

    if (!response.ok) {
        console.error('Fékk ekki 200 status frá API', response);
        return null;
    }

    let data;

    try {
      data = await response.json();
    } catch (e) {
      console.error('Villa við að lesa gögn', e);
      return null;
    }
  
    const results = data?.results ?? [];

    let objArray = [];
    for(let i = 0; i < data.limit; i++){
        let item = data.items[i];
        objArray.push(item);
    };

    return objArray;
}