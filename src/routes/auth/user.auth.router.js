const router = require('express').Router();
const {
  userRegisterController,
  userLoginController,
  userWhoAmIController
} = require('../../controllers/auth/user/user.auth.controller');
const userAuthMiddleWare = require('../../middlewares/userAuthMiddleWare');

router.post('/register', userRegisterController);
router.post('/login', userLoginController);
router.get('/whoami', userAuthMiddleWare, userWhoAmIController);

module.exports = router;
