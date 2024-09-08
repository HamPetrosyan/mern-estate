import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
    avatar: {
      type: String,
      default:
        "https://play-lh.googleusercontent.com/x-tcjbgMbRBf1_5kvC1Vd_YgC0kIdtqWE0HmQiwN9BKEWVRDFTCHmuMfHbKMLsBnfF8H",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
