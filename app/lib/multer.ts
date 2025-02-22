import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer
const upload = multer({ storage });

export default upload;
