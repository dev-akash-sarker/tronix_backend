const Product = require("../model/productModel");
const Review = require("../model/reviewSchema");
const updateProductRating = async (productId) => {
  const reviews = await Review.find({ productId });

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await Product.findByIdAndUpdate(productId, {
    rating: avgRating,
  });
};

module.exports = updateProductRating;
