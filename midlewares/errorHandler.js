const logErrors = (err, req, res, next) => {
  console.log('[logErrors]: ', err);
  next(err);
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
    return false;
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  console.log('[errorHandler]');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
  return false;
};

module.exports = { logErrors, errorHandler, boomErrorHandler };
