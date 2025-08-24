import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
      expires: 300,
    },
  },
  { timestamps: true }
);

export const Otp = mongoose.model("Otp", OtpSchema);
