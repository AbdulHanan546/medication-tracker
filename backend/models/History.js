import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  medication: { type: mongoose.Schema.Types.ObjectId, ref: "Medication" },
  status: { type: String, enum: ["taken", "skipped", "delayed"], required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("History", historySchema);
