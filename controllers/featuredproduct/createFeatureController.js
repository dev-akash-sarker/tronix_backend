const Product = require("../../model/productModel.js");
const FeatureProduct = require("../../model/featuredModel.js");

const createFeatureController = async (req, res) => {
  try {
    const { products, discountPercentage } = req.body;

    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Please select at least one product" });
    }

    const featured = await FeatureProduct.create({
      products,
      discountPercentage,
    });

    // Apply promotion discount to selected products
    await Product.updateMany(
      { _id: { $in: products } },
      {
        $set: {
          discountPercentage,
          featuredId: featured._id,
        },
      }
    );

    res
      .status(201)
      .json({ message: "Feature product created successfully", featured });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating feature product" });
  }
};

module.exports = createFeatureController;
