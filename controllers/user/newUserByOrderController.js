const User = require("../../model/userModel");
const newUserByOrderController = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    contact,
    address,
    country,
    zipcode,
    city,
  } = req.body;

  const existingUser = await User.findOne({email});
  // Basic validation
  if (!email || !firstName || !lastName) {
    return res
      .status(400)
      .json({ message: "Please provide first name, last name, and email." });
  }

  try {
    if (existingUser) {
      const updateFields = {};

      // Conditionally add fields to update if they are present in the request body
      if (contact) updateFields.contact = contact;
      if (address) updateFields.address = address;
      if (country) updateFields.country = country;
      if (zipcode) updateFields.zipcode = zipcode;
      if (city) updateFields.city = city;

      // If there are fields to update, execute the update operation
      if (Object.keys(updateFields).length > 0) {
        // Use findByIdAndUpdate to update the document and get the updated version (optional: { new: true })
        await User.findByIdAndUpdate(existingUser._id, updateFields, {
          new: true,
        });

        // Return a successful update message (200 OK)
        return res.status(200).json({
          message:
            "User already exists. Profile details updated during checkout.",
          userId: existingUser._id,
          email: existingUser.email,
        });
      }

      // If the user exists, but no new data was sent (or only minimal info was sent again),
      // we can inform the client that the user exists and no action was needed.
      return res.status(200).json({
        message: "User already exists.",
        userId: existingUser._id,
        email: existingUser.email,
      });
    }

    // 2. Auto-generate the password
    const user = new User({
      firstName,
      lastName,
      email,
      address,
      contact,
      country,
      city,
      zipcode,
    });
    await user.save();

    return res.status(201).json({
      message: "User registered successfully. Temporary password provided.",
      userId: user._id,
      email: user.email,
      // CRUCIAL: Return the temporary password for frontend display.
    });
  } catch (error) {
    console.error("Error creating or updating user:", error);
    return res
      .status(500)
      .json({ message: "Server error during user operation." });
  }
};
module.exports = newUserByOrderController;
