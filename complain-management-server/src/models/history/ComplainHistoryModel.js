
const mongoose = require("mongoose");

const ComplainHistorySchema = new mongoose.Schema(
  {
    complainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complain",
      required: true,
    },

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


      description: {
      type: String,
      trim: true,
      required: [true, "Complain descripiton  is required"],
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
   status: {
      type: String,
      default:"completed"
    },
  
   
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("ComplainHistory", ComplainHistorySchema);
