const ComplainModel = require("../../models/complain/ComplainModel");
const UserModel = require("../../models/user/UserModel");
const mongoose = require("mongoose");

// Get all complaints assigned to an employee
const getAllComplainsByEmployee = async (employeeId) => {
  return await ComplainModel.find({ assignEmployee: employeeId }).sort({ createdAt: -1 });
    
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
  return await ComplainModel.findOneAndUpdate(
    { _id: complainId, assignEmployee: new mongoose.Types.ObjectId(employeeId) },
    { status },
    { new: true }
  );
};

module.exports = {
  getAllComplainsByEmployee,
  getComplainByEmployee,
  updateComplainByEmployee,
  getAllEmployees
};
