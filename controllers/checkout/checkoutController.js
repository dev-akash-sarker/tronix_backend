// controllers/checkoutController.js (or wherever it is)
const OrderCheckout = require("../../model/orderModel"); // Ensure path is correct

const checkoutController = async (req, res) => {
  try {
    const { buyer, order, payment } = req.body;

    // Enhanced validation
    if (!buyer || !order || !payment || !order.items || order.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: buyer, order details, or items.",
      });
    }

    // Map and validate items (ensure productId is valid ObjectId if needed)
    const items = order.items.map(item => ({
      productId: item.productId,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      // Add thumbnail if you update the schema: thumbnail: item.thumbnail
    }));

    // Parse financials to Number (frontend sends strings)
    const subtotal = parseFloat(order.subtotal);
    const shipping = parseFloat(order.shipping) || 0;
    const tax = parseFloat(order.tax) || 0;
    const total = parseFloat(order.total);

    if (isNaN(subtotal) || isNaN(shipping) || isNaN(tax) || isNaN(total)) {
      return res.status(400).json({
        success: false,
        message: "Invalid numeric values for subtotal, shipping, tax, or total.",
      });
    }

    // Optional: Add userId if authenticated (use your auth middleware)
    // const userId = req.user?._id; // Assuming JWT or session

    // Create order matching model exactly
    const newOrder = new OrderCheckout({
      // userId, // Uncomment and set if needed
      buyer: {
        firstName: buyer.firstName,
        lastName: buyer.lastName,
        email: buyer.email.toLowerCase(),
        contact: buyer.contact,
        address: buyer.address,
        city: buyer.city,
        country: buyer.country,
        zipCode: buyer.zipCode,
        note: buyer.note || '',
      },
      items,
      subtotal,
      shipping,
      tax,
      total,
      payment: {
       METHOD: payment.method, // Note: 'method', not 'METHOD' – fix typo if in frontend
        status: payment.status || 'pending',
      },
      status: 'pending', // Explicit default
    });

    // This will trigger pre-save hook for total validation and updatedAt
    await newOrder.save();

    // Use MongoDB's _id as orderID
    const orderID = newOrder._id.toString();

    return res.status(201).json({ // 201 for created resource
      success: true,
      message: "Order placed successfully!",
      orderID,
      // Optional: return newOrder for more details
    });
  } catch (error) {
    // Log full error for debugging
    console.error("Checkout error:", error.message, error.stack);

    // Handle Mongoose validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        details: validationErrors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error during checkout",
      details: error.message, // Safe for dev; remove in prod
    });
  }
};

module.exports = checkoutController;