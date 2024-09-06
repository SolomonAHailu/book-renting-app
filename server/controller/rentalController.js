




// const { defineAbilitiesFor } = require("../utils/abilities");
// const rental = require("../db/models/rental");
// const book = require("../db/models/book");
// const transaction = require("../db/models/transaction");
// const AppError = require("../utils/appError");
// const catchAsync = require("../utils/catchAsync");

// const rentBook = catchAsync(async (req, res, next) => {
//   const { bookId, endDate } = req.body;
//   const userId = req.user.id;

//   // Define abilities for the user
//   const abilities = defineAbilitiesFor(req.user);

//   // Check if the book exists
//   const bookForRent = await book.findByPk(bookId);
//   if (!bookForRent) {
//     return next(new AppError("Book not found", 404));
//   }

//   // Check if the book is already rented
//   if (bookForRent.status === "rented") {
//     return next(new AppError("Book is already rented", 400));
//   }

//   // Check if the user has permission to rent this book
//   if (!abilities.can("rent", bookForRent)) {
//     return next(new AppError("You are not authorized to rent this book", 403));
//   }

//   // Create a rental record
//   const rentedBook = await rental.create({
//     bookId,
//     renterId: userId,
//     endDate,
//   });

//   // Update book status to 'rented'
//   bookForRent.status = "rented";
//   await bookForRent.save();

//   // Calculate the rental amount
//   const rentalAmount = book.price; // Assuming the price is per rental

//   // Create a transaction record
//   const transaction = await transaction.create({
//     ownerId: bookForRent.createdBy, // Assuming the book's creator is the owner
//     rentalId: rentedBook.id,
//     amount: rentalAmount,
//     transactionDate: new Date(),
//   });

//   return res.status(201).json({
//     status: "success",
//     data: { rentedBook, transaction },
//   });
// });

// const returnBook = catchAsync(async (req, res, next) => {
//   const { bookId } = req.body;
//   const userId = req.user.id;

//   // Define abilities for the user
//   const abilities = defineAbilitiesFor(req.user);

//   // Find the rental record
//   const rentedBook = await rental.findOne({
//     where: {
//       bookId,
//       renterId: userId,
//       status: "rented",
//     },
//   });

//   if (!rentedBook) {
//     return next(new AppError("No active rental found for this book", 404));
//   }

//   // Check if the user has permission to return this book
//   if (!abilities.can("return", rentedBook)) {
//     return next(
//       new AppError("You are not authorized to return this book", 403)
//     );
//   }

//   // Update rental status to returned
//   rentedBook.status = "available";
//   await rentedBook.save();

//   return res.status(200).json({
//     status: "success",
//     data: rental,
//   });
// });

// module.exports = {
//   rentBook,
//   returnBook,
// };

////////////////////
////////////////////
////////////////////
////////////////////
////////////////////

const { defineAbilitiesFor } = require("../utils/abilities");
const Rental = require("../db/models/rental");
const Book = require("../db/models/book");
const Transaction = require("../db/models/transaction");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const rentBook = catchAsync(async (req, res, next) => {
  const { bookId, endDate } = req.body;
  const userId = req.user.id;

  // Define abilities for the user
  const abilities = defineAbilitiesFor(req.user);

  // Check if the book exists
  const bookForRent = await Book.findByPk(bookId);
  if (!bookForRent) {
    return next(new AppError("Book not found", 404));
  }

  // Check if the book is already rented
  if (bookForRent.status === "rented") {
    return next(new AppError("Book is already rented", 400));
  }

  // Check if the user has permission to rent this book
  if (!abilities.can("rent", bookForRent)) {
    return next(new AppError("You are not authorized to rent this book", 403));
  }

  // Create a rental record
  const rentedBook = await Rental.create({
    bookId,
    renterId: userId,
    endDate,
  });

  // Update book status to 'rented'
  bookForRent.status = "rented";
  await bookForRent.save();

  // Calculate the rental amount
  const rentalAmount = bookForRent.price; // Assuming the price is per rental

  // Create a transaction record
  const transactionRecord = await Transaction.create({
    ownerId: bookForRent.createdBy, // Assuming the book's creator is the owner
    rentalId: rentedBook.id,
    amount: rentalAmount,
    transactionDate: new Date(),
  });

  return res.status(201).json({
    status: "success",
    data: { rentedBook, transaction: transactionRecord },
  });
});

const returnBook = catchAsync(async (req, res, next) => {
  const { bookId } = req.body;
  const userId = req.user.id;

  // Define abilities for the user
  const abilities = defineAbilitiesFor(req.user);

  // Find the rental record
  const rentedBook = await Rental.findOne({
    where: {
      bookId,
      renterId: userId,
      status: "rented",
    },
  });

  if (!rentedBook) {
    return next(new AppError("No active rental found for this book", 404));
  }

  // Check if the user has permission to return this book
  if (!abilities.can("return", rentedBook)) {
    return next(
      new AppError("You are not authorized to return this book", 403)
    );
  }

  // Update rental status to returned
  rentedBook.status = "returned";
  await rentedBook.save();

  // Update the book status to available
  const bookForReturn = await Book.findByPk(bookId);
  bookForReturn.status = "available";
  await bookForReturn.save();

  return res.status(200).json({
    status: "success",
    data: rentedBook,
  });
});

module.exports = {
  rentBook,
  returnBook,
};
