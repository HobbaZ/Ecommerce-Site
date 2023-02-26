const router = require("express").Router();

const {
  createStore,
  allStores,
  deleteAllStores,
  getSingleStore,
  deleteStore,
  updateStore,
} = require("../../controllers/store-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
router.route("/").post(createStore).put(authMiddleware);

router.route("/:id").get(getSingleStore);

//router.route("delete/:id").delete(authMiddleware, deleteStore);

//router.route("update/:id").put(authMiddleware, updateStore);

router.route("/").get(allStores);

module.exports = router;
