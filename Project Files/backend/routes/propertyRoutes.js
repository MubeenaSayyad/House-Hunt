const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  addProperty,
  getAllProperties,
  getSingleProperty,
} = require("../controllers/propertyController");

// ================= MULTER CONFIG =================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ================= ROUTES =================

router.post("/add", upload.single("propertyImage"), addProperty);
router.get("/getall", getAllProperties);
router.get("/:id", getSingleProperty);

module.exports = router;