

const Featured = require("../../model/featuredModel");
const productModel = require("../../model/productModel");
const Promotion = require("../../model/promotionModel");

const viewfeatureController = async (req, res) => {
  try {
    const featured = await Featured.find()
      .populate("products", "title _id discountPercentage") // populate product details
      .sort({ createdAt: -1 });

//    const promotion_product = await productModel.find({
//   _id: { $in: promotions.products.map(p => p.$oid) }
// });

    res.status(200).json(featured);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch featured" });
  }
};


module.exports = viewfeatureController;
