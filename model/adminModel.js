const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Admin", adminSchema)
