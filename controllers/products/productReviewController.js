const updateProductRating = require("../../middleware/updateProductRating");
const Review = require("../../model/reviewSchema");
const User = require("../../model/userModel");

const productReviewController = async (req, res) => {
  const { productId, userId, rating, comment } = req.body;

  const user = await User.findById(userId);

  const review = await Review.create({
    productId,
    userId,
    rating,
    comment,
    userName: user.name,
    userEmail: user.email,
  });

  await updateProductRating(productId);

  res.json({ success: true, review });
};

module.exports = productReviewController;
