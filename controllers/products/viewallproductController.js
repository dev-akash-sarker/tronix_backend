const Product = require("../../model/productModel");
const User = require("../../model/userModel");

const viewallproductController = async (req, res) => {
  try {
    const allproducts = await Product.find(
      {},
      {
        title: 1,
        description: 1,
        categoryId: 1,
        categoryname: 1,
        subCategoryId: 1,
        subcategoryname: 1,
        price: 1,
        discountPercentage: 1,
        rating: 1,
        stock: 1,
        tags: 1,
        brand: 1,
        sku: 1,
        reviews: 1,
        meta: 1,
        images:1,
        thumbnail: 1,
        _id: 1,
      }
    );
    const formattedUsers = allproducts.map((product) => ({
      title: product.title,
      description: product.description,
      categoryId: product.categoryId,
      categoryname: product.categoryname,
      subCategoryId: product.subCategoryId ? product.subCategoryId : "",
      subcategoryname: product.subcategoryname ? product.subcategoryname : "",
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      tags: product.tags,
      brand: product.brand,
      sku: product.sku,
      reviews: product.reviews,
      meta: product.meta,
      images: product.images,
      thumbnail: product.thumbnail,
      _id: product.id,
    }));

    res.status(200).json(formattedUsers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = viewallproductController;
