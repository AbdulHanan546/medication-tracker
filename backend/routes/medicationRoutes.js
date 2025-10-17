import express from "express";
import { getMedications, addMedication, updateMedication, deleteMedication, markAsTaken } from "../controllers/medicationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect); // Protect all medication routes

router.get("/", getMedications);
router.post("/", addMedication);
router.put("/:id", updateMedication);
router.delete("/:id", deleteMedication);
router.patch("/:id/taken", markAsTaken);

export default router;
