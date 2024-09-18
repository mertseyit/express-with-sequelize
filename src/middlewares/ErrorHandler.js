const ErrorHandler = (err, req, res, next) => {
  res.status(400).json({
    error: err
  });
};

module.exports = ErrorHandler;
