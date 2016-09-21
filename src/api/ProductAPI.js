import fetch from 'isomorphic-fetch';

const baseUrl = 'http://us.acc.mentos.beta-preview.nl/api';

class ProductApi {
  static getAllProducts() {
    return fetch(`${baseUrl}/views/products_index.json`)
        .then(response => response.json());
  }
}

export default ProductApi;
