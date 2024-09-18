const router = require('express').Router();

const sellerAuthMiddleWare = require('../../middlewares/sellerAuthMiddleWare');
const {
  sellerRegisterController,
  sellerLoginController,
  sellerWhoAmIController
} = require('../../controllers/auth/seller/seller.auth.controller');

router.post('/register', sellerRegisterController);
router.post('/login', sellerLoginController);
router.get('/whoami', sellerAuthMiddleWare, sellerWhoAmIController);

module.exports = router;
