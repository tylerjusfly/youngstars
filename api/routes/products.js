const express = require("express");
const { addToCart, removeFromCart } = require("../controllers/cart");
const router = express.Router();
const { getAll } = require("../controllers/products");

router.get("/", getAll);

router.post("/", addToCart);

router.post("/remove", removeFromCart);

module.exports = router;
