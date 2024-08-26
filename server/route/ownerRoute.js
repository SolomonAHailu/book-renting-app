
const express = require("express");
const router = express.Router();
const {
  createBook,
  updateBook,
  removeBook,
  listUserBooks,
  getUserRevenue,
} = require("../controllers/bookController");
const { authentication } = require("../controller/authController");

router.post("/books", authentication, createBook);
router.put("/books/:id", authentication, updateBook);
router.delete("/books/:id", authentication, removeBook);
router.get("/books", authentication, listUserBooks);
router.get("/revenue", authentication, getUserRevenue);

module.exports = router;
