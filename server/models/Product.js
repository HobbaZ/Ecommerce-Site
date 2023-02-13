const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    required: [true, "Please enter a title for the product"],
    minLength: [20, "Title must be at least 10 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter a description for the product"],
    minLength: [20, "Description must be at least 20 characters"],
  },

  brand: {
    type: String,
    required: [true, "Please enter a brand name for the product"],
    minLength: [20, "Brand must be at least 2 characters"],
  },

  image: {
    type: String,
    required: [true, "Please select a image for the product"],
  },

  category: {
    type: String,
    required: true,
    required: [true, "Please enter the products category"],
    minLength: [20, "Category must be at least 2 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a price for the product"],
  },

  limit: {
    type: Number,
    required: [false, "Please enter a purchase limit for the product"],
  },

  rating: {
    type: Number,
  },

  numberOfReviews: {
    type: Number,
  },

  date_added: {
    type: Date,
    default: Date.now,
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
