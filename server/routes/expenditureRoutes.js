import express from "express";
import {
  createExpenditure,
  getExpenditures,
} from "../controllers/expenditureController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";

const router = express.Router();

// Admin and Logistics can create expenditures
router.post(
  "/",
  authenticate,
  authorize("admin", "logistics"),
  createExpenditure
);

// Admin, Commander, and Logistics can get expenditures
router.get(
  "/",
  authenticate,
  authorize("admin", "commander", "logistics"),
  getExpenditures
);

export default router;
