const faker = require('faker');
const boom = require('@hapi/boom');

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
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  create(productInfo) {
    const newProduct = productInfo;
    newProduct.id = faker.datatype.uuid();
    this.products.push(newProduct);
    return newProduct;
  }

  update(productId, productInfo) {
    const index = this.products.findIndex(({ id }) => id === productId);

    if (index === -1 || this.products[index].isBlock) {
      throw new Error('product not found');
    }
    const product = this.products[index];

    this.products[index] = { ...product, ...productInfo };

    return this.products[index];
  }

  find() {
    return this.products;
  }

  async findOne(idPRoduct) {
    const product = this.products.filter(({ id }) => idPRoduct === id);

    if (product.length === 0) {
      throw boom.notFound('product not found :(');
    }

    if (product[0].isBlock) {
      throw boom.conflict(`the product is block`);
    }
    return product;
  }

  delete(idToDelete) {
    return this.products.filter(({ id }) => idToDelete !== id);
  }
}

module.exports = ProductService;
