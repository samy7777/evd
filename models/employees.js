const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    //   required: true,
    // trim: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  desrciption: {
    type: String,
  },
  role: {
    type: String,
    enum: ["employee", "admin"],
    default: "employee",
  },
  full_address: {
    address: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    // timestamps: true,
  },
  
});

module.exports = mongoose.model("Employee", employeeSchema);
