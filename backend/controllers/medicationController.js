import Medication from "../models/Medication.js";

export const getMedications = async (req, res) => {
  try {
    const meds = await Medication.find();
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addMedication = async (req, res) => {
  try {
    const newMed = new Medication(req.body);
    const saved = await newMed.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
