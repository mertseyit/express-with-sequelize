const Address = require('../../../models/Address');
const Order = require('../../../models/Order');
const OrderProduct = require('../../../models/OrdersProduct');
const Product = require('../../../models/Product');
const Seller = require('../../../models/Seller');
const User = require('../../../models/User');
const customError = require('../../../utils/customError');
const status = require('http-status');

const getAllOrdersProducts = async (req, res, next) => {
  try {
    const orderDetail = await OrderProduct.findAll({
      include: [
        {
          model: Order,
          as: 'order_detail',
          include: [
            {
              model: User,
              as: 'order_user',
              attributes: {
                exclude: ['password']
              }
            },
            {
              model: Address,
              as: 'order_address'
            }
          ]
        },
        {
          model: Product,
          as: 'product_detail',
          include: [
            {
              model: Seller,
              as: 'seller',
              attributes: { exclude: ['password'] }
            }
          ]
        }
      ]
    });
    res.status(status.OK).json({
      msg: '',
      status: status.OK,
      data: orderDetail
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

module.exports = { getAllOrdersProducts };
