//update and delete account process.
const router = require('express').Router();
const User = require('../../../models/User');
const createCustomError = require('../../../utils/createCustomError');
const customError = require('../../../utils/customError');
const status = require('http-status');
const bcrypt = require('bcrypt');

router.post('/update', async (req, res, next) => {
  try {
    const id = req.user.id;
    const { name, lastname, email } = req.body;
    const updated = await User.update(
      { name, lastname, email },
      { where: { user_id: id } }
    );
    res.status(status.OK).json({
      msg: 'Updated',
      status: status.OK,
      data: updated
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
});

router.post('/update-password', async (req, res, next) => {
  try {
    const id = req.user.id;
    const { password } = req.body;
    if (!password || password === '') {
      return next(customError(createCustomError('Password must be valid')));
    } else {
      const generatedSalt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(password, generatedSalt);
      await User.update(
        { password: hashedPassword },
        { where: { user_id: id } }
      );
      delete password;
      delete hashedPassword;
      res.status(status.OK).json({
        msg: 'Password Updated',
        status: status.OK,
        data: null
      });
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
});

router.delete('/delete', async (req, res, next) => {
  try {
    const id = req.user.id;
    const deleted = await User.destroy({ where: { user_id: id } });
    req.user = null;
    res.status(status.OK).json({
      msg: 'Deleted',
      status: status.OK,
      data: deleted
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
});

module.exports = router;
