import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  login: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  username: { type: String, require: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  sex: { type: String, require: true },
  birthDate: { type: String, require: true },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
