import express from "express";
import {
  createPurchase,
  getPurchases,
} from "../controllers/purchaseController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";

const router = express.Router();

// Only Admin & Logistics can create purchases
router.post("/", authenticate, authorize("admin", "logistics"), createPurchase);

// All roles can get purchases
router.get(
  "/",
  authenticate,
  authorize("admin", "logistics", "commander"),
  getPurchases
);

export default router;
