import dotenv from 'dotenv';
import express from 'express';
import pkg from 'cloudinary';
import pkgc from 'multer-storage-cloudinary';
import multer from 'multer';

// Import Variables
dotenv.config();
const router = express.Router();
const { v2: cloudinary } = pkg;
const { CloudinaryStorage } = pkgc;

// Middleware
import { auth, admin } from '../../middleware/auth-middleware.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: process.env.CLOUDINARY_FOLDER_NAME,
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg formats allowed!'));
    }
  },
  limits: { fileSize: 524288 },
}).single('image');

router.post('/image', (req, res) => {
  auth,
    admin,
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          res.json({
            status: 'failed',
            message: 'Image file size must be below 500KB',
          });
        }
      } else if (err) {
        res.json({ status: 'failed', message: err.message });
      } else {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.json({
          status: 'success',
          message: 'Image Uploaded Successfully',
          image_url: result.url,
          image_public_id: result.public_id,
        });
      }
    });
});

export default router;
