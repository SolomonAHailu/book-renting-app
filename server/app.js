








require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const authRouter = require("./route/authRoute");
constadminRouter = require("./route/adminRoute");
const bookRouter = require("./route/bookRoute");
// const transactionRouter = require("./route/");
const lesseeRoutes = require("./routes/lesseeRoutes");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const app = express();

app.use(express.json());

// all routes will be here
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/owners", adminRouter);
app.use("/lessee", lesseeRoutes);

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

//global error handler
app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
