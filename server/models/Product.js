const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name for the product"],
      minLength: [5, "Product name must be at least 5 characters"],
    },

    /*slug: {
      type: String,
      unqique: [true, "An item already uses that slug"],
      required: [true, "Please enter a description for the product"],
      minLength: [2, "Description must be at least 2 characters"],
    },*/

    description: {
      type: String,
      required: [true, "Please enter a description for the product"],
      minLength: [2, "Description must be at least 2 characters"],
    },

    brand: {
      type: String,
      required: [true, "Please enter a brand name for the product"],
      minLength: [2, "Brand must be at least 2 characters"],
    },

    image: {
      type: String,
      required: [true, "Please select a image for the product"],
    },

    category: {
      type: String,
      required: true,
      required: [true, "Please enter the products category"],
      minLength: [2, "Category must be at least 2 characters"],
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

    numberinStock: {
      type: Number,
      required: [true, "Please the amount of the product you have to sell"],
    },

    numberOfReviews: {
      type: Number,
    },

    date_added: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
