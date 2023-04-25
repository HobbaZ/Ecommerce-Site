const router = require("express").Router();

const {
  createProduct,
  allProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../../controllers/product-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
router.route("/create").post(createProduct).put(authMiddleware);

router.route("/").get(allProducts);

router.route("/:id").get(getSingleProduct);

router.route("/:id").delete(authMiddleware, deleteProduct);

router.route("/:id").put(authMiddleware, updateProduct);

module.exports = router;
