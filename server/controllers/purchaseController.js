import Purchase from "../models/Purchase.js";

// Create a new purchase
export const createPurchase = async (req, res) => {
  try {
    const { base, equipmentType, quantity, purchaseDate } = req.body;

    if (!base || !equipmentType || !quantity || !purchaseDate) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields" });
    }

    const purchase = await Purchase.create({
      base,
      equipmentType,
      quantity,
      purchaseDate,
      createdBy: req.user.id,
    });

    res.status(201).json(purchase);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error while creating purchase" });
  }
};

// Get purchases with optional filters: base, equipmentType, date range
export const getPurchases = async (req, res) => {
  try {
    const { base, equipmentType, startDate, endDate } = req.query;

    const filter = {};

    if (base) filter.base = base;
    if (equipmentType) filter.equipmentType = equipmentType;

    if (startDate || endDate) {
      filter.purchaseDate = {};
      if (startDate) filter.purchaseDate.$gte = new Date(startDate);
      if (endDate) filter.purchaseDate.$lte = new Date(endDate);
    }

    // If user is Commander, restrict to their base (optional: you can implement later)

    const purchases = await Purchase.find(filter).sort({ purchaseDate: -1 });

    res.json(purchases);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error while fetching purchases" });
  }
};
