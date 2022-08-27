import { Document } from "mongoose";

export default interface IUser extends Document {
  user_id: string;
  disc: string;
  image: string;
  likes: [];
}
