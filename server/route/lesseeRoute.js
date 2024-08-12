
const express = require("express");
const router = express.Router();
const { authentication } = require("../controller/authController");
const { rentBook, returnBook } = require("../controller/rentalController");

router.post("/rent-book", authentication, rentBook);
router.post("/return-book", authentication, returnBook);

module.exports = router;
