// ValidationController.js
const Admin = require('./../model/adminModel')

const ValidationController = async (req, res) => {
  try {
    const { OTP } = req.body; // OTP from user input

    if (!OTP) {
      return res.status(400).json({ message: "OTP is required" });
    }

    // Find admin by OTP
    const admin = await Admin.findOne({ OTP });

    if (!admin) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // If OTP matches, update isVerified to true
    admin.isVerified = true;
    admin.OTP = NaN;
    await admin.save();

    res.status(200).json({ message: "OTP verified successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = ValidationController;
