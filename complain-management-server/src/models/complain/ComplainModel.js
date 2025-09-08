const mongoose = require("mongoose");

const ComplainSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      trim: true,
      required: [true, "customer phonenumber is required"],
    },

    phonenumber: {
      type: String,
      trim: true,
      required: [true, "customer phonenumber is required"],
      minLength: [11, "phonenumber must be min 11 characters"],
    },

    location: {
      type: String,
      trim: true,
      required: [true, "customer location is required"],
    },

    // it will create automatically with a unique number
    complainNumber: {
      type: Number,
   
    },

      description: {
      type: String,
      trim: true,
      required: [true, "Complain descripiton  is required"],
    },

    assignEmployee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Employee Id is required"],
    },

    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Completed"],
    },
  },
  { timestamps: true, versionKey: false }
);

const ComplainModel = mongoose.model("complains", ComplainSchema);

module.exports = ComplainModel;
