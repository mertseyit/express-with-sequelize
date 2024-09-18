//product add, update and delete router
const router = require('express').Router();
const {
  addProduct,
  updateProduct,
  deleteProduct
} = require('../../../controllers/seller/products/products.contorller');

router.post('/add', addProduct);
router.post('/update/:product_id', updateProduct);
router.delete('/delete/:product_id', deleteProduct);

module.exports = router;
