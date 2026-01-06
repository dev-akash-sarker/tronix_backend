const Order = require("../../model/orderModel");
const Product = require("../../model/productModel"); // ⚠️ IMPORTANT: Ensure your Product model is exported correctly

// --- HELPER FUNCTION: Update Sold Count ---
/**
 * Iterates through order items and increments the 'sold' field in the Product model.
 * @param {Array<Object>} items - The array of items from the order (order.items).
 */
const updateSoldCount = async (items) => {
    // Safety check against "not iterable" error
    if (!Array.isArray(items) || items.length === 0) {
        console.warn("Attempted to update sold count, but 'items' array is invalid or empty.");
        return; 
    }
    
    for (const item of items) {
        try {
            await Product.findByIdAndUpdate(
                item.productId, // The ID of the product
                { 
                    // Use $inc to safely increment the 'sold' field by the quantity
                    $inc: { sold: item.quantity }, 
                },
                { new: true }
            );
        } catch (error) {
            // Log error but continue processing other items
            console.error(`Failed to update sold count for product ${item.productId}:`, error.message);
        }
    }
};

// --- CONTROLLER FUNCTION ---
const updateStatusController = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body; 

        // 🛑 FIX 1: Convert the incoming status to lowercase for Mongoose enum validation
        const newStatus = status ? status.toLowerCase() : null; 

        // 1. Input Validation
        if (!newStatus) {
            return res.status(400).json({
                success: false,
                message: "Status is required",
            });
        }

        // 2. Find the Order to check its current status and products array
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // 3. Conditional Sold Count Logic
        // Check if the order is changing TO 'delivered' AND if it was NOT already 'delivered'
        if (newStatus === 'delivered' && order.status !== 'delivered') {
            
            // 🛑 FIX 2: Pass the correct array name 'order.items'
            await updateSoldCount(order.items); 
        }

        // 4. Update the Order status fields
        order.status = newStatus; // Update the main order status
        
        // Update payment status only when the order status reaches a completion stage
        if (newStatus === 'delivered' || newStatus === 'shipped') {
             // Use the lowercase 'paid' from your enum
             order.payment.status = 'delivered'; 
        }

        // Use .save() to trigger Mongoose pre/post middleware (like updatedAt)
        const updatedOrder = await order.save(); 

        // 5. Send Response
        res.json({
            success: true,
            message: "Order status updated successfully",
            order: updatedOrder,
        });

    } catch (error) {
        console.error("Update Status Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

module.exports = updateStatusController;