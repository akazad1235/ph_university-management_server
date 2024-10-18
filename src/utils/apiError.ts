const ApiError = (statusCode, message) => {
  const error = new Error(message); // Create a new Error object with the provided message
  error.statusCode = statusCode; // Attach the status code
  error.isOperational = true; // Flag as an operational error (for distinguishing in error handling middleware)

  // Optionally capture the stack trace, excluding the current function call from the trace
  Error.captureStackTrace(error, ApiError);

  return error;
};

module.exports = ApiError;
