import { Schema, model } from "mongoose";
import IPost from "../interfaces/IPost";

const PostSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    disc: { type: String, max: 500 },
    image: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    disLikes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export const Post = model<IPost>("Post", PostSchema);
