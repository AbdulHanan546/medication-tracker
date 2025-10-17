import History from "../models/History.js";

export const getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user._id }).populate("medication");
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logHistory = async (req, res) => {
  try {
    const { medication, status } = req.body;
    const newLog = new History({ user: req.user._id, medication, status });
    const saved = await newLog.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
