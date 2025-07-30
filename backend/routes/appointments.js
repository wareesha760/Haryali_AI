const express = require("express");
const Appointment = require("../models/Appointment");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// ✅ Create appointment
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { expert, name, datetime } = req.body;
    const appointment = new Appointment({
      user: req.user.id, // 👈 associate with logged-in user
      expert,
      name,
      datetime,
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: "Server error while saving appointment" });
  }
});

// ✅ Get appointments for logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching appointments" });
  }
});

// ✅ Delete appointment
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Appointment.deleteOne({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
