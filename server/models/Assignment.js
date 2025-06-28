import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    base: { type: String, required: true },
    equipmentType: { type: String, required: true },
    quantity: { type: Number, required: true },
    assignedTo: { type: String, required: true }, // Personnel name or ID
    assignedDate: { type: Date, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
