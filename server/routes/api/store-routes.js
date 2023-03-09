const router = require("express").Router();

const {
  createStore,
  allStores,
  getSingleStore,
  deleteStore,
  updateStore,
  myStores,
} = require("../../controllers/store-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
router.route("/").post(createStore).put(authMiddleware);

router.route("/:id").get(getSingleStore);

router.route("/:id").get(authMiddleware, getSingleStore);

router.route("/delete/:id").delete(authMiddleware, deleteStore);

router.route("/update/:id").put(authMiddleware, updateStore);

router.route("/").get(allStores);

router.route("/mystores").get(myStores);

module.exports = router;
