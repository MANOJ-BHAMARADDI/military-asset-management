import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "commander", "logistics"],
      default: "commander",
    },
  },
  { timestamps: true }
);

// 🔐 Password hashing before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔍 Method to compare entered password
userSchema.methods.matchPassword = async function (enteredPwd) {
  return await bcrypt.compare(enteredPwd, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
