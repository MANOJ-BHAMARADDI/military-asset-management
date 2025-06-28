import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    base: { type: String, required: true },
    equipmentType: { type: String, required: true },
    quantity: { type: Number, required: true },
    purchaseDate: { type: Date, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;
