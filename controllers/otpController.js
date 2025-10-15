const User = require("../model/userModel");

let otpController = async (req, res) => {
  const {email, otp } = req.body;
  let findUser = await User.findOne({ email });
  console.log(findUser.otp);

  if (findUser.otp == otp) {
    await User.findOneAndUpdate({ email: email }, { otp: "" });
    await User.findOneAndUpdate({ email: email }, {emailVerified: true});
    res.json({
       message: "email verification successful"
    })
  } else {
    res.json({
       message: "OTP wrong"
    })
}
}

module.exports = otpController;
