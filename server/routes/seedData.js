const express = require("express");
const data = require("../data");
const Product = require("../models/Product.js");

const seedData = express.Router();
seedData.get("/", async (req, res) => {
  await Product.remove({});
  const seedProducts = await Product.insertMany(data.products);
  res.send({ seedProducts });
});

module.exports = seedData;
