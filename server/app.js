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


// Test route
app.use("/api/protected", protectedRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/expenditures", expenditureRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Military Asset Management API is running");
});

export default app;
