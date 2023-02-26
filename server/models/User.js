const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const productSchema = require("./Product");
const cartSchema = require("./Cart");
const orderSchema = require("./Order");
const storeSchema = require("./Store");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username"],
      minLength: [2, "Your username must be at least 2 characters"],
      unique: [true, "That username has already been taken, please try again"],
    },

    name: {
      type: String,
      required: [true, "Please enter your name"],
      minLength: [2, "Your name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      minLength: [8, "Minimum password must be 8 characters"],
    },

    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
      required: true,
    },

    register_date: {
      type: Date,
      default: Date.now,
    },

    // set savedBooks to be an array of data that adheres to the productSchema
    //savedProducts: [productSchema],
    shoppingCart: [cartSchema],
    stores: [
      {
        type: Schema.Types.ObjectId,
        ref: "Store",
      },
    ],
    orders: [orderSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },

  {
    timestamps: true,
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field with the number of saved products we have
/*userSchema.virtual("productCount").get(function () {
  return this.savedProducts.length;
});

// when we query a user, we'll also get another field with the contents of our shopping cart
userSchema.virtual("shoppingCart").get(function () {
  return this.shoppingCart.length;
});*/

const User = model("User", userSchema);

module.exports = User;
