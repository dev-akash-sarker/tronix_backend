const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String },
    images: [{ type: String, required: true }], // store file paths or URLs
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
