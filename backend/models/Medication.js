import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  dosage: { type: String },
  frequency: { type: String },  // e.g. "2 times a day"
  times: [String],              // e.g. ["08:00", "20:00"]
  startDate: { type: Date },
  endDate: { type: Date },
  notes: { type: String },
  lastTaken: { type: Date }
}, { timestamps: true });

export default mongoose.model("Medication", medicationSchema);
