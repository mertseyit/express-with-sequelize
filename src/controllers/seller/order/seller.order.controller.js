const Order = require('../../../models/Order');
const User = require('../../../models/User');
const customError = require('../../../utils/customError');
const status = require('http-status');

const getAllUserOrders = async (req, res, next) => {
  try {
    const allOrders = await Order.findAll({
      include: [
        {
          model: User,
          as: 'order_user',
          attributes: {
            exclude: ['password']
          }
        }
      ]
    });
    res.status(status.OK).json({
      msg: '',
      status: status.OK,
      data: allOrders
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

module.exports = { getAllUserOrders };
