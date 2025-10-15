const Admin = require("../../model/adminModel");

const checkAdminController = async (req , res) => {
    const isAdminExist = await Admin.exists({})
    res.json({exists: !!isAdminExist})
}

module.exports = checkAdminController;