const book = require("../db/models/book");
const AppError = require("../utils/appError");
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

module.exports = { createBook };
