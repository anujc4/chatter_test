// 400 -> Bad request
// 404 -> Not Found
// 500 -> Internal Server Error

var sendInternalServerError = function(
  res,
  er,
  userMessage = "Unable to process your request"
) {
  res.status(500).json({
    error: true,
    userMessage,
    errorMessage: er
  });
};

var sendNotFoundError = function(
  res,
  er,
  userMessage = "Unable to find what you were looking for"
) {
  res.status(404).json({
    error: true,
    userMessage,
    errorMessage: er
  });
};

var badRequestError = function(
  res,
  er,
  userMessage = "Invalid request. Please try again"
) {
  res.status(404).json({
    error: true,
    userMessage,
    errorMessage: er
  });
};

module.exports = {
  sendInternalServerError,
  sendNotFoundError,
  badRequestError
};
