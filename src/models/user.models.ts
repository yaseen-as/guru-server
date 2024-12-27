import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["STUDENT", "MENTOR"],
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dhumuuoce/image/upload/v1735057231/xqb5b3c0qbr4f3yvxes9.png",
    },
    phoneNumber: { type: String, required: true },
    timezone: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    lastActive: { type: Date },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isValidPassword = async function (password: string) {
  return await bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      phoneNumber: this.phoneNumber,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string },
  );
};

userSchema.methods.generateRefreshToken = function () {
  const accessToken = jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string },
  );
};

export const User = mongoose.model("User", userSchema);
