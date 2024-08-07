











const express = require("express");
const {
  approveBook,
  listBooks,
  listOwners,
  approveOwner,
  disableOwner,
  filterBooks,
} = require("../controller/adminController");
const { authentication } = require("../controller/authController");

const router = express.Router();

router.get("/owners", authentication, listOwners);
router.patch("/owners/:ownerId/approve", authentication, approveOwner);
router.patch("/owners/:ownerId/disable", authentication, disableOwner);

router.get("/books", authentication, listBooks);
router.get("/books/filter", authentication, filterBooks);
router.patch("/books/:bookId/approve", authentication, approveBook);

module.exports = router;
