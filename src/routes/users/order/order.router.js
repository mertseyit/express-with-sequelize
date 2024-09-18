const router = require('express').Router();
const {
  getAllUserOrder,
  createAnOrder,
  cancelAnOrder
} = require('../../../controllers/user/order/order.controller');

router.get('/', getAllUserOrder);
router.post('/create-order/', createAnOrder);
router.post('/cancel/:order_id', cancelAnOrder);

module.exports = router;
