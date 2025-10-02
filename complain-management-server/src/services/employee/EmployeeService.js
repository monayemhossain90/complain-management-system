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


// const updateComplainByEmployee = async (complainId, employeeId, status) => {
//    const complain = await ComplainModel.findOneAndUpdate(
//     { _id: complainId, assignEmployee: new mongoose.Types.ObjectId(employeeId) },
//     { status },
//     { new: true }
//   );

//       if (!complain) {
//       throw new Error("Complain not found or not assigned to this employee");
//     }
//    const employee = await UserModel.findById(employeeId);
// // Create history
//   await ComplainHistoryModel.create({
//     customerId: complain.customerId,
//     complainNumber:complain.complainNumber,
//     phonenumber:complain.phonenumber,
//     location:complain.location,
//     description:complain.description,
//     employeeFirstName:employee.firstName ,
//     employeeLastName:employee.lastName ,
   
//   });


//     return complain;

// };



const sendSMS = async (number, message, apiKey) => {
  if (!number) return;
  const smsUrl = `http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=${number}&senderid=8809617620042&message=${encodeURIComponent(message)}`;
  try {
    await axios.get(smsUrl);
  } catch (err) {
    console.error(`Failed to send SMS to ${number}:`, err.message);
  }
};


const updateComplainByEmployee = async (complainId, employeeId, status) => {
  const complain = await ComplainModel.findOneAndUpdate(
    { _id: complainId, assignEmployee: new mongoose.Types.ObjectId(employeeId) },
    { status },
    { new: true }
  );

  if (!complain) {
    throw new Error("Complain not found or not assigned to this employee");
  }

  const employee = await UserModel.findById(employeeId);
const manager = await UserModel.findById(complain.manager).select("phonenumber firstName lastName");

  // Create history
  await ComplainHistoryModel.create({
    customerId: complain.customerId,
    complainNumber: complain.complainNumber,
    complainer:complain.complainer,
    phonenumber: complain.phonenumber,
    location: complain.location,
    description: complain.description,
    employeeFirstName: employee.firstName,
    employeeLastName: employee.lastName,
    managerFirstName: manager.firstName,
    managerLastName: manager.lastName,
    status:complain.status,
  });

  //  If status is completed → notify manager
  if (status === "completed") {
    
  
      const apiKey = process.env.BULK_SMS_BD_API_KEY;
      const message = `Complain #${complain.complainNumber} has been marked as completed by ${employee.firstName} ${employee.lastName}. - E-Jogajog`;
      sendSMS(manager.phonenumber, message, apiKey); 
    
  }

  return complain;
};



module.exports = {
  getAllComplainsByEmployee,
  getComplainByEmployee,
  updateComplainByEmployee,
  getAllEmployees
};
