const Category = require("../../model/categoryModel");

const addCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({
      name,
    });

    await category.save();
    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
};

module.exports = addCategoryController;
