const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expert: String,
  name: String,
  datetime: Date,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
