





const user = require("../db/models/user");
const book = require("../db/models/book");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { Op, fn, col } = require("sequelize");

// List all owners
const listOwners = catchAsync(async (req, res, next) => {
  const abilities = defineAbilitiesFor(req.user);

  if (!abilities.can("manage", "all")) {
    // Admin permission check
    return next(new AppError("Access denied", 403));
  }

  const owners = await user.findAll({ where: { userType: 1 } });
  res.status(200).json({
    status: "user listing success",
    data: owners,
  });
});

// Approve an owner
const approveOwner = catchAsync(async (req, res, next) => {
  const abilities = defineAbilitiesFor(req.user);

  if (!abilities.can("manage", "all")) {
    // Admin permission check
    return next(new AppError("Access denied", 403));
  }

  const { ownerId } = req.params;
  const owner = await user.findByPk(ownerId);

  if (!owner || owner.userType !== 1) {
    return next(new AppError("Owner not found", 404));
  }

  owner.status = "approved"; // Assuming 'status' is a field in the User model
  await owner.save();

  res.status(200).json({
    status: "user approval success",
    data: owner,
  });
});

//////////////////////////////////////////////
//////////////////////////////////////////////

// List all books
const listBooks = catchAsync(async (req, res, next) => {
  const abilities = defineAbilitiesFor(req.user);

  if (!abilities.can("manage", "all")) {
    // Admin permission check
    return next(new AppError("Access denied", 403));
  }

  const books = await book.findAll();
  res.status(200).json({
    status: "book listing success",
    data: books,
  });
});

// Approve a book
const approveBook = catchAsync(async (req, res, next) => {
  const abilities = defineAbilitiesFor(req.user);

  if (!abilities.can("manage", "all")) {
    // Admin permission check
    return next(new AppError("Access denied", 403));
  }

  const { bookId } = req.params;
  const book = await book.findByPk(bookId);

  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  book.status = "approved"; // Assuming 'status' is a field in the Book model
  await book.save();

  res.status(200).json({
    status: "book approval success",
    data: book,
  });
});

// Disable an owner
const disableOwner = catchAsync(async (req, res, next) => {
  const abilities = defineAbilitiesFor(req.user);

  if (!abilities.can("manage", "all")) {
    // Admin permission check
    return next(new AppError("Access denied", 403));
  }

  const { ownerId } = req.params;
  const owner = await user.findByPk(ownerId);

  if (!owner || owner.userType !== 1) {
    return next(new AppError("Owner not found", 404));
  }

  owner.status = "disabled"; // Assuming 'status' is a field in the User model
  await owner.save();

  res.status(200).json({
    status: "user disabling success",
    data: owner,
  });
});

// Filter books
const filterBooks = catchAsync(async (req, res, next) => {
  const { category, author, ownerId } = req.query;
  const abilities = defineAbilitiesFor(req.user);

  const filters = {};
  if (category) filters.category = category;
  if (author) filters.author = author;
  if (ownerId) {
    if (!abilities.can("rent", "book")) {
      // Check if the user can access books of this owner
      return next(new AppError("Access denied", 403));
    }
    filters.createdBy = ownerId; // Assuming 'createdBy' links to ownerId
  }

  const books = await book.findAll({ where: filters });

  res.status(200).json({
    status: "success",
    data: books,
  });
});

// Get statistics of available books by category
const getAvailableBooksStats = catchAsync(async (req, res, next) => {
  const stats = await book.findAll({
    attributes: ["category", [fn("COUNT", col("id")), "count"]],
    where: {
      status: "available",
    },
    group: ["category"],
  });

  res.status(200).json({
    status: "success",
    data: stats,
  });
});

module.exports = {
  listOwners,
  approveOwner,
  listBooks,
  approveBook,
  disableOwner,
  filterBooks,
};
