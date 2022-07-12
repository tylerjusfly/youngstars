const userId = 1;
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
            productQuantity,
            price,
          },
        ],
      });

      await newCart.save();
      res.json(newCart);
    }

    let mappedUsercart = userCart.products.map(p => p.productId);
    // if (mappedUsercart.indexOf(productId) != -1) {
    //   throw createError(400, "You already added this Product");

    // }
    const ind = mappedUsercart.includes(productId);

    // userCart.products.push({
    //   productId,
    //   productName,
    //   productQuantity,
    //   price,
    // });
    //await userCart.save();
    res.json({ mappedUsercart, ind, productId });
    //res.json(userCart.products.map(i => i.productId));
  } catch (error) {
    next(error);
  }
};

// const totalPrice = userCart.products.reduce(
//   (acc, cval) => ({ price: acc.price + (cval.quantity * cval.price )}) ,
//   { price: 0  },
// ).price;
//   console.log(totalPrice)
/*
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
*/
