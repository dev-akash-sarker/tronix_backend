const  Admin  = require("../../model/adminModel");
const bcrypt = require("bcrypt");
const registerAdminController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne();

    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin already exists. Registration disabled" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({firstName,lastName,email, password: hashedPassword});
    await newAdmin.save();
    res.status(201).json({message: "Admin registered successfully"})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

module.exports = registerAdminController;
