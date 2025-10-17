import express from "express";
import { getHistory, logHistory } from "../controllers/historyController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect); // Protect all history routes

router.get("/", getHistory);
router.post("/", logHistory);

export default router;
