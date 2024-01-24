import mongoose, { Schema } from "mongoose";

const slotSchema = new mongoose.Schema({
  hallId: { type: mongoose.Schema.Types.ObjectId, ref: "Hall", required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  Day: { type: String, required: true },
});

const Slot = mongoose.model("Slot", slotSchema);

export default Slot;
