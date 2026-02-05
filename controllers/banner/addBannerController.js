const Banner = require("../../model/bannerModel");

/**
 * POST /api/v1/banner/add
 * Upload multiple banner images to Cloudinary
 */
const addBannerController = async (req, res) => {
  try {
    if (!req.files || !req.files.length) {
      return res
        .status(400)
        .json({ message: "No banner images uploaded", success: false });
    }

    // Extract only Cloudinary URLs
    const images = req.files
      .map((file) => file.path || file.secure_url || file.url)
      .filter(Boolean); // remove undefined/null

    const { title } = req.body;

    const banner = new Banner({
      title: title || "Banner",
      images,
    });

    await banner.save();

    // Always send proper JSON
    res.status(201).json({
      message: "Banners uploaded successfully ✅",
      banner,
      success: true,
    });
  } catch (error) {
    console.error("Add banner error:", error);

    // Ensure JSON error response
    res.status(500).json({
      message: "Server error ❌",
      success: false,
      error: error.message,
    });
  }
};

module.exports = addBannerController;
