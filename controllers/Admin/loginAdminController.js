const Admin = require("../../model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAdminController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    console.log("abc", admin);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("ismatch",isMatch)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // generate jwt
    const token = jwt.sign({ id: admin._id , role: "admin"}, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = loginAdminController;
