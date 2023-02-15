const express = require("express");
const path = require("path");
const routes = require("./routes");
const dotenv = require("dotenv");
dotenv.config();

const db = require("./config/connection");
const seedData = require("./routes/seedData");
const { data } = require("./data");

// Import `authMiddleware()` function to be configured with the Apollo Server
//const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 3001;
const app = express();

//server.applyMiddleware({ app });

/*app.use(express.urlencoded({ extended: false }));
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
}*/

app.use("/api/seed", seedData);

//Turn on routing
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
