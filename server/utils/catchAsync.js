
const catchAsync = (fn) => {
  const erroHandler = (req, res, next) => {
    fn(req, res, next).catch(next);
  };
  return erroHandler;
};

module.exports = catchAsync;
