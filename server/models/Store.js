const { Schema, model } = require("mongoose");

const storeSchema = new Schema(
  {
    storeName: {
      type: String,
      required: true,
      required: [true, "Please enter a title for the store"],
      minLength: [5, "Title must be at least 5 characters"],
    },
    storeDescription: {
      type: String,
      required: [true, "Please enter a description for the store"],
      minLength: [5, "Description must be at least 5 characters"],
    },

    storeOwner: {
      type: String,
      required: true,
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

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Store = model("Store", storeSchema);

module.exports = Store;
