const productModel = require("../../model/productModel");

const updateProductController = async (req, res) => {
  const { title, description, price, discountPercentage, stock, tags, brand, sku, subCategoryId, categoryId, subcategoryname, removedUrls } = req.body;
  const _id = req.params.productId;
  try {
    // Fetch existing product first
    const product = await productModel.findById(_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update basic fields
    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.discountPercentage = discountPercentage ?? product.discountPercentage;
    product.stock = stock ?? product.stock;
    product.tags = tags ? JSON.parse(tags) : product.tags; // if tags sent as JSON string
    product.brand = brand ?? product.brand;
    product.sku = sku ?? product.sku;
    product.categoryId = categoryId ?? product.categoryId;
    product.subCategoryId = subCategoryId ? product.subCategoryId : null;
    product.subcategoryname = subcategoryname ?? product.subcategoryname;

    // Handle removed images
    if (removedUrls) {
      const urlsToRemove = JSON.parse(removedUrls);
      product.images = product.images.filter((img) => !urlsToRemove.includes(img));
      // optionally delete images from storage (Cloudinary, S3, etc.)
    }

    // Handle newly uploaded images
    if (req.files && req.files.length > 0) {
      const uploadedImages = req.files.map((file) => file.path || file.filename); // adapt to your storage
      product.images.push(...uploadedImages);
    }

    await product.save();

    res.status(200).json({ success: true, message: "Product updated", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = updateProductController;
