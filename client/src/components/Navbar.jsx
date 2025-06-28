import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null; 

  const role = user.role;

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="text-xl font-bold">🎖️ Asset System</div>

      <div className="flex items-center space-x-4">
        <Link to="/dashboard" className="hover:text-yellow-300">
          Dashboard
        </Link>

        {(role === "admin" || role === "logistics") && (
          <Link to="/purchases" className="hover:text-yellow-300">
            Purchases
          </Link>
        )}

        {(role === "admin" || role === "logistics") && (
          <Link to="/transfers" className="hover:text-yellow-300">
            Transfers
          </Link>
        )}

        {(role === "admin" || role === "commander") && (
          <Link to="/assignments" className="hover:text-yellow-300">
            Assignments
          </Link>
        )}

        {(role === "admin" || role === "commander") && (
          <Link to="/expenditures" className="hover:text-yellow-300">
            Expenditures
          </Link>
        )}

        <span className="text-sm text-gray-300">
          ({user.name} - {user.role})
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
