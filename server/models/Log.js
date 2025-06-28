import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  method: { type: String, required: true },
  endpoint: { type: String, required: true },
  statusCode: { type: Number, required: true },
  requestBody: { type: Object },
  responseTime: { type: Number, required: true }, // in ms
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", logSchema);
export default Log;
