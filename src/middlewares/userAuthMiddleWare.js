const createCustomError = require('../utils/createCustomError');
const customError = require('../utils/customError');
const status = require('http-status');
const jwt = require('jsonwebtoken');

const sellerAuthMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(
        customError(createCustomError('Unauthorized', status.UNAUTHORIZED))
      );
    } else {
      jwt.verify(
        token.split(' ')[1],
        process.env.JWT_SECRET_KEY,
        (err, decoded) => {
          if (err) {
            return next(
              customError(
                createCustomError('Invalid Token', status.UNAUTHORIZED)
              )
            );
          }
          req.user = decoded;
          next();
        }
      );
    }
  } catch (error) {
    console.error('Some Error Occured Auth Middleware::.', error);
    return next(
      customError(
        createCustomError('Someting Went Wrong', status.INTERNAL_SERVER_ERROR)
      )
    );
  }
};

module.exports = sellerAuthMiddleWare;
