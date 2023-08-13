const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Something went wrong, Please try again later";

  let errors = {};

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "This item is not found.";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;

    message = "Please fill the correct fields...";
    // Iterate over each validation error and populate the errors object
    Object.keys(err.errors).forEach((field) => {
      errors[field] = err.errors[field].message;
    });
  }

  res.status(statusCode).json({
    error: true,
    message,
    errors,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
