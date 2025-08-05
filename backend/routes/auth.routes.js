const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { signup, login, updateSubscription } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/login", login); // ✅ NEW
router.post("/subscribe", authMiddleware, updateSubscription);

module.exports = router;
