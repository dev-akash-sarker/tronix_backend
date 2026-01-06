const subcategory = require("../../model/subcategory.js");

const deleteSubcategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletesub = await subcategory.findById(id);
    if (!deletesub)
      return res.status(404).json({ message: "Subcategory not found" });

    await subcategory.findByIdAndDelete(id);
    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = deleteSubcategoryController;