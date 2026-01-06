const { cloudinary } = require("../../config/cloudinary");

const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;
    console.log(publicId);
    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });

    if (result.result === "ok") {
      return res.json({
        success: true,
        message: "Image deleted from Cloudinary",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Failed to delete image" });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = deleteImage;
