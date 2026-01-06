const subcategory = require("../../model/subcategory");

const getSubcategoryController = async (req, res) => {
  try {

    // Find all categories where parent = parentId
    const subcategories = await subcategory.find();

    res.status(200).json(subcategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getSubcategoryController;