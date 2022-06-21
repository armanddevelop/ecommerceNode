const express = require('express');
const router = express.Router();
const ProductService = require('../services/productServices');

const service = new ProductService();

router.get('/', (req, res) => {
  const result = service.find();
  res.json(result);
});

router.post('/', (req, res) => {
  const { name, price, image } = req.body;
  const result = service.create({ name, price, image });
  res.status(201).json({
    message: 'created',
    data: result,
  });
});

router.patch('/:productId', (req, res) => {
  const { productId } = req.params;
  const body = req.body;
  const result = service.update(productId, body);
  res.status(201).json({
    message: 'udpated',
    data: result,
  });
});

router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  if (productId === '999') {
    return res.status(404).json({
      message: 'not found',
    });
  }
  const result = service.findOne(productId);
  res.status(200).json(result);
});

router.delete('/:productId', (req, res) => {
  const { productId } = req.params;
  const result = service.delete(productId);
  res.status(200).json({
    message: 'delete',
    data: result,
  });
});

module.exports = router;
