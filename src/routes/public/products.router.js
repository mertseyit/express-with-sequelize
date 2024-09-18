const {
  getAllProducts
} = require('../../controllers/public/product.contorller');

const router = require('express').Router();

router.get('/', getAllProducts);

module.exports = router;
