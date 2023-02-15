const { Schema } = require("mongoose");

const storeSchema = new Schema({
  title: {
    type: String,
    required: true,
    required: [true, "Please enter a title for the store"],
    minLength: [20, "Title must be at least 10 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter a description for the store"],
    minLength: [20, "Description must be at least 20 characters"],
  },

  image: {
    type: String,
    required: [true, "Please select a image for the store"],
  },

  rating: {
    type: Number,
  },

  date_added: {
    type: Date,
    default: Date.now,
  },
});

module.exports = storeSchema;
