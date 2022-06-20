const Product = require("../models/product");

const categoriesFilter = async (listOfArray, searchQuery) => {
  return listOfArray.filter(array => array.categories.trim().toLowerCase().includes(searchQuery));
};

const priceFilter = async (listOfArray, searchQuery) => {
  return listOfArray.filter(array => parseFloat(array.price) >= searchQuery);
};

const productQuantityCheck = async (productQuantity, cartQuantity) => {
  //const { quantity } = await Product.findById(productId);

  return parseInt(productQuantity) > parseInt(cartQuantity) ? true : false;
};

module.exports = { categoriesFilter, priceFilter, productQuantityCheck };
