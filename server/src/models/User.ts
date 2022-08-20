import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 10,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      min: 6,
    },
    profileImage: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    followings: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    bio: {
      type: String,
      max: 50,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
