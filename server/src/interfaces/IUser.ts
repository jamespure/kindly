import { Document } from "mongoose";

export default interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  coverImage: string;
  followings: [];
  followers: [];
  about: string;
  dob: Date;
  isAdmin: boolean;
}
