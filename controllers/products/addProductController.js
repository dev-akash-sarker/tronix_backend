const { default: mongoose } = require("mongoose");
const categoryModel = require("../../model/categoryModel");
const Product = require("../../model/productModel");
const subcategoryModel = require("../../model/subcategory");

const addProductController = async (req, res) => {
  try {
    const {
      title,
      description,
      categoryId,
      subCategoryId,
      price,
      discountPercentage,
      stock,
      tags,
      brand,
      sku,
    } = req.body;

    // Ensure req.file exists before using it
    const images = req.files ? req.files.map((file) => file.path) : [];
    const thumbnail = images.length > 0 ? images[0] : "";

    console.log("images",  req.files );
    const isproductexist = await Product.findOne({
      sku: sku,
    });
    if (isproductexist) {
      return res.status(409).json({ message: "Product is already exist" });
    }

    const categoryName = await categoryModel.findById(categoryId);
    // subcategory name (only if provided + valid)
    let subcategoryname = "";
    if (subCategoryId && mongoose.Types.ObjectId.isValid(subCategoryId)) {
      const subcategoryDoc = await subcategoryModel.findById(subCategoryId, {
        name: 1,
      });
      if (subcategoryDoc) {
        subcategoryname = subcategoryDoc.name;
      }
    }


    const categoryname = categoryName.name;
          // console.log(subCategoryId)
    // const subcategoryname = subcategoryName.name;
    // const subcategoryname = subcategoryName ? subcategoryName.name : ""

    // console.log(subcategoryname)

    // create product
    const product = new Product({
      title,
      description,
      categoryId,
      subCategoryId: subCategoryId || null,
      categoryname,
      subcategoryname,
      price,
      discountPercentage,
      stock,
      tags: tags ? tags.split(",") : [],
      brand,
      sku,
      images,
      thumbnail,
    });

    await product.save();

    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    res.status(201).json({ message: "Product added", product });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = addProductController;
