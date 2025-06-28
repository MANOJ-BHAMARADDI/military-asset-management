import mongoose from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    fromBase: { type: String, required: true },
    toBase: { type: String, required: true },
    equipmentType: { type: String, required: true },
    quantity: { type: Number, required: true },
    transferDate: { type: Date, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Transfer = mongoose.model("Transfer", transferSchema);
export default Transfer;
