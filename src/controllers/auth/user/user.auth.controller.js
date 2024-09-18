const createCustomError = require('../../../utils/createCustomError');
const customError = require('../../../utils/customError');
const status = require('http-status');
const bcrypt = require('bcrypt');
const User = require('../../../models/User');
const generateToken = require('../../../utils/generateToken');

const userRegisterController = async (req, res, next) => {
  try {
    const { name, lastname, email, password, age } = req.body;
    if (!name || !lastname || !email || !password || !age) {
      return next(
        customError(createCustomError('Missing Parameters', status.BAD_REQUEST))
      );
    } else {
      await User.create({
        name,
        lastname,
        email,
        password,
        age
      });
      delete password;
      delete req.body.password;
      res.status(status.CREATED).json({
        message: 'Created',
        statusCode: status.CREATED,
        data: {
          name,
          lastname,
          email,
          age
        }
      });
    }
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        customError(createCustomError('Missing Parameters', status.BAD_REQUEST))
      );
    } else {
      const isExist = await User.findOne({ where: { email: email } });
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
              token: generateToken(isExist.dataValues.user_id)
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

const userWhoAmIController = async (req, res, next) => {
  try {
    const id = req.user.id;
    const result = await User.findOne({ where: { user_id: id } });
    delete result.dataValues.password;
    res.status(status.OK).json({
      message: 'Success',
      statusCode: status.OK,
      data: {
        name: result.dataValues.name,
        lastname: result.dataValues.lastname,
        email: result.dataValues.email,
        age: result.dataValues.age,
        createdAt: result.dataValues.createdAt,
        updatedAt: result.dataValues.updatedAt
      }
    });
  } catch (error) {
    return next(customError(error, status.INTERNAL_SERVER_ERROR));
  }
};

module.exports = {
  userLoginController,
  userRegisterController,
  userWhoAmIController
};
