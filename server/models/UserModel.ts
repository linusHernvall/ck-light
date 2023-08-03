import { Document, Schema, model } from "mongoose";

export interface UserInterface extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
}

const userSchema = new Schema<UserInterface>({
  // _id: String,
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

const UserModel = model<UserInterface>("User", userSchema);
export default UserModel;
