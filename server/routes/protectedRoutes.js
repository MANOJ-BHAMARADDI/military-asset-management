import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { authorize } from "../middlewares/rbac.js";

const router = express.Router();

// Only 'admin' can access this route
router.get("/admin-only", authenticate, authorize("admin"), (req, res) => {
  res.json({ msg: `Welcome admin user ${req.user.id}` });
});

// 'admin' and 'commander' can access this route
router.get(
  "/commander",
  authenticate,
  authorize("admin", "commander"),
  (req, res) => {
    res.json({ msg: `Welcome ${req.user.role} user ${req.user.id}` });
  }
);

export default router;
