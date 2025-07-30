const express = require("express");
const router = express.Router();
const { getTractors, addTractor } = require("../controllers/tractorController");

router.get("/", getTractors);
router.post("/", addTractor);

module.exports = router;
