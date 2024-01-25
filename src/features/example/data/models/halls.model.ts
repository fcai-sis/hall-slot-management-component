import mongoose, { Schema } from "mongoose";

const HallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
});

const Hall = mongoose.model("Hall", HallSchema);

export default Hall;
