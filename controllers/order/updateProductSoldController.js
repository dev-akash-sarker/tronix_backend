const Product = require("../../model/productModel");



// Helper function to handle inventory/sales update
async function updateSoldCount(products) {
    for (const item of products) {
        // item structure: { product: productId, quantity: 2 }
        
        // Find the corresponding Product document
        const product = await Product.findById(item.product);

        if (product) {
            // 1. Increment the SOLD count
            product.sold = (product.sold || 0) + item.quantity;

            // 2. If you also track 'sold' for metrics separate from stock, do it here.
            // If stock was already reduced when the order was placed, you just update 'sold'.

            await product.save();
        }
    }
}