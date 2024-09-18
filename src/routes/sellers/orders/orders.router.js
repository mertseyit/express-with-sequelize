const {
  getAllUserOrders
} = require('../../../controllers/seller/order/seller.order.controller');

const router = require('express').Router();

router.get('/', getAllUserOrders);

module.exports = router;
