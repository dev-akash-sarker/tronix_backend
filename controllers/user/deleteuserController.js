const User = require("../../model/userModel");

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params; // user id from URL
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = deleteUserController;
