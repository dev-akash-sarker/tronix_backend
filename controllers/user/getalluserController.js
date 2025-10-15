const User = require("../../model/userModel");

const getalluserController = async (req, res) => {
  try {
    const alluser = await User.find(
      {},
      { firstName: 1, lastName: 1, email: 1, age: 1, address: 1, _id: 1 }
    );
    const formattedUsers = alluser.map((user) => ({
      fullname: `${user.firstName} ${user.lastName}`,
      email: user.email,
      age: user.age || "",
      address: user.address || "",
      _id: user.id
    }));
    console.log(alluser.firstName);
    res.status(200).json(formattedUsers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getalluserController;
