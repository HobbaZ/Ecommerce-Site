const db = require("./config/connection");
const bcrypt = require("bcrypt");
const { User, Store, Product, Cart } = require("./models");

db.once("open", async () => {
  await User.deleteMany();
  const user1 = await User.create({
    username: "Barry",
    name: "Barry",
    email: "barry@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    isVerified: true,
  });

  const user2 = await User.create({
    username: "Joe",
    name: "Joe",
    email: "joeblogs@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    isVerified: false,
  });

  console.log("users seeded");

  await Store.deleteMany();
  const store1 = await Store.create({
    storeName: "Store1",
    storeDescription: "Store that sells stuff",
    storeOwner: user1._id,
    storeImage: "/images/image2.jpg",
    storeRating: 3.5,
  });

  const store2 = await Store.create({
    storeName: "Store2",
    storeDescription: "Store that sells more stuff",
    storeOwner: user1._id,
    storeImage: "/images/image1.jpg",
    storeRating: 3.5,
  });

  console.log("stores seeded");

  await Product.deleteMany();
  const products = await Product.insertMany([
    {
      name: "Nike shirt",
      slug: "nike_shirt",
      category: "Shirts",
      image: "/images/image1.jpg",
      price: 120,
      limit: "2",
      numberinStock: 10,
      brand: "Nike",
      productOfStore: store1._id,
      rating: 2.0,
      numberofReviews: 10,
      description: "high quality",
    },

    {
      name: "Nike shirt",
      slug: "nike_shirt",
      category: "Shirts",
      image: "/images/image1.jpg",
      price: 100,
      limit: "2",
      numberinStock: 10,
      brand: "Nike",
      productOfStore: store2._id,
      rating: 5.0,
      numberofReviews: 5,
      description: "high quality",
    },

    {
      name: "Adidas shirt",
      slug: "adidas_shirt",
      category: "Shirts",
      image: "/images/image1.jpg",
      price: 120,
      limit: "2",
      numberinStock: 10,
      brand: "Adidas",
      productOfStore: store2._id,
      rating: 3.5,
      numberofReviews: 10,
      description: "high quality",
    },

    {
      name: "Adidas pants",
      slug: "adidas_pants",
      category: "Pants",
      image: "/images/image1.jpg",
      price: 120,
      limit: "2",
      numberinStock: 10,
      brand: "Adidas",
      productOfStore: store1._id,
      rating: 4.0,
      numberofReviews: 10,
      description: "high quality",
    },
  ]);

  console.log("products seeded");

  process.exit();
});
