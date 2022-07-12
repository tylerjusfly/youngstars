const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Carts = new Schema({
  userId: { type: Number, required: true },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, required: true, ref: "Products" },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: String, required: true },
    },
  ],
});

const CartSchema = mongoose.model("Cart", Carts);

module.exports = CartSchema;
