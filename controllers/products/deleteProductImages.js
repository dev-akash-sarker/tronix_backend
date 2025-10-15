const { cloudinary } = require("../../config/cloudinary");
const productModel = require("../../model/productModel");

const deleteProductImages = async (req, res) => {
  try {
    const { publicId } = req.params;
    const { productId, fullurl } = req.body;

    if (!publicId || !productId || !fullurl) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // 1. Find product first
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // 2. Check if only one image exists
    if (product.images.length <= 1) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete the last image. Thumbnail is required.",
      });
    }

    // 3. Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(`products/${publicId}`, {
      invalidate: true,
    });

    if (result.result !== "ok") {
      return res.status(400).json({ success: false, message: "Failed to delete from Cloudinary" });
    }

    // 4. Remove the URL from MongoDB
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { $pull: { images: fullurl } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found after update" });
    }

    // 5. Make sure the first image is still thumbnail
    const thumbnail = updatedProduct.images[0];

    return res.json({
      success: true,
      message: "Image deleted successfully",
      product: updatedProduct,
      thumbnail, // Always send first image back as thumbnail
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = deleteProductImages;
