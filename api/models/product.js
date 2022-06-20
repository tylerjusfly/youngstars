const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Products = new Schema({
  productName: { type: String, required: true, maxlength: 50 },
  description: { type: String, required: true },
  categories: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: String, required: true },
});

const ProductSchema = mongoose.model("Products", Products);

module.exports = ProductSchema;
