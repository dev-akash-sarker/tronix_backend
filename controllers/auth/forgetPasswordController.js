const User = require("../../model/userModel");

const forgetPasswordController = async (req , res) => {
    const {name,email, password} = req.body;

    let existing_user = await User.findOne({email: email})

    console.log("existing user :" , existing_user);

    if(existing_user.length > 0){
        console.log(existing_user)
    } else {
        res.send({error: "User not found"})
    }



}

module.exports = forgetPasswordController;