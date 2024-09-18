const {
  getAllOrdersProducts
} = require('../../../controllers/seller/orders_product/ordersProducts.controller');

const router = require('express').Router();

router.get('/', getAllOrdersProducts);

module.exports = router;
