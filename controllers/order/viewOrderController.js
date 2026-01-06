const orderModel = require("../../model/orderModel");

const viewOrderController = async (req, res) => {
  try {
    const allorders = await orderModel.find();
    
    if (!allorders || allorders.length === 0) {
      // It's better to check for an empty array if find() returns one.
      return res.status(404).json({ message: "No orders found" });
    }

    // ⭐ CRITICAL FIX: Send the retrieved data back to the client
    res.status(200).json(allorders); 
    
    // Note: If you had a formattedProduct variable, you'd use that, 
    // but based on your provided code, you should send 'allorders'.

  } catch (error) {
    console.error("Error fetching orders:", error); // Good practice to log the error
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = viewOrderController;