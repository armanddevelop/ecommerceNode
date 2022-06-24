const Joi = require('joi');

const productId = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(5);
const image = Joi.string().uri();
const bloked = Joi.bool();
const productSchema = {
  productId: productId,
  name: name.required(),
  price: price.required(),
  image: image.required(),
  bloked: bloked,
};

const updateProductSchema = {
  name: name.required(),
  price: price.required(),
  image: image,
};

const getProductSchema = {
  productId: productId.required(),
};

const createProduct = Joi.object(productSchema);
const updateProduct = Joi.object(updateProductSchema);
const getProduct = Joi.object(getProductSchema);

module.exports = { createProduct, updateProduct, getProduct };
