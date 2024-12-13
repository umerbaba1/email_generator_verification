const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: String,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel=mongoose.model('user_data',UserSchema)

module.exports={
    UserModel
}