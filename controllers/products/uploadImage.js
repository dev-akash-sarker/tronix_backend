const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // save locally first

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // If using multer-storage-cloudinary:
    const imageUrl = req.file.path; // this is the Cloudinary URL
    console.log("helloworld",imageUrl)

    res.status(200).json({
      message: "Upload successful",
      file: req.file,         // full object (JSON)
      url: imageUrl           // direct URL string
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Upload failed" });
  }
};



module.exports = uploadImage