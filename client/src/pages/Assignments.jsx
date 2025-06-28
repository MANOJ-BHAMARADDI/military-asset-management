import React, { useContext, useEffect, useState } from "react";
import axios from "../services/axios";
import { AuthContext } from "../context/AuthContext";

const Assignments = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    base: "Alpha",
    equipmentType: "Weapon",
    quantity: "",
    assignedTo: "",
    assignedDate: "",
  });
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`/assignments?base=${form.base}`);
      setAssignments(res.data);
    } catch (err) {
      console.error("Error fetching assignments:", err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/assignments", form);
      setForm({ ...form, quantity: "", assignedTo: "", assignedDate: "" });
      fetchAssignments();
    } catch (err) {
      console.error("Error creating assignment:", err);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
      >
        <h2 className="text-xl font-semibold">Assign Asset</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="equipmentType"
            value={form.equipmentType}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          >
            <option>Weapon</option>
            <option>Vehicle</option>
            <option>Ammunition</option>
          </select>

          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />

          <input
            name="assignedTo"
            placeholder="Personnel Name / ID"
            value={form.assignedTo}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />

          <input
            name="assignedDate"
            type="date"
            value={form.assignedDate}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Assign
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Assignment History</h3>

        <table className="w-full border text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a._id}>
                <td className="p-2 border">
                  {new Date(a.assignedDate).toLocaleDateString()}
                </td>
                <td className="p-2 border">{a.equipmentType}</td>
                <td className="p-2 border">{a.quantity}</td>
                <td className="p-2 border">{a.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {assignments.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">No assignments found.</p>
        )}
      </div>
    </div>
  );
};

export default Assignments;
