const createCustomError = require('../../../utils/createCustomError');
const customError = require('../../../utils/customError');
const status = require('http-status');
const OrdersProduct = require('../../../models/OrdersProduct');
const Order = require('../../../models/Order');

const getAllUserOrder = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const allUserOrders = await Order.findAll({
      where: { user_id: user_id },
      attributes: { exclude: ['user_id'] }
    });
    res.status(status.OK).json({
      msg: '',
      status: status.OK,
      data: allUserOrders
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

const createAnOrder = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    /*
    products format: 
    [
      {
        product_id:1,
        quantity:4
      },
      {
        product_id:3,
        quantity:2
      }
      ...
    ]*/
    const { products, address_id } = req.body;
    if (!products || !address_id) {
      return next(
        customError(createCustomError('Missing Parameters', status.BAD_REQUEST))
      );
    } else {
      const createdOrder = await Order.create({
        user_id: user_id,
        address_id: address_id
      });

      products.forEach(async (productInfo) => {
        for (let count = 1; count <= productInfo.quantity; count++) {
          await OrdersProduct.create({
            order_id: createdOrder.dataValues.order_id,
            product_id: productInfo.product_id
          });
        }
      });
      res.status(status.CREATED).json({
        msg: 'Created',
        status: status.CREATED,
        data: createdOrder
      });
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

const cancelAnOrder = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    if (Number(order_id)) {
      const canceled = await Order.destroy({ where: { order_id: order_id } });
      res.status(status.OK).json({
        msg: 'Canceled',
        status: status.OK,
        data: canceled
      });
    } else {
      return next(
        customError(
          createCustomError(
            `Invalid id value : '${order_id}'`,
            status.BAD_REQUEST
          )
        )
      );
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

module.exports = { getAllUserOrder, createAnOrder, cancelAnOrder };
