const Subcategory = require("../../model/subcategory");

const addSubCategoryController = async (req , res) => {
try {
    const { name, categoryId} = req.body;
    const isNameExist = await Subcategory.find({name:name});
    console.log("hiii", isNameExist)
 if (isNameExist.length > 0) {
      return res.status(400).json({ error: `${name} is already in use` });
    }
    const subcategory = new Subcategory({
        name, categoryId
    })
    await subcategory.save();

    res.status(201).json({message: "Subcategory creared", subcategory})
} catch (err) {
        res.status(500).json({ message: "Error creating subcategory", error: err.message });
}
}

module.exports = addSubCategoryController;