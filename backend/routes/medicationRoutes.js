import express from "express";
import { getMedications, addMedication } from "../controllers/medicationController.js";

const router = express.Router();

router.get("/", getMedications);
router.post("/", addMedication);

export default router;
