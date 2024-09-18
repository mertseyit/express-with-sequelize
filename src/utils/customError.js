const status = require('http-status');
require('dotenv').config({ path: './.env' });
const customError = (error, statusCode) => {
  const e = new Error(error.message);
  return {
    message: e.message || 'Internal Server Error',
    statusCode: error.statusCode || status.INTERNAL_SERVER_ERROR,
    stack: process.env.NODE_ENV === 'development' ? e.stack : {}
  };
};

module.exports = customError;
