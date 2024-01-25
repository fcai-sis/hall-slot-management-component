import mongoose, { Schema } from "mongoose";

const slotSchema = new mongoose.Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  day: { type: String, required: true },
});

const Slot = mongoose.model("Slot", slotSchema);

export default Slot;
