const router = require("express").Router();
const userRoutes = require("./user-routes");
const cartRoutes = require("./cart-routes");
const orderRoutes = require("./order-routes");
const productRoutes = require("./product-routes");
const storeRoutes = require("./store-routes");

// Prefix all routes defined in the routes with their route names
//e.g. /api/categories
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/stores", storeRoutes);

module.exports = router;
