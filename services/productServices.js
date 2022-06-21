const faker = require('faker');

class ProductService {
  constructor() {
    this.products = [];
    this.generate(50);
  }

  generate(size) {
    const limit = size || 10;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        id: faker.datatype.uuid(),
      });
    }
  }

  create(productInfo) {
    const newProduct = productInfo;
    newProduct.id = faker.datatype.uuid();
    this.products.push(newProduct);
    return this.findOne(newProduct.id);
  }

  update(productId, productInfo) {
    const index = this.products.findIndex(({ id }) => id === productId);
    if (index === -1) {
      throw new Error('product not found');
    }
    const product = this.products[index];

    this.products[index] = { ...product, ...productInfo };

    return this.products[index];
  }

  find() {
    return this.products;
  }

  findOne(idPRoduct) {
    return this.products.filter(({ id }) => idPRoduct === id);
  }

  delete(idToDelete) {
    return this.products.filter(({ id }) => idToDelete !== id);
  }
}

module.exports = ProductService;
