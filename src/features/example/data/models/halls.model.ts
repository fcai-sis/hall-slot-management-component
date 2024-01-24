const mongoose = require("mongoose");

const studentHallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  slots: [
    {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
});

const StudentHall = mongoose.model("StudentHall", studentHallSchema);

module.exports = StudentHall;
