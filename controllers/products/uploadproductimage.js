const { cloudinary } = require("../../config/cloudinary");
const productModel = require("../../model/productModel");

const uploadproductimageController = async (req, res) => {
  try {
    const { productId } = req.params;
    const file = req.file;

    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    if (!productId || !file) {
      return res
        .status(400)
        .json({ success: false, message: "Missing productId or file" });
    }

    // 1️⃣ Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "products",
    });

    console.log("Cloudinary result:", result);

    // 2️⃣ Update product in MongoDB
    const product = await productModel.findById(req.productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // 3️⃣ Update images array and thumbnail atomically
    product.images.push(result.secure_url);
    if (!product.thumbnail) {
      product.thumbnail = result.secure_url;
    }

    await product.save(); // Save changes
    console.log("Updated product images:", product.images);

    res.json({
      success: true,
      message: "Image uploaded to Cloudinary & saved to MongoDB",
      imageUrl: result.secure_url,
      publicId: result.public_id,
      product,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = uploadproductimageController;
