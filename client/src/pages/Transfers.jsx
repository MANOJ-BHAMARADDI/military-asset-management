import React, { useContext, useEffect, useState } from "react";
import axios from "../services/axios";
import { AuthContext } from "../context/AuthContext";

const Transfers = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    fromBase: "Alpha",
    toBase: "Bravo",
    equipmentType: "Weapon",
    quantity: "",
    transferDate: "",
  });
  const [transfers, setTransfers] = useState([]);
  const [filterBase, setFilterBase] = useState("Alpha");

  const fetchTransfers = async () => {
    try {
      const res = await axios.get(`/transfers?base=${filterBase}`);
      setTransfers(res.data);
    } catch (err) {
      console.error("Error fetching transfers:", err);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, [filterBase]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/transfers", form);
      setForm({ ...form, quantity: "", transferDate: "" });
      fetchTransfers();
    } catch (err) {
      console.error("Error creating transfer:", err);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
      >
        <h2 className="text-xl font-semibold">New Transfer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="fromBase"
            value={form.fromBase}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            placeholder="From Base"
            required
          />

          <input
            name="toBase"
            value={form.toBase}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            placeholder="To Base"
            required
          />

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
            name="transferDate"
            type="date"
            value={form.transferDate}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Transfer
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">Transfer History</h3>

        <div className="mb-4">
          <label className="text-sm mr-2">Filter by Base:</label>
          <select
            value={filterBase}
            onChange={(e) => setFilterBase(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option>Alpha</option>
            <option>Bravo</option>
            <option>Charlie</option>
          </select>
        </div>

        <table className="w-full border text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">From</th>
              <th className="p-2 border">To</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Qty</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((t) => (
              <tr key={t._id}>
                <td className="p-2 border">
                  {new Date(t.transferDate).toLocaleDateString()}
                </td>
                <td className="p-2 border">{t.fromBase}</td>
                <td className="p-2 border">{t.toBase}</td>
                <td className="p-2 border">{t.equipmentType}</td>
                <td className="p-2 border">{t.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {transfers.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">No transfers found.</p>
        )}
      </div>
    </div>
  );
};

export default Transfers;
