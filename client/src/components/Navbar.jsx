import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  const role = user.role;

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-md relative">
      <div className="text-xl font-bold">🎖️ Asset System</div>

      <button
        className="md:hidden flex flex-col justify-center items-center"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

      <div className="hidden md:flex items-center space-x-4">
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

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 flex flex-col items-start px-6 py-4 space-y-3 z-50 md:hidden shadow-lg">
          <Link
            to="/dashboard"
            className="hover:text-yellow-300 w-full"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>

          {(role === "admin" || role === "logistics") && (
            <Link
              to="/purchases"
              className="hover:text-yellow-300 w-full"
              onClick={() => setMenuOpen(false)}
            >
              Purchases
            </Link>
          )}

          {(role === "admin" || role === "logistics") && (
            <Link
              to="/transfers"
              className="hover:text-yellow-300 w-full"
              onClick={() => setMenuOpen(false)}
            >
              Transfers
            </Link>
          )}

          {(role === "admin" || role === "commander") && (
            <Link
              to="/assignments"
              className="hover:text-yellow-300 w-full"
              onClick={() => setMenuOpen(false)}
            >
              Assignments
            </Link>
          )}

          {(role === "admin" || role === "commander") && (
            <Link
              to="/expenditures"
              className="hover:text-yellow-300 w-full"
              onClick={() => setMenuOpen(false)}
            >
              Expenditures
            </Link>
          )}

          <span className="text-sm text-gray-300 w-full">
            ({user.name} - {user.role})
          </span>

          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded w-full text-left"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
