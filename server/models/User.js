const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const productSchema = require("./Product");
const cartSchema = require("./Cart");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username"],
      minLength: [2, "Your username must be at least 2 characters"],
      unique: [true, "That username has already been taken, please try again"],
    },

    firstname: {
      type: String,
      required: [true, "Please enter your first name"],
      minLength: [2, "Your firstname must be at least 2 characters"],
    },

    lastname: {
      type: String,
      required: [true, "Please enter your last name"],
      minLength: [2, "Your lastname must be at least 2 characters"],
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

    register_date: {
      type: Date,
      default: Date.now,
    },

    // set savedBooks to be an array of data that adheres to the productSchema
    //savedProducts: [productSchema],
    //shoppingCart: [cartSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
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
