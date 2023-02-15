const { Schema } = require("mongoose");

const cartSchema = new Schema({
  userId: {
    type: String,
  },
  items: [
    {
      productId: {
        type: String,
      },
      name: String,
      quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can not be less then 1."],
        deafult: 1,
      },
      price: Number,
    },
  ],
  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = cartSchema;
