const { connect, connection } = require("mongoose");

const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/ecommerceDBTest"; //use mongodb://127.0.0.1/<your db here> as localhost server instead of mongodb:localhost:27017/<your db here> as this will manually set it to IPv4 to run reliably
//https://stackoverflow.com/questions/69840504/mongooseserverselectionerror-connect-econnrefused-127017

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Oh no, can't connect", err);
  });

module.exports = connection;
