const User = require("../model/userModel");
const Order = require("../model/orderModel");
const bcrypt = require("bcrypt");

const checkoutController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      contact,
      coutry,
      city,
      zipcode,
      note,
      items,
    } = req.body;
    // check if user already exist
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        firstName,
        lastName,
        email,
        password: "",
      });
      await user.save();
    }

    // create order
    const order = new Order({
      userId: user._id,
      firstName,
      lastName,
      email,
      address,
      contact,
      country,
      city,
      zipcode,
      note,
      items,
    });

    await order.save();

    res.status(201).json({
        message: "Order placed successfully",
        orderId: order._id
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message: "Checkout failed",
        error: error.message
    })
  }
};

module.exports = checkoutController