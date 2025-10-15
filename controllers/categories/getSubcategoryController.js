const subcategory = require("../../model/subcategory");

const getSubcategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find all categories where parent = parentId
    const subcategories = await subcategory.find({ categoryId: categoryId });

    res.status(200).json(subcategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getSubcategoryController;