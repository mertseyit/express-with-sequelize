const createCustomError = require('../../../utils/createCustomError');
const customError = require('../../../utils/customError');
const Product = require('../../../models/Product');
const status = require('http-status');

const addProduct = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { name, desc, category, price } = req.body;
    if (!name || !desc || !category || !price) {
      return next(
        customError(createCustomError('Missing Parameters', status.BAD_REQUEST))
      );
    } else {
      const created = await Product.create({
        name: name,
        desc: desc,
        category: category,
        price: price,
        seller_id: id
      });
      res.status(status.CREATED).json({
        msg: 'Created',
        status: status.CREATED,
        data: created
      });
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    if (Number(product_id)) {
      const { name, desc, category, price } = req.body;
      const updated = await Product.update(
        { name, desc, category, price },
        { where: { product_id: product_id } }
      );
      res.status(status.OK).json({
        msg: 'Updated',
        status: status.OK,
        data: updated
      });
    } else {
      return next(
        customError(
          createCustomError(
            `Invalid id value : '${product_id}'`,
            status.BAD_REQUEST
          )
        )
      );
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    if (Number(product_id)) {
      const deleted = await Product.destroy({
        where: { product_id: product_id }
      });
      res.status(status.OK).json({
        msg: 'Deleted',
        status: status.OK,
        data: deleted
      });
    } else {
      return next(
        customError(
          createCustomError(
            `Invalid id value : '${product_id}'`,
            status.BAD_REQUEST
          )
        )
      );
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

module.exports = { addProduct, updateProduct, deleteProduct };
