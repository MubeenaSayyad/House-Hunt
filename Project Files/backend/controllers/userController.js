const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userModel");
const propertySchema = require("../schemas/propertyModel");
const bookingSchema = require("../schemas/bookingModel");

//////////////////// REGISTER ////////////////////
const registerController = async (req, res) => {
  try {
    let granted = "";

    const existsUser = await userSchema.findOne({ email: req.body.email });
    if (existsUser) {
      return res.status(409).send({
        message: "User already exists",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    if (req.body.type === "Owner") {
      granted = "ungranted";
      const newUser = new userSchema({ ...req.body, granted });
      await newUser.save();
    } else {
      const newUser = new userSchema(req.body);
      await newUser.save();
    }

    return res.status(201).send({
      message: "Register Success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//////////////////// LOGIN ////////////////////
const loginController = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid email or password",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    user.password = undefined;

    return res.status(200).send({
      message: "Login successful",
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//////////////////// FORGOT PASSWORD ////////////////////
const forgotPasswordController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await userSchema.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//////////////////// AUTH CONTROLLER ////////////////////
const authController = async (req, res) => {
  try {
    const user = await userSchema.findById(req.body.userId);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    user.password = undefined;

    return res.status(200).send({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Auth error",
      success: false,
    });
  }
};

//////////////////// GET ALL PROPERTIES ////////////////////
const getAllPropertiesController = async (req, res) => {
  try {
    const allProperties = await propertySchema.find({});

    return res.status(200).send({
      success: true,
      data: allProperties,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error fetching properties",
      success: false,
    });
  }
};

//////////////////// BOOK PROPERTY ////////////////////
const bookingHandleController = async (req, res) => {
  try {
    const { propertyid } = req.params;
    const { userDetails, status, userId, ownerId } = req.body;

    const booking = new bookingSchema({
      propertyId: propertyid,
      userID: userId,
      ownerID: ownerId,
      userName: userDetails.fullName,
      phone: userDetails.phone,
      bookingStatus: status,
    });

    await booking.save();

    return res.status(201).send({
      success: true,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error handling booking",
    });
  }
};

//////////////////// GET USER BOOKINGS ////////////////////
const getAllBookingsController = async (req, res) => {
  try {
    const { userId } = req.body;

    const bookings = await bookingSchema.find({
      userID: userId,
    });

    return res.status(200).send({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  authController,
  getAllPropertiesController,
  bookingHandleController,
  getAllBookingsController,
};