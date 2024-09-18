const Product = require('../../models/Product');
const Seller = require('../../models/Seller');
const customError = require('../../utils/customError');
const status = require('http-status');

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      include: {
        model: Seller,
        as: 'seller',
        attributes: {
          exclude: ['password']
        }
      }
    });
    res.status(status.OK).json({
      msg: '',
      status: status.OK,
      data: allProducts
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

module.exports = { getAllProducts };
