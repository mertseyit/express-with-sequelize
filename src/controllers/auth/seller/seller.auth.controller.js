const bcrypt = require('bcrypt');
const Seller = require('../../../models/Seller');
const status = require('http-status');
const createCustomError = require('../../../utils/createCustomError');
const customError = require('../../../utils/customError');
const generateToken = require('../../../utils/generateToken');
const sellerRegisterController = async (req, res, next) => {
  try {
    const { name, lastname, email, password } = req.body;
    if (!name || !lastname || !email || !password) {
      return next(
        customError(createCustomError('Missing Parameters', status.BAD_REQUEST))
      );
    } else {
      await Seller.create({
        name,
        lastname,
        email,
        password
      });
      delete password;
      delete req.body.password;
      res.status(status.CREATED).json({
        message: 'Created',
        statusCode: status.CREATED,
        data: {
          name,
          lastname,
          email
        }
      });
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

const sellerLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        customError(createCustomError('Missing Parameters', status.BAD_REQUEST))
      );
    } else {
      const isExist = await Seller.findOne({ where: { email: email } });
      if (isExist) {
        const isCorrectPassword = await bcrypt.compare(
          password,
          isExist.dataValues.password
        );
        delete isExist.dataValues.password;
        if (isCorrectPassword) {
          res.status(status.OK).json({
            message: 'Logged',
            statusCode: status.OK,
            data: {
              token: generateToken(isExist.dataValues.seller_id)
            }
          });
        } else {
          return next(
            customError(
              createCustomError('Incorrect Password', status.UNAUTHORIZED)
            )
          );
        }
      } else {
        return next(
          customError(createCustomError('User Not Founded', status.NOT_FOUND))
        );
      }
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

const sellerWhoAmIController = async (req, res, next) => {
  try {
    const id = req.user.id;
    const result = await Seller.findOne({ where: { seller_id: id } });
    delete result.dataValues.password;
    res.status(status.OK).json({
      message: 'Success',
      statusCode: status.OK,
      data: {
        name: result.dataValues.name,
        lastname: result.dataValues.lastname,
        email: result.dataValues.email,
        createdAt: result.dataValues.createdAt,
        updatedAt: result.dataValues.updatedAt
      }
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

module.exports = {
  sellerWhoAmIController,
  sellerLoginController,
  sellerRegisterController
};
