const Checkout = require("../models/checkout");

exports.createCheckout = (req, res, next) => {};

// const fetch = require("node-fetch");
// require("dotenv").config();

// exports.createCoinBaseCharge = (req, res) => {
//   const { totalAmount, productname } = req.body;

//   const url = "https://api.commerce.coinbase.com/charges";

//   const options = {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "X-CC-Api-Key": process.env.COINBASE_API_KEY,
//       "X-CC-Api-Version": " 2018-03-22",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       local_price: { amount: totalAmount, currency: "USD" },
//       name: productname,
//       pricing_type: "fixed_price",
//       redirect_url: process.env.Client_URL,
//       cancel_url: `${process.env.Client_URL}/backend`,
//       description: "buy the world away",
//     }),
//   };

//   fetch(url, options)
//     .then((result) => result.json())
//     .then((json) =>
//       res.json({
//         url: json.data.hosted_url,
//       }),
//     )
//     .catch((err) => {
//       console.error("error:" + err);
//       return res.json(err);
//     });
// };
