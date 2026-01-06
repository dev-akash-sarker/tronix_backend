const Promotion = require("../../model/promotionModel.js");
const Product = require("../../model/productModel.js");

const createPromotionController = async (req, res) => {
  try {
    const { title, description, discountPercentage, startDate, endDate, products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Please select at least one product" });
    }

    const promotion = await Promotion.create({
      title,
      description,
      discountPercentage,
      startDate,
      endDate,
      products,
    });

        // Apply promotion discount to selected products
    await Product.updateMany(
      { _id: { $in: products } },
      {
        $set: {
          discountPercentage,
          promotionId: promotion._id,
        },
      }
    );

    res.status(201).json({ message: "Promotion created successfully", promotion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating promotion" });
  }
};

module.exports = createPromotionController;