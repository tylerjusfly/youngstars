const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Checkout = new Schema({
  userId: { type: Number, required: true },
  carts: { type: Schema.Types.ObjectId, required: true, ref: "Products", unique: true },
  Totalprice: { type: Number, default: 0 },
});

const CheckoutSchema = mongoose.model("Checkout", Checkout);

module.exports = CheckoutSchema;
