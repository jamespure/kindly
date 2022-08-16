import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  coverImage: string;
  following: [];
  followers: [];
  about: string;
  dob: Date;
  isAdmin: boolean;
}
