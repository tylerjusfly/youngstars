const userId = 1;
const Cart = require("../models/cart");
const Product = require("../models/product");
const { productQuantityCheck } = require("../services/products");

exports.addToCart = async (req, res, next) => {
  const { productId, productQuantity } = req.body;

  try {
    const { productName, price, quantity } = await Product.findById(productId);

    const checkQuantity = await productQuantityCheck(quantity, productQuantity);

    if (!checkQuantity) {
      return next({ status: 417, message: "product quantity is low" });
    }

    const userCart = await Cart.findOneAndUpdate(
      { userId: userId },
      {
        userId: userId,
        $addToSet: {
          products: {
            productId: productId,
            productName: productName,
            quantity: productQuantity,
            price: price,
          },
        },
      },
      { new: true },
    );

    res.json(userCart);
  } catch (error) {
    next(error);
  }
};

// const totalPrice = userCart.products.reduce(
//   (acc, cval) => ({ price: acc.price + (cval.quantity * cval.price )}) ,
//   { price: 0  },
// ).price;
//   console.log(totalPrice)
