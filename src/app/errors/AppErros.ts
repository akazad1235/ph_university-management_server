class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number, stack = '') {
    super(message); // Call the Error constructor
    this.statusCode = statusCode; // Set the status code
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
  }
}
export default AppError;
