






const transaction = require("../db/models/transaction");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

/**
 * Calculate total revenue for a given user.
 * @param {number} userId - The ID of the user for whom revenue is calculated.
 * @returns {Promise<number>} - The total revenue amount.
 */
const calculateUserRevenue = catchAsync(async (userId) => {
  // Validate user ID
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }

  // Fetch transactions for the user
  const transactions = await transaction.findAll({
    where: { userId },
  });

  // Calculate total revenue
  const totalRevenue = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return totalRevenue;
});

module.exports = { calculateUserRevenue };
