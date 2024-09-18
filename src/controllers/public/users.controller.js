const User = require('../../models/User');
const customError = require('../../utils/customError');
const status = require('http-status');

const getALLUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    allUsers.forEach((user) => {
      delete user.dataValues.password;
    });
    res.status(status.OK).json({
      msg: '',
      status: status.OK,
      data: allUsers
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

module.exports = { getALLUsers };
