const productModel = require("../../model/productModel");

const updateProductController = async (req, res) => {
  const {
    id,
    title,
    description,
    price,
    discountPercentage,
    stock,
    tags,
    brand,
    sku,
  } = req.body;

  try {
    if (
      title !== "" &&
      description !== "" &&
      price !== "" &&
      discountPercentage !== "" &&
      stock !== "" &&
      tags !== "" &&
      brand !== "" &&
      sku !== ""
    ) {
      const updateProduct = await productModel.findByIdAndUpdate(id, {
        title,
        description,
        price,
        discountPercentage,
        stock,
        tags,
        brand,
        sku,
      });
    //   const updatedProduct = await Todo.findById(id);
      res.status(200).json({ message: "Updated complete", updateProduct });
    }
  } catch (error) {
    console.error(error)
  }
};

module.exports = updateProductController;
