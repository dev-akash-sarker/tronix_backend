const categoryModel = require("../../model/categoryModel");

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletesub = await categoryModel.findById(id);
    if (!deletesub)
      return res.status(404).json({ message: "category not found" });

    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({ message: "category deleted successfully" });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = deleteCategoryController;