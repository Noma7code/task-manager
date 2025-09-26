function errorHandler(res, error, status = 500) {
  return res
    .status(status)
    .json({ success: false, message: error.message || error });
}

module.exports = errorHandler;
