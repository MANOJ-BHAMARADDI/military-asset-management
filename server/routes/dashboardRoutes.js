import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize("admin", "commander", "logistics"),
  getDashboardStats
);

export default router;
