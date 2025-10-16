import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String },
  frequency: { type: String },
  reminderTimes: [String],
  notes: String,
  lastTaken: Date,
}, { timestamps: true });

export default mongoose.model("Medication", medicationSchema);
