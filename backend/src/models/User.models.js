import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    fullName: {
      type: String,
      required: true,
      index: true,
    },
    coverImage: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
      maxlength: 50,
    },
    website: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.Create_Access_Token = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.EXPIRY_ACCESS_TOKEN,
    }
  );
};

UserSchema.methods.Create_Refresh_Token = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.EXPIRY_REFRESH_TOKEN,
    }
  );
};

export const User = mongoose.model("User", UserSchema);

export const Access_Token_options = {
  httpOnly: true,
  secure: `${process.env.NODE_ENV}` === "production",
  sameSite: "Lax",
  maxAge: 1000 * 60 * 60 * 24,
};

export const Refresh_Token_options = {
  httpOnly: true,
  secure: `${process.env.NODE_ENV}` === "production",
  sameSite: "Lax",
  maxAge: 1000 * 60 * 60 * 24 * 7,
};
