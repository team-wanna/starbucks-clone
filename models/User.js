import mongoose from "mongoose";
import passport from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  id: String,
  pwd: String,
  name: String,
  gender: String,
  birth: String,
  phone: Number,
  email: String,
  nickname: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.plugin(passport, { usernameField: "id" });

const model = mongoose.model("User", UserSchema);

export default model;
