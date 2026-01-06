const subcategory = require("../../model/subcategory.js");

const viewSubcategoryController = async (req, res) => {
  try {
    // ✅ Populate parent category name
    const subcategories = await subcategory.find()
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(subcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = viewSubcategoryController
