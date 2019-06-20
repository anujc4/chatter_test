// Helper function to create an error from a specified error object
const error = function(message, opts = {}) {
  er = new Error(message);
  er.name = opts.name;
  er.status = opts.status;
  er.userMessage = opts.userMessage;
  er.errorMessage = opts.errorMessage;
  return er;
};

module.exports = error;
