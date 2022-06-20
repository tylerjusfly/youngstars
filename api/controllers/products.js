const { db } = require("../models/product");
const Products = require("../models/product");
const { categoriesFilter, priceFilter } = require("../services/products");

exports.getAll = async (req, res, next) => {
  let { categories, price } = req.body;

  let listOfProducts = await Products.find();
  //let listOfProducts = await db.collection("products").find().toArray();
  try {
    if (categories) {
      categories = categories.trim().toLowerCase();

      let filterList = await categoriesFilter(listOfProducts, categories);

      return res.json(filterList);
    }

    if (price) {
      price = parseFloat(price);

      let filterList = await priceFilter(listOfProducts, price);

      return res.json(filterList);
    }

    return res.json(listOfProducts);
  } catch (error) {
    next(error);
  }
};
