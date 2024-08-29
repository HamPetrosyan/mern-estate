import mongoose from "mongoose";
const defaultProfileIconPath = "../utils/assets/profile_icon.png";

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
      default: defaultProfileIconPath,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
