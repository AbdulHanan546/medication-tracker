import Medication from "../models/Medication.js";

export const getMedications = async (req, res) => {
  try {
    const meds = await Medication.find({ user: req.user._id });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addMedication = async (req, res) => {
  try {
    const newMed = new Medication({ ...req.body, user: req.user._id });
    const saved = await newMed.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateMedication = async (req, res) => {
  try {
    const med = await Medication.findById(req.params.id);
    if (!med || med.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Medication not found" });
    }
    const updatedMed = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMedication = async (req, res) => {
  try {
    const med = await Medication.findById(req.params.id);
    if (!med || med.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Medication not found" });
    }
    await Medication.findByIdAndDelete(req.params.id);
    res.json({ message: "Medication deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markAsTaken = async (req, res) => {
  try {
    const med = await Medication.findById(req.params.id);
    if (!med || med.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Medication not found" });
    }
    med.lastTaken = new Date();
    await med.save();
    res.json(med);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
