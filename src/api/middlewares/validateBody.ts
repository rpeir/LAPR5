const validateBody = (err, req, res, next) => {
  if (err.isJoi) {
    // This error is from celebrate
    res.status(400).json({
      error: "Bad Request",
      message: err.details.map((e) => e.message).join(", "),
    });
  } else {
    // Pass other errors to the next middleware
    next(err);
  }
};

export default validateBody;
