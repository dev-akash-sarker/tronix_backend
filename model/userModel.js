const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  // isVerified: Boolean,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  otp: String,
  role: {
    type: String,
    enum: ["Admin", "Marchent", "User"],
    default: "User"
  }
});

module.exports = mongoose.model("User", userSchema)
