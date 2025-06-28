import mongoose from "mongoose";

const expenditureSchema = new mongoose.Schema(
  {
    base: { type: String, required: true },
    equipmentType: { type: String, required: true },
    quantity: { type: Number, required: true },
    expendedDate: { type: Date, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Expenditure = mongoose.model("Expenditure", expenditureSchema);
export default Expenditure;
