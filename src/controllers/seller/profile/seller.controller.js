const Seller = require('../../../models/Seller');
const createCustomError = require('../../../utils/createCustomError');
const customError = require('../../../utils/customError');
const status = require('http-status');
const bcrypt = require('bcrypt');

const updateProfile = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { name, lastname, email } = req.body;
    const updated = await Seller.update(
      { name, lastname, email },
      { where: { seller_id: id } }
    );
    res.status(status.OK).json({
      msg: 'Updated',
      status: status.OK,
      data: updated
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { password } = req.body;
    if (!password || password === '') {
      return next(customError(createCustomError('Password must be valid')));
    } else {
      const generatedSalt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(password, generatedSalt);
      await Seller.update(
        { password: hashedPassword },
        { where: { seller_id: id } }
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
};

const delteProfile = async (req, res, next) => {
  try {
    const id = req.user.id;
    const deleted = await Seller.destroy({ where: { seller_id: id } });
    req.user = null;
    res.status(status.OK).json({
      msg: 'Deleted',
      status: status.OK,
      data: deleted
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

module.exports = { updateProfile, updatePassword, delteProfile };
