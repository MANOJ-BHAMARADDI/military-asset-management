import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import transferRoutes from "./routes/transferRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import expenditureRoutes from "./routes/expenditureRoutes.js";
import { apiLogger } from "./middlewares/apiLogger.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(apiLogger);

const PORT = process.env.PORT || 5000;

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientPath = path.resolve(__dirname, "../client/dist");
app.use(express.static(clientPath));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/expenditures", expenditureRoutes);
app.use("/api/dashboard", dashboardRoutes);

// API root test
app.get("/api", (req, res) => {
  res.send("Military Asset Management API is running");
});

// Serve React app for all other routes - Fixed for Express 5.x
app.get("*path", (req, res) =>
  res.sendFile(path.join(clientPath, "index.html"))
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
