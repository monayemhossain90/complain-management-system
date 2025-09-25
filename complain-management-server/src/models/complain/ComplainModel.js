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
      ref: "User",
      required: [true, "Employee Id is required"],
    },

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed"],
    },
  },
  { timestamps: true, versionKey: false }
);


ComplainSchema.pre("save", async function (next) {
  if (!this.complainNumber) {
    const lastComplain = await this.constructor.findOne().sort("-complainNumber");
    this.complainNumber = lastComplain ? lastComplain.complainNumber + 1 : 1000; // start from 1000
  }
  next();
});


const ComplainModel = mongoose.model("Complain", ComplainSchema);

module.exports = ComplainModel;
