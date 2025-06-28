import React, { useContext, useEffect, useState } from "react";
import axios from "../services/axios";
import { AuthContext } from "../context/AuthContext";

const Purchases = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    base: "Alpha",
    equipmentType: "Weapon",
    quantity: "",
    purchaseDate: "",
  });
  const [purchases, setPurchases] = useState([]);
  const [filterType, setFilterType] = useState("Weapon");

  const fetchPurchases = async () => {
    try {
      const res = await axios.get(
        `/purchases?base=${form.base}&equipmentType=${filterType}`
      );
      setPurchases(res.data);
    } catch (err) {
      console.error("Error fetching purchases:", err);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [filterType]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/purchases", form);
      setForm({ ...form, quantity: "", purchaseDate: "" });
      fetchPurchases();
    } catch (err) {
      console.error("Error creating purchase:", err);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
      >
        <h2 className="text-xl font-semibold">Record New Purchase</h2>

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
            name="purchaseDate"
            type="date"
            value={form.purchaseDate}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-2">
          Purchase History ({form.base})
        </h3>

        <div className="mb-4">
          <label className="text-sm mr-2">Filter by Type:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option>Weapon</option>
            <option>Vehicle</option>
            <option>Ammunition</option>
          </select>
        </div>

        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={p._id}>
                <td className="p-2 border">
                  {new Date(p.purchaseDate).toLocaleDateString()}
                </td>
                <td className="p-2 border">{p.equipmentType}</td>
                <td className="p-2 border">{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {purchases.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">No purchases found.</p>
        )}
      </div>
    </div>
  );
};

export default Purchases;
