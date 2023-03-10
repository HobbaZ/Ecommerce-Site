const bcrypt = require("bcrypt");

const data = {
  users: [
    {
      username: "Zac",
      name: "Zachary",
      email: "zachobba@gmail.com",
      password: bcrypt.hash("123456", 5),
      isAdmin: true,
    },

    {
      username: "Joe",
      name: "Joe",
      email: "joeblogs@gmail.com",
      password: bcrypt.hash("123456", 5),
      isAdmin: false,
    },
  ],

  stores: [],

  products: [
    {
      name: "Nike shirt",
      slug: "nike-shirt",
      category: "Shirts",
      image: "/images/image1.jpg",
      price: 120,
      limit: "2",
      numberinStock: 10,
      brand: "Nike",
      rating: 5.0,
      numberofReviews: 10,
      description: "high quality",
    },
    {
      name: "Nike pant",
      slug: "nike-pant",
      category: "Pants",
      image: "/images/image2.jpg",
      price: 100,
      limit: "3",
      numberinStock: 5,
      brand: "Nike",
      rating: 2.5,
      numberofReviews: 5,
      description: "high quality",
    },

    {
      name: "Adidas shirt",
      slug: "adidas-shirt",
      category: "Shirts",
      image: "/images/image3.jpg",
      price: 120,
      limit: "5",
      numberinStock: 10,
      brand: "Adidas",
      rating: 3.0,
      numberofReviews: 10,
      description: "high quality",
    },

    {
      name: "Nike shirt",
      slug: "nike-shirt1",
      category: "Shirts",
      image: "/images/image1.jpg",
      price: 90,
      limit: "2",
      numberinStock: 10,
      brand: "Nike",
      rating: 2.5,
      numberofReviews: 5,
      description: "high quality",
    },
  ],
};

module.exports = data;
