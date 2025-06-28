import Assignment from "../models/Assignment.js";

// Create Assignment
export const createAssignment = async (req, res) => {
  try {
    const { base, equipmentType, quantity, assignedTo, assignedDate } =
      req.body;
    if (!base || !equipmentType || !quantity || !assignedTo || !assignedDate) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields" });
    }

    const assignment = await Assignment.create({
      base,
      equipmentType,
      quantity,
      assignedTo,
      assignedDate,
      createdBy: req.user.id,
    });

    res.status(201).json(assignment);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error while creating assignment" });
  }
};

// Get Assignments with filters
export const getAssignments = async (req, res) => {
  try {
    const { base, equipmentType, startDate, endDate } = req.query;

    const filter = {};
    if (base) filter.base = base;
    if (equipmentType) filter.equipmentType = equipmentType;
    if (startDate || endDate) {
      filter.assignedDate = {};
      if (startDate) filter.assignedDate.$gte = new Date(startDate);
      if (endDate) filter.assignedDate.$lte = new Date(endDate);
    }

    const assignments = await Assignment.find(filter).sort({
      assignedDate: -1,
    });

    res.json(assignments);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error while fetching assignments" });
  }
};
