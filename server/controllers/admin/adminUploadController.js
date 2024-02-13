import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import pkg from "cloudinary";
import pkgc from "multer-storage-cloudinary";
import multer from "multer";

// Destructured Variables
dotenv.config();
const { v2: cloudinary } = pkg;
const { CloudinaryStorage } = pkgc;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "MH-SHOP",
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg formats allowed!"));
    }
  },
  limits: { fileSize: 524288 },
}).single("image");

// * @desc - Image Upload
// * @route - POST /api/admin/product/image-upload
// * @access - Admin
export const imageUpload = asyncHandler(async (req, res) => {
  // console.log("REQ : ", req.file);
  console.log("REQssss : ", req.files);
  const { productId } = req.body;

  try {
    // const result = await cloudinary.uploader.upload(req.file.path);
    // console.log("result :: ", result);
    // res.json({ message: "Image uploaded successfully", imageUrl: result.url });
    res.json({ message: "TTTT " });
  } catch (error) {
    throw new Error("Something went wrong, Image upload failed");
  }
});
