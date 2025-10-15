const User = require("../../model/userModel");

const verificationUserController = async (req , res) => {

    const {email} = req.body;

    const existing_user = await User.findOne({email: email})

    if(existing_user.length > 0){
        
    }







}

module.exports = verificationUserController;