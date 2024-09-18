const { getALLUsers } = require('../../controllers/public/users.controller');

const router = require('express').Router();

router.get('/', getALLUsers);

module.exports = router;
