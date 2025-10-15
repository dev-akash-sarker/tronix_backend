const Category = require("../../model/categoryModel");

const getCategoryController = async (req, res) => {
  try {
    // get all categories
    const categories = await Category.find();


    res.json(categories)
  } catch (error) {
     res.status(500).json({ message: "Error fetching categories", error: err.message });
  }
};

module.exports = getCategoryController;
