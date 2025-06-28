import React from "react";

const NetMovementModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-lg font-bold mb-4">Net Movement Breakdown</h2>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-1">📦 Purchases</h3>
          <ul className="list-disc pl-6 text-sm text-gray-800">
            {data.purchases.map((p, i) => (
              <li key={i}>
                {p.quantity} {p.equipmentType} on{" "}
                {new Date(p.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-1">🚛 Transfers In</h3>
          <ul className="list-disc pl-6 text-sm text-gray-800">
            {data.transfersIn.map((t, i) => (
              <li key={i}>
                {t.quantity} {t.equipmentType} from {t.fromBase} on{" "}
                {new Date(t.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-1">📤 Transfers Out</h3>
          <ul className="list-disc pl-6 text-sm text-gray-800">
            {data.transfersOut.map((t, i) => (
              <li key={i}>
                {t.quantity} {t.equipmentType} to {t.toBase} on{" "}
                {new Date(t.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onClose}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NetMovementModal;
