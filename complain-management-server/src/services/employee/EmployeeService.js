const axios = require("axios");
const ComplainModel = require("../../models/complain/ComplainModel");
const UserModel = require("../../models/user/UserModel");
const mongoose = require("mongoose");
const ComplainHistoryModel = require("../../models/history/ComplainHistoryModel");

// Get all complaints assigned to an employee
const getAllComplainsByEmployee = async (employeeId) => {
  return await ComplainModel.find({ assignEmployee: employeeId,status:"pending" }).sort({ createdAt: -1 });
    
};
// Get all  employees
const getAllEmployees = async () => {
    try {
    // Fetch all users with role = "employee"
    const employees = await UserModel.find({ role: "employee" })
    return employees;
  } catch (error) {
    throw new Error(error.message);
  }
    
};

// Get single complaint by id (must belong to employee)
const getComplainByEmployee = async (employeeId, complainId) => {
return await ComplainModel.findOne({ _id: complainId, assignEmployee: employeeId });
};

// Update complain status by employee


const updateComplainByEmployee = async (complainId, employeeId, status) => {
   const complain = await ComplainModel.findOneAndUpdate(
    { _id: complainId, assignEmployee: new mongoose.Types.ObjectId(employeeId) },
    { status },
    { new: true }
  );

// Create history
  await ComplainHistoryModel.create({
    complainId: complain._id,
    customerId: complain.customerId,
    phonenumber:complain.phonenumber,
    location:complain.location,
    description:complain.description,
    employeeId,
  });

  // Send SMS to customer if phone number exists
    if (complain.phonenumber) {
      const message = `Your complain has been solved. Your complain ID is ${complain.complainNumber} - Thanks for stay with us. E-Jogajog`;
      const apiKey= process.env.BULK_SMS_BD_API_KEY;
      const smsUrl = `http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=${complain.phonenumber}&senderid=8809617620042&message=${encodeURIComponent(message)}`;

      // Send SMS
      await axios.get(smsUrl);
    }

    return complain;

};

module.exports = {
  getAllComplainsByEmployee,
  getComplainByEmployee,
  updateComplainByEmployee,
  getAllEmployees
};
