import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  gender: { type: String, require: true },
  pass: { type: String, select: false, require: true },
  imgUser: { type: String },
});

const userModel = mongoose.model("users", UserSchema);

export default userModel;
