import express from "express";
import {
  createAssignment,
  getAssignments,
} from "../controllers/assignmentController.js";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";

const router = express.Router();

// Admin, Commander, Logistics can create assignments
router.post(
  "/",
  authenticate,
  authorize("admin", "commander", "logistics"),
  createAssignment
);

// All roles can get assignments
router.get(
  "/",
  authenticate,
  authorize("admin", "commander", "logistics"),
  getAssignments
);

export default router;
