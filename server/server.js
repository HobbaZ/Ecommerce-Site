import express from "express";

import path from "path";

import data from "./data.js";

// Import `authMiddleware()` function to be configured with the Apollo Server
//const { authMiddleware } = require("./utils/auth");
//const db = require("./config/connection");

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

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

/*app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});*/

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
