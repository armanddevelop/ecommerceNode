const express = require('express');
const router = express.Router();
const ProductService = require('../services/productServices');
const validatorHandler = require('../midlewares/validatorHandler');
const {
  createProduct,
  updateProduct,
  getProduct,
} = require('../schemas/productSchema');

const service = new ProductService();

router.get('/', (req, res) => {
  const result = service.find();
  res.json(result);
});

router.post('/', validatorHandler(createProduct, 'body'), (req, res) => {
  const { name, price, image } = req.body;
  const result = service.create({ name, price, image });
  res.status(201).json({
    message: 'created',
    data: result,
  });
});

router.patch(
  '/:productId',
  validatorHandler(getProduct, 'params'),
  validatorHandler(updateProduct, 'body'),
  (req, res) => {
    const { productId } = req.params;
    const body = req.body;
    const result = service.update(productId, body);
    res.status(201).json({
      message: 'udpated',
      data: result,
    });
  }
);

router.get(
  '/:productId',
  validatorHandler(getProduct, 'params'),
  async (req, res, next) => {
    const { productId } = req.params;
    try {
      const result = await service.findOne(productId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:productId',
  validatorHandler(getProduct, 'params'),
  (req, res) => {
    const { productId } = req.params;
    const result = service.delete(productId);
    res.status(200).json({
      message: 'delete',
      data: result,
    });
  }
);

module.exports = router;
