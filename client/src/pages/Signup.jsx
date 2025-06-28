import React, { useContext, useState } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "commander",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/auth/signup", form);
      login({
        token: res.data.token,
        name: res.data.name,
        role: res.data.role,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.msg ||
          err.response?.data?.message ||
          "Signup failed"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1
        className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-700 via-green-500 to-yellow-400 text-transparent bg-clip-text"
        style={{ letterSpacing: "2px" }}
      >
        Welcome To Military Asset Management System
      </h1>
      <h2 className="text-xl font-bold mb-4 text-center">Create an Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="commander">Commander</option>
          <option value="logistics">Logistics Officer</option>
          <option value="admin">Admin</option>
        </select>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
