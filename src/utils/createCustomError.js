const createCustomError = (message, statusCode) => {
  const error = new Error();
  error.message = message;
  return {
    message: error.message,
    statusCode: statusCode,
    stack: error.stack
  };
};

module.exports = createCustomError;
