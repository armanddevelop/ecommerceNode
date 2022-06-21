const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { categoryId } = req.params;
  res.json({
    name: [
      {
        categoryId,
        category: 'Games',
        products: [],
      },
      {
        categoryId,
        category: 'clothes',
        products: [],
      },
    ],
  });
});

router.get('/:idCategorie/products/:productId', (req, res) => {
  const { idCategorie, productId } = req.params;
  res.json({
    name: 'Product2',
    price: 1100,
    idCategorie,
    productId,
  });
});

router.get('/:categorieName/:idCategorie', (req, res) => {
  const { idCategorie, categorieName } = req.params;
  res.json([
    {
      idCategorie,
      categorieName,
      products: [],
    },
  ]);
});

module.exports = router;
