const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  productId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "Product",
    required: true,
  },
  title: { type: String, required: true }, // Added to store product title snapshot
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const orderSchema = new Schema(
  {
    OrderId: { type: String, unique: true },
    tran_id: { type: String, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // Buyer/Checkout details (grouped under a buyer sub-document for better organization)
    buyer: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
      },
      contact: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String, required: true }, // Renamed to zipCode for consistency with sample data
      note: { type: String },
    },

    // Order details
    items: [orderItemSchema],

    subtotal: { type: Number, required: true, min: 0 },
    shipping: { type: Number, required: true, min: 0, default: 0 },
    tax: { type: Number, required: true, min: 0, default: 0 },
    total: { type: Number, required: true, min: 0 },

    // Payment details
    payment: {
      method: {
        type: String,
        required: true,
        enum: ["Cash on delivery", "SSLCOMMERZE", "PayPal", "Bank Transfer"], // Extend enums as needed; based on sample
      },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    },

    // Order status (separated from payment for clarity)
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paidStatus: { type: Boolean, default: false },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }, // Added for tracking updates
  },
  { timestamps: true }
);

// Pre-save middleware to auto-update updatedAt and ensure total calculation
orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();

  // Auto-calculate total if not provided or for validation
  const calculatedTotal = this.subtotal + this.shipping + this.tax;
  if (this.total !== calculatedTotal) {
    this.total = calculatedTotal;
  }

  next();
});

// Optional: Index for efficient queries on userId and status
orderSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model("Order", orderSchema);
