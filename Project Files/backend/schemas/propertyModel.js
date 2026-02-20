const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    propertyAdType: {
      type: String,
      required: true,
    },
    propertyAddress: {
      type: String,
      required: true,
    },
    ownerContact: {
      type: Number,
      required: true,
    },
    propertyAmt: {
      type: Number,
      default: 0,
    },
    propertyImage: {
      type: String,
    },
    additionalInfo: {
      type: String,
    },
    ownerName: {
      type: String,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);