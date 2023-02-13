const router = require("express").Router();

const {
  getCartItems,
  deleteCart,
  updateCart,
} = require("../../controllers/cart-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
router.route("cart/:id").get(authMiddleware, getCartItems);
router.route("cart/:id").post(authMiddleware, updateCart);
router.route("cart/:userId/itemId").delete(authMiddleware, deleteCart);

module.exports = router;
