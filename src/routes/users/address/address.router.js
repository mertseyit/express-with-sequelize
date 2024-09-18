const router = require('express').Router();
const {
  getAllUserAddress,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress
} = require('../../../controllers/user/address/address.contorller');

router.get('/', getAllUserAddress);
router.post('/create', createUserAddress);
router.post('/update/:address_id', updateUserAddress);
router.delete('/delete/:address_id', deleteUserAddress);
module.exports = router;
