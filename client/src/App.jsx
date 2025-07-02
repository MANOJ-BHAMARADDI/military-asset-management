import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import Transfers from "./pages/Transfers";
import Assignments from "./pages/Assignments";
import Expenditures from "./pages/Expenditures";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchases"
            element={
              <ProtectedRoute allowedRoles={["admin", "logistics"]}>
                <Purchases />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transfers"
            element={
              <ProtectedRoute allowedRoles={["admin", "logistics"]}>
                <Transfers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignments"
            element={
              <ProtectedRoute allowedRoles={["admin", "commander"]}>
                <Assignments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenditures"
            element={
              <ProtectedRoute allowedRoles={["admin", "commander"]}>
                <Expenditures />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </>
  );
}
