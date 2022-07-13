const userId = 4;
const Cart = require("../models/cart");
const Product = require("../models/product");
const { productQuantityCheck } = require("../services/products");
const createError = require("http-errors");

exports.addToCart = async (req, res, next) => {
  const { productId, productQuantity } = req.body;

  try {
    const { productName, price, quantity } = await Product.findById(productId);

    const checkQuantity = await productQuantityCheck(quantity, productQuantity);

    if (!checkQuantity) {
      return next({ status: 417, message: "product quantity is low" });
    }

    const userCart = await Cart.findOne({ userId: userId });

    // if the user cart does not exist , create one and push product
    if (!userCart) {
      const newCart = new Cart({
        userId: userId,
        products: [
          {
            productId,
            productName,
            quantity: productQuantity,
            price,
          },
        ],
      });

      await newCart.save();
      res.json(newCart);
    }

    let existingProduct = userCart.products.filter(product => {
      return product.productId == productId;
    });

    if (existingProduct.length >= 1) {
      throw createError(409, "You already added this Product To Cart");
    }

    userCart.products.push({
      productId,
      productName,
      quantity: productQuantity,
      price,
    });
    await userCart.save();
    res.json(userCart);
  } catch (error) {
    next(error);
  }
};

exports.removeFromCart = async (req, res, next) => {
  const { productId } = req.body;

  try {
    // Get users cart by its Id , check if product id exist in cart
    const userCart = await Cart.findOne({ userId: userId });

    if (!userCart) {
      return next({ status: 404, message: "This user does not have a cart" });
    }

    let remainProduct = userCart.products.filter(product => {
      return product.productId != productId;
    });

    // if the filter condition is not met
    // if (remainProduct.length == 0) {
    //   return next({ status: 404, message: "This product does not exist in cart" });
    //   //throw createError(409, "You already added this Product To Cart");
    // }

    // if exist , add remaining products
    userCart.products = remainProduct;

    await userCart.save();

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
