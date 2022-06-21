const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    return res.json({
      limit,
      offset,
    });
  }
  res.send('no hay parametros :(');
});

module.exports = router;
