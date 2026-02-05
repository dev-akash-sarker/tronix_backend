const productModel = require("../../model/productModel");
const RedisCacheProducts = require("../../util/RedisCacheProducts");

const viewproductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const products = await RedisCacheProducts("viewproducts", async () => {
      const allproducts = await productModel.find(
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
          images: 1,
          thumbnail: 1,
        }
      );

      return allproducts.map((product) => ({
        title: product.title,
        description: product.description,
        categoryId: product.categoryId,
        categoryname: product.categoryname,
        subCategoryId: product.subCategoryId || "",
        subcategoryname: product.subcategoryname || "",
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        tags: product.tags,
        brand: product.brand,
        sku: product.sku,
        reviews: product.reviews || [],
        meta: product.meta,
        images: product.images,
        thumbnail: product.thumbnail,
        _id: product._id.toString(),
      }));
    });

    const product = products.find((p) => p._id === productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error in viewproductController:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = viewproductController;
