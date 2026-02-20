const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  forgotPasswordController,
  authController,
  getAllPropertiesController,
  bookingHandleController,
  getAllBookingsController,
} = require("../controllers/userController");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/auth", authController);
router.get("/get-all-properties", getAllPropertiesController);
router.post("/booking/:propertyid", bookingHandleController);
router.post("/get-all-bookings", getAllBookingsController);

module.exports = router;
