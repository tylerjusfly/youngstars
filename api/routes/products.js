const express = require("express");
const { addToCart } = require("../controllers/cart");
const router = express.Router();
const { getAll } = require("../controllers/products");

router.get("/", getAll);

router.post("/", addToCart);

module.exports = router;
