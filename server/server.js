const express = require("express");
const path = require("path");
const routes = require("./routes");
const data = require("./data.js");

const db = require("./config/connection");

// Import `authMiddleware()` function to be configured with the Apollo Server
//const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 3001;
const app = express();

//server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

//Turn on routing
app.use(routes);

//Get all products
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

//get 1 product by Id
app.get("/api/product/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
