const errorHandlerMiddleware = async (err, req, res, next) => {
  return res
    .status(500)
    .json({ err: err.message, msg: 'Something went wrong, please try again' });
};

module.exports = errorHandlerMiddleware;
