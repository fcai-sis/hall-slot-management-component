import mongoose, { Schema } from "mongoose";

const slotSchema = new mongoose.Schema({
  startTime: {
    hour: { type: Number, required: true, min: 0, max: 23 },
    minute: { type: Number, required: true, min: 0, max: 59 },
  },
  endTime: {
    hour: { type: Number, required: true, min: 0, max: 23 },
    minute: { type: Number, required: true, min: 0, max: 59 },
  },
  day: { type: Number, required: true, min: 0, max: 6 },
});

const Slot = mongoose.model("Slot", slotSchema);

export default Slot;
