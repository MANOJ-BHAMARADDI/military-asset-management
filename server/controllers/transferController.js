import Transfer from "../models/Transfer.js";

// Create a transfer record
export const createTransfer = async (req, res) => {
  try {
    const { fromBase, toBase, equipmentType, quantity, transferDate } =
      req.body;

    if (!fromBase || !toBase || !equipmentType || !quantity || !transferDate) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields" });
    }

    const transfer = await Transfer.create({
      fromBase,
      toBase,
      equipmentType,
      quantity,
      transferDate,
      createdBy: req.user.id,
    });

    res.status(201).json(transfer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error while creating transfer" });
  }
};

// Get transfer history with filters
export const getTransfers = async (req, res) => {
  try {
    const { base, equipmentType, startDate, endDate } = req.query;

    const filter = {};

    if (base) {
      // Show transfers where base is either fromBase or toBase
      filter.$or = [{ fromBase: base }, { toBase: base }];
    }
    if (equipmentType) filter.equipmentType = equipmentType;

    if (startDate || endDate) {
      filter.transferDate = {};
      if (startDate) filter.transferDate.$gte = new Date(startDate);
      if (endDate) filter.transferDate.$lte = new Date(endDate);
    }

    const transfers = await Transfer.find(filter).sort({ transferDate: -1 });

    res.json(transfers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error while fetching transfers" });
  }
};
