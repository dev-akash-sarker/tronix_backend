const productModel = require("../../model/productModel");

const viewproductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId, {
      title: 1,
      description: 1,
      categoryId: 1,
      subCategoryId: 1,
      categoryname: 1,
      subcategoryname: 1,
      price: 1,
      discountPercentage: 1,
      rating:1,
      stock: 1,
      tags: 1,
      brand: 1,
      sku: 1,
      reviews: 1,
      images: 1,
      thumbnail: 1,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const formattedProduct = {
      title: product.title,
      description: product.description,
      categoryId: product.categoryId,
      subCategoryId: product.subCategoryId ? product.subCategoryId : "", 
      categoryname: product.categoryname,
      subcategoryname: product.subcategoryname ? product.subcategoryname : "",
      price: product.price,
      discountPercentage: product.discountPercentage,
      stock: product.stock,
      tags: product.tags,
      rating: product.rating,
      brand: product.brand,
      sku: product.sku,
      reviews: product.reviews,
      images: product.images,
      thumbnail: product.thumbnail,
      _id: product._id,
    };

    console.log(product.images)

    res.status(200).json(formattedProduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = viewproductController;
