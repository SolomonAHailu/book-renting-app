






const book = require("../db/models/book");
const AppError = require("../utils/appError");
const { calculateUserRevenue } = require("../utils/calculateUserRevenue");
const catchAsync = require("../utils/catchAsync");
const { bookSchema } = require("../utils/validationSchemas");

const createBook = catchAsync(async (req, res, next) => {
  // checking if user is authenticated or not
  if (!req.user) {
    return next(new AppError("Unauthorized", 401));
  }

  const abilities = defineAbilitiesFor(req.user);

  // Checking if the user has permission to create a book
  if (!abilities.can("create", "book")) {
    return next(new AppError("Forbidden", 403));
  }

  const body = req.body;

  // Validate request body using Zod schema (Zod)
  const validation = bookSchema.safeParse(body);
  if (!validation.success) {
    throw new AppError(
      `Validation error: ${validation.error.errors
        .map((e) => e.message)
        .join(", ")}`,
      400
    );
  }

  // req.user = freshUser => from the authentication
  const userId = req.user.id;

  const newBook = await book.create({
    title: body.title,
    bookImage: body.bookImage,
    price: body.price,
    description: body.description,
    category: body.category,
    createdBy: userId,
  });

  return res.status(201).json({
    status: "success",
    data: newBook,
  });
});

const updateBook = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Unauthorized", 401));
  }

  const abilities = defineAbilitiesFor(req.user);

  if (!abilities.can("update", "book")) {
    return next(new AppError("Forbidden", 403));
  }

  const bookId = req.params.id;
  const body = req.body;

  const validation = bookSchema.safeParse(body);
  if (!validation.success) {
    throw new AppError(
      `Validation error: ${validation.error.errors
        .map((e) => e.message)
        .join(", ")}`,
      400
    );
  }

  const bookToUpdate = await book.findOne({
    where: { id: bookId, createdBy: req.user.id },
  });

  if (!bookToUpdate) {
    return next(
      new AppError(
        "Book not found or you do not have permission to update this book",
        404
      )
    );
  }

  const updatedBook = await book.update({
    where: { id: bookId },
    data: {
      ...body,
    },
  });

  return res.status(200).json({
    status: "success",
    data: updatedBook,
  });
});

const removeBook = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Unauthorized", 401));
  }

  const abilities = defineAbilitiesFor(req.user);

  if (!abilities.can("delete", "book")) {
    return next(new AppError("Forbidden", 403));
  }

  const bookId = req.params.id;

  const bookToDelete = await book.findOne({
    where: { id: bookId, createdBy: req.user.id },
  });

  if (!bookToDelete) {
    return next(
      new AppError(
        "Book not found or you do not have permission to delete this book",
        404
      )
    );
  }

  await book.delete({ where: { id: bookId } });

  return res.status(204).json({
    status: "success",
    data: null,
  });
});

const listUserBooks = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Unauthorized", 401));
  }

  const userId = req.user.id;

  const books = await book.findMany({
    where: { createdBy: userId },
  });

  return res.status(200).json({
    status: "success",
    data: books,
  });
});

const getUserRevenue = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("Unauthorized", 401));
  }

  const userId = req.user.id;

  // Replace this with actual revenue calculation logic
  const revenue = await calculateUserRevenue(userId);

  return res.status(200).json({
    status: "success",
    data: {
      revenue,
    },
  });
});

module.exports = {
  createBook,
  updateBook,
  removeBook,
  listUserBooks,
  getUserRevenue,
};
