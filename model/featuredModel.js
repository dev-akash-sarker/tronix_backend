const mongoose = require("mongoose");

const featureProductnSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeaturedProduct", featureProductnSchema);
