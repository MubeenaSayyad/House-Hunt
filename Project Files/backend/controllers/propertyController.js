const Property = require("../schemas/propertyModel");

// ================= ADD PROPERTY =================
exports.addProperty = async (req, res) => {
  try {
    const {
      ownerId,
      propertyType,
      propertyAdType,
      propertyAddress,
      ownerContact,
      propertyAmt,
      additionalInfo,
      ownerName,
    } = req.body;

    const newProperty = new Property({
      ownerId,
      propertyType,
      propertyAdType,
      propertyAddress,
      ownerContact,
      propertyAmt,
      additionalInfo,
      ownerName,
      propertyImage: req.file ? req.file.path : "",
    });

    await newProperty.save();

    res.status(201).json({
      success: true,
      message: "Property Added Successfully",
      data: newProperty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL =================
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE =================
exports.getSingleProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};