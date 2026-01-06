const userModel = require("../../model/userModel");

/**
 * @desc    Handles user login by checking if an email exists and returns the user object.
 * @route   POST /api/v1/user/userlogin
 * @access  Public
 */
const userLoginController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                message: "Email is required" 
            });
        }

        // Find the user by email, but exclude sensitive data like the password (if you had one)
        // Note: Mongoose automatically handles the casting of the BSON _id to a string for JSON response.
        const user = await userModel.findOne({ email }).select('-password'); 

        if (user) {
            // SUCCESS: Return the full user object to the frontend
            res.status(200).json({ 
                message: "Email verified successfully.",
                // Return the user document found in the database.
                // This will include _id, firstName, email, etc., as per your schema.
                user: user 
            });
        } else {
            // FAILURE: User not found
            res.status(404).json({ 
                message: "User not found with that email" 
            });
        }

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ 
            message: "Server Error during email check.",
            error: error.message 
        });
    }
}

module.exports = userLoginController;