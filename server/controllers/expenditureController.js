import Expenditure from "../models/Expenditure.js";

// Create Expenditure
export const createExpenditure = async (req, res) => {
  try {
    const { base, equipmentType, quantity, expendedDate } = req.body;
    if (!base || !equipmentType || !quantity || !expendedDate) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields" });
    }

    const expenditure = await Expenditure.create({
      base,
      equipmentType,
      quantity,
      expendedDate,
      createdBy: req.user.id,
    });

    res.status(201).json(expenditure);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error while creating expenditure" });
  }
};

// Get Expenditures with filters
export const getExpenditures = async (req, res) => {
  try {
    const { base, equipmentType, startDate, endDate } = req.query;

    const filter = {};
    if (base) filter.base = base;
    if (equipmentType) filter.equipmentType = equipmentType;
    if (startDate || endDate) {
      filter.expendedDate = {};
      if (startDate) filter.expendedDate.$gte = new Date(startDate);
      if (endDate) filter.expendedDate.$lte = new Date(endDate);
    }

    const expenditures = await Expenditure.find(filter).sort({
      expendedDate: -1,
    });

    res.json(expenditures);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error while fetching expenditures" });
  }
};
