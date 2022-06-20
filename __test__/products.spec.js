const { priceFilter, categoriesFilter } = require("../api/services/products");
const { arrayOfArray } = require("./helpers");

// Testing filter functions
test("should filter out Prices less than", async () => {
  const minimumPrice = 150;
  const response = await priceFilter(arrayOfArray, minimumPrice);
  let allPriceArray = response.map(element => element.price);

  expect(allPriceArray.every(e => e > minimumPrice)).toBe(true);
});

test("should Return only a certain categories", async () => {
  const categoryName = "toyota";
  const response = await categoriesFilter(arrayOfArray, categoryName);
  let allCategoryArray = response.map(element => element.categories);

  expect(allCategoryArray.every(e => e.toLowerCase() === categoryName)).toBe(true);
  console.log(allCategoryArray);
});
