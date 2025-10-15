const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  images: [String],
});

module.exports = mongoose.model("Image", imageSchema);
