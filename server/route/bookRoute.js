const { authentication } = require("../controller/authController");
const { createBook } = require("../controller/bookController");
const { rentBook, returnBook } = require("../controller/rentalController");

const router = require("express").Router();

router.route("/").post(authentication, createBook);
router.route("/rent").post(authentication, rentBook);
router.route("/return").post(authentication, returnBook);

module.exports = router;
