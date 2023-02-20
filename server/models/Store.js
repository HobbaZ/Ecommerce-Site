const { Schema } = require("mongoose");
const productSchema = require("./Product");

const storeSchema = new Schema(
  {
    storeName: {
      type: String,
      required: true,
      required: [true, "Please enter a title for the store"],
      minLength: [20, "Title must be at least 10 characters"],
    },
    storeDescription: {
      type: String,
      required: [true, "Please enter a description for the store"],
      minLength: [20, "Description must be at least 20 characters"],
    },

    storeOwner: {
      type: String,
      required: [true, "Please enter your username"],
    },

    storeImage: {
      type: String,
      required: [true, "Please select a image for the store"],
    },

    storeRating: {
      type: Number,
    },

    register_date: {
      type: Date,
      default: Date.now,
    },

    //storeProducts: [productSchema],
  },

  {
    timestamps: true,
  }
);

module.exports = storeSchema;
