const router = require("express").Router();

const {
  allOrders,
  createOrder,
} = require("../../controllers/order-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
router.route("/:id").get(authMiddleware, allOrders);
router.route("/:id").post(authMiddleware, createOrder);

module.exports = router;
