const Address = require('../../../models/Address');
const createCustomError = require('../../../utils/createCustomError');
const customError = require('../../../utils/customError');
const status = require('http-status');

const getAllUserAddress = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const allUserAddress = await Address.findAll({
      where: { user_id: user_id }
    });
    res.status(status.OK).json({
      msg: '',
      status: status.OK,
      data: allUserAddress
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

const createUserAddress = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { title, desc, country, city } = req.body;
    if (!title || !desc || !country || !city) {
      return next(
        customError(createCustomError('Missing Parameters', status.BAD_REQUEST))
      );
    } else {
      const created = await Address.create({
        title,
        desc,
        country,
        city,
        user_id
      });

      res.status(status.CREATED).json({
        msg: 'Created',
        status: status.OK,
        data: created
      });
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

const updateUserAddress = async (req, res, next) => {
  try {
    const { address_id } = req.params;
    if (Number(address_id)) {
      const { title, desc, country, city } = req.body;
      const updated = await Address.update(
        { title, desc, country, city },
        { where: { address_id: address_id } }
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
            `Invalid id value : '${address_id}'`,
            status.BAD_REQUEST
          )
        )
      );
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

const deleteUserAddress = async (req, res, next) => {
  try {
    const { address_id } = req.params;
    if (Number(address_id)) {
      const user_id = req.user.id;
      const deleted = await Address.destroy({
        where: { address_id: address_id }
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
            `Invalid id value : '${address_id}'`,
            status.BAD_REQUEST
          )
        )
      );
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

module.exports = {
  getAllUserAddress,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress
};
