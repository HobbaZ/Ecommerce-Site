const mongoose = require("mongoose");
const data = require("./data.js");
const Product = require("./models/Product.js");
//const User = require("./models/User.js");

mongoose
  .connect("mongodb://127.0.0.1/ecommerceDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Seed data Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Oh no, can't connect", err);
  });

const seedData = async () => {
  await Product.deleteMany({});
  const seedProducts = await Product.insertMany(data.products);

  /* await User.deleteMany({});
  const seedUsers = await User.insertMany(data.users);*/

  if (!seedProducts) {
    console.log("Error in seeding products");
  } else {
    console.log("Successfully seeded products");
  }

  /*if (!seedUsers) {
    console.log("Error is seeding users");
  } else {
    console.log("Successfully seeded users");
  }*/
};

seedData().then(() => {
  mongoose.connection.close();
});
