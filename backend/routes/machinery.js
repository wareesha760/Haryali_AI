const express = require("express");
const router = express.Router();
const machineryController = require("../controllers/machineryController");
const authenticateToken = require("../middleware/auth");

// Add new machinery (requires authentication)
router.post("/", authenticateToken, machineryController.addMachinery);

// Get all available machinery (public)
router.get("/", machineryController.getAllMachinery);

// Get user's own machinery (requires authentication)
router.get("/my-machinery", authenticateToken, machineryController.getUserMachinery);

// Update machinery availability (requires authentication)
router.patch("/:id/availability", authenticateToken, machineryController.updateMachineryAvailability);

// Delete machinery (requires authentication)
router.delete("/:id", authenticateToken, machineryController.deleteMachinery);

module.exports = router; 