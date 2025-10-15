const User = require("../../model/userModel");

const userOtpController = async (req , res) => {
    const {email, otp} = req.body;

    let find_user = await User.findOne({email: email});

    if(!find_user.emailVerified && find_user.otp == otp){
        await User.findOneAndUpdate({email: email}, {otp: otp , emailVerified: true})
        res.status(201).json({message: "your email has been verified successfully"})
    } else {
        res.status(500).json({
            error: "Your otp code is wrong"
        })
    }
}

module.exports = userOtpController;