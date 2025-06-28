import React, { useEffect, useState, useContext } from "react";
import axios from "../services/axios";
import { AuthContext } from "../context/AuthContext";
import NetMovementModal from "../components/NetMovementModal";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    purchases: [],
    transfersIn: [],
    transfersOut: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/dashboard?base=Alpha");
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleNetMovementClick = async () => {
    try {
      const res = await axios.get("/dashboard/movements?base=Alpha");
      setModalData(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to load movement details", err);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Opening Balance" value={stats.openingBalance} />
        <StatCard label="Purchases" value={stats.totalPurchases} />
        <StatCard label="Transfer In" value={stats.transferIn} />
        <StatCard label="Transfer Out" value={stats.transferOut} />

        <div onClick={handleNetMovementClick}>
          <StatCard
            label="Net Movement"
            value={stats.netMovement}
            highlight
            clickable
          />
        </div>

        <StatCard label="Assigned" value={stats.assigned} />
        <StatCard label="Expended" value={stats.expended} />
        <StatCard
          label="Closing Balance"
          value={stats.closingBalance}
          highlight
        />
      </div>

      <NetMovementModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        data={modalData}
      />
    </>
  );
};

const StatCard = ({ label, value, highlight, clickable }) => (
  <div
    className={`p-4 rounded shadow transition-all cursor-pointer ${
      highlight ? "bg-blue-100 hover:bg-blue-200" : "bg-white"
    } ${clickable ? "hover:ring-2 ring-blue-300" : ""}`}
  >
    <h3 className="text-sm text-gray-500">{label}</h3>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
