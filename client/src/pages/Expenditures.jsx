import React, { useContext, useEffect, useState } from "react";
import axios from "../services/axios";
import { AuthContext } from "../context/AuthContext";

const Expenditures = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    base: "Alpha",
    equipmentType: "Ammunition",
    quantity: "",
    expendedDate: "",
  });
  const [expenditures, setExpenditures] = useState([]);

  const fetchExpenditures = async () => {
    try {
      const res = await axios.get(`/expenditures?base=${form.base}`);
      setExpenditures(res.data);
    } catch (err) {
      console.error("Error fetching expenditures:", err);
    }
  };

  useEffect(() => {
    fetchExpenditures();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/expenditures", form);
      setForm({ ...form, quantity: "", expendedDate: "" });
      fetchExpenditures();
    } catch (err) {
      console.error("Error logging expenditure:", err);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
      >
        <h2 className="text-xl font-semibold">Log Expenditure</h2>

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
            name="expendedDate"
            type="date"
            value={form.expendedDate}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Save
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Expenditure Log</h3>

        <table className="w-full border text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Qty</th>
            </tr>
          </thead>
          <tbody>
            {expenditures.map((e) => (
              <tr key={e._id}>
                <td className="p-2 border">
                  {new Date(e.expendedDate).toLocaleDateString()}
                </td>
                <td className="p-2 border">{e.equipmentType}</td>
                <td className="p-2 border">{e.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {expenditures.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">No expenditures logged.</p>
        )}
      </div>
    </div>
  );
};

export default Expenditures;
