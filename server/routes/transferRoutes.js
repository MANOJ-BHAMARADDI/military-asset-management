import express from "express";
import {
  createTransfer,
  getTransfers,
} from "../controllers/transferController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";

const router = express.Router();

// Admin and Logistics can create transfers
router.post("/", authenticate, authorize("admin", "logistics"), createTransfer);

// Admin, Logistics, and Commander can view transfers
router.get(
  "/",
  authenticate,
  authorize("admin", "logistics", "commander"),
  getTransfers
);

export default router;
