const express = require("express");
const router = express.Router();
const { getTractors, addTractor, updateTractorAvailability, upload } = require("../controllers/tractorController");

router.get("/", getTractors);
router.post("/", upload.single("image"), addTractor);
router.patch("/:id/availability", updateTractorAvailability);

module.exports = router;
