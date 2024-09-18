const {
  updateProfile,
  updatePassword,
  delteProfile
} = require('../../../controllers/seller/profile/seller.controller');

//update and delete account process.
const router = require('express').Router();

router.post('/update', updateProfile);

router.post('/update-password', updatePassword);

router.delete('/delete', delteProfile);

module.exports = router;
