import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

// module.exports = model("User", userSchema); - JS-syntax
export default model("User", userSchema);
