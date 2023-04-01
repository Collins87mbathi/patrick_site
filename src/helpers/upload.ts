import multer from 'multer';

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // File uploads destination
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  }
});

// Initialize multer with the storage configuration
export const upload = multer({ storage: storage });
