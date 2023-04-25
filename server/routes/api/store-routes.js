const router = require("express").Router();

const {
  createStore,
  allStores,
  getSingleStore,
  deleteStore,
  updateStore,
} = require("../../controllers/store-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
router.route("/create").post(createStore).put(authMiddleware);

router.route("/:id").get(getSingleStore);

router.route("/:id").get(authMiddleware, getSingleStore);

router.route("/:id").delete(authMiddleware, deleteStore);

router.route("/:id").put(authMiddleware, updateStore);

router.route("/").get(allStores);

module.exports = router;
