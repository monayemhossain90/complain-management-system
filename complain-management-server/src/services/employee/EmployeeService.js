const ComplainModel = require("../../models/complain/ComplainModel");

// Get all complaints assigned to an employee
const getAllComplainsByEmployee = async (employeeId) => {
  return await ComplainModel.find({ assignEmployee: employeeId })
    .populate("assignEmployee", "firstName lastName phonenumber role")
    .sort({ createdAt: -1 });
};

// Get single complaint by id (must belong to employee)
const getComplainByEmployee = async (employeeId, complainId) => {
  return await ComplainModel.findOne({
    _id: complainId,
    assignEmployee: employeeId,
  }).populate("assignEmployee", "firstName lastName phonenumber role");
};

// Update complain status by employee
const updateComplainByEmployee = async (employeeId, complainId, status) => {
  return await ComplainModel.findOneAndUpdate(
    { _id: complainId, assignEmployee: employeeId },
    { status },
    { new: true }
  );
};

module.exports = {
  getAllComplainsByEmployee,
  getComplainByEmployee,
  updateComplainByEmployee,
};
