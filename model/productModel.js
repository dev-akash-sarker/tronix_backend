const mongoose = require("mongoose");
const reviewSchema = require("./reviewSchema");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,

  // Relationships
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },

  // Readable names
  categoryname: String,
  subcategoryname: String,

  // Price and discount
  price: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 }, // manual discount if any
  finalPrice: { type: Number, default: 0 }, // auto-calculated field

  // Ratings, stock, tags, brand, etc.
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  sold: { type: Number, default: 0 },

  // Physical details
  dimensions: {
    width: Number,
    height: Number,
    depth: Number,
  },

  // Additional info
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: { type: String, default: "In stock" },
  reviews: {
    type: [reviewSchema],
    default: [],
  },
  returnPolicy: String,
  minimumOrderQuantity: { type: Number, default: 1 },

  // Meta info
  meta: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    barcode: String,
    qrCode: String,
  },

  // Image assets
  images: { type: [String], default: [] },
  thumbnail: String,

  // Promotion linkage (NEW)
  promotionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promotion",
    default: null,
  },
  featuredId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FeaturedProduct",
    default: null,
  },
});

// 🧮 Middleware — auto-calculate final price before save
productSchema.pre("save", function (next) {
  if (this.price) {
    const discount = this.discountPercentage || 0;
    this.finalPrice = this.price - (this.price * discount) / 100;
  }
  next();
});

// 🕒 Auto-update meta.updatedAt
productSchema.pre("save", function (next) {
  this.meta.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Product", productSchema);
