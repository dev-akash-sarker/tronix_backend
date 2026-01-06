const productModel = require("../../model/productModel");
const Promotion = require("../../model/promotionModel");

const getPromotionController = async (req, res) => {
  try {
    const promotions = await Promotion.find()
      .populate("products", "title price discountPercentage") // populate product details
      .sort({ createdAt: -1 });

//    const promotion_product = await productModel.find({
//   _id: { $in: promotions.products.map(p => p.$oid) }
// });
console.log(promotions)

    res.status(200).json(promotions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch promotions" });
  }
};


module.exports = getPromotionController;
