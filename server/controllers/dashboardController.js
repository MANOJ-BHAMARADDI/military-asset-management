import Purchase from "../models/Purchase.js";
import Transfer from "../models/Transfer.js";
import Assignment from "../models/Assignment.js";
import Expenditure from "../models/Expenditure.js";

export const getDashboardStats = async (req, res) => {
  try {
    const { base } = req.query; // optional filter

    const filter = base ? { base } : {};

    const purchases = await Purchase.find(filter);
    const assignments = await Assignment.find(filter);
    const expenditures = await Expenditure.find(filter);
    const transfers = await Transfer.find({
      $or: [{ fromBase: base }, { toBase: base }],
    });

    const openingBalance = 1000; // Dummy (use logic later if needed)
    const totalPurchases = purchases.reduce((sum, p) => sum + p.quantity, 0);
    const transferIn = transfers
      .filter((t) => t.toBase === base)
      .reduce((sum, t) => sum + t.quantity, 0);
    const transferOut = transfers
      .filter((t) => t.fromBase === base)
      .reduce((sum, t) => sum + t.quantity, 0);
    const assigned = assignments.reduce((sum, a) => sum + a.quantity, 0);
    const expended = expenditures.reduce((sum, e) => sum + e.quantity, 0);

    const netMovement = totalPurchases + transferIn - transferOut;
    const closingBalance = openingBalance + netMovement - assigned - expended;

    res.json({
      openingBalance,
      totalPurchases,
      transferIn,
      transferOut,
      netMovement,
      assigned,
      expended,
      closingBalance,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error generating dashboard stats" });
  }
};

export const getMovementDetails = async (req, res) => {
  const { base, date, equipmentType } = req.query;

  const [purchases, transfersIn, transfersOut] = await Promise.all([
    Purchase.find({ base, equipmentType, date }),
    Transfer.find({ toBase: base, equipmentType, date }),
    Transfer.find({ fromBase: base, equipmentType, date }),
  ]);

  res.json({
    purchases,
    transfersIn,
    transfersOut,
  });
};

