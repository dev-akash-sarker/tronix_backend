const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../../model/userModel");
const registrationController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // validate the input fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please fill the input fields" });
  }

  // validate password length by 6
  if (password.lastName < 6) {
    return res
      .status(400)
      .json({ message: "password must be at least 6 characters" });
  }

  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res.status(400).json({ error: `${email} is already in use` });
    }

    // Hash password and save user
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otp);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hash,
      otp: otp,
      isVerified: false,
    });

    user.save();

    const brand = "Tronix";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "akashsarker210@gmail.com",
        pass: "wjnz nuvo xvyo dova",
      },
    });

    const info = transporter.sendMail({
      from: "Tronix",
      to: user.email,
      subject: "Please verify your email",
      text: `${otp}`, // plain‑text body
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${brand}</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing ${brand}. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />${brand}</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>${brand}</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>`, // HTML body
    });

    res.status(201).json({
      name: user.firstName,
      email: user.email,
      role: user.role,
      isVerified: false,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ error: "Error while saving user" });
  }
};

module.exports = registrationController;
