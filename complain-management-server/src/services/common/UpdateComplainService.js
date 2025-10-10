
const mongoose = require("mongoose");
const axios = require("axios");
const UserModel = require("../../models/user/UserModel");
const AdminHistoryModel = require("../../models/history/AdminHistoryModel");

const UpdateComplainService = async (req, res, DataModel) => {
  try {
    const { id } = req.params;

    // Validate complain ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid complain ID" });
    }

    // Take all fields from body except manager
    const updateData = { ...req.body };
    if ("manager" in updateData) {
      delete updateData.manager;
    }

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided for update" });
    }

    // Fetch complain before updating to know old assignEmployee
    const existingComplain = await DataModel.findById(id);
    if (!existingComplain) {
      return res.status(404).json({ message: "Complain not found" });
    }

    const oldAssignEmployeeId = existingComplain.assignEmployee?.toString();

    // Update complain
    const updatedComplain = await DataModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedComplain) {
      return res.status(404).json({ message: "Complain not found after update" });
    }

    // If assignEmployee changed → send SMS to old and new employee
    if (
      updateData.assignEmployee &&
      oldAssignEmployeeId !== updateData.assignEmployee
    ) {
      // SMS to new employee
      try {
        const newEmployee = await UserModel.findById(updateData.assignEmployee);
        if (newEmployee?.phonenumber) {
          const empMessage = `A complain has been assigned to you. Complain number is ${updatedComplain.complainNumber} - E-Jogajog`;
          const smsUrl = `http://bulksmsbd.net/api/smsapi?api_key=${
            process.env.SMS_API_KEY
          }&type=text&number=${newEmployee.phonenumber}&senderid=${
            process.env.SMS_SENDER_ID
          }&message=${encodeURIComponent(empMessage)}`;
          axios.get(smsUrl).catch(err =>
            console.error("SMS to new employee failed:", err.message)
          );
        }
      } catch (smsErr) {
        console.error("Error sending SMS to new employee:", smsErr.message);
      }

      // SMS to old employee
      try {
        const oldEmployee = await UserModel.findById(oldAssignEmployeeId);
        if (oldEmployee?.phonenumber) {
          const oldEmpMessage = `The complain #${updatedComplain.complainNumber} has been reassigned to another employee. - E-Jogajog`;
          const smsUrl = `http://bulksmsbd.net/api/smsapi?api_key=${
            process.env.SMS_API_KEY
          }&type=text&number=${oldEmployee.phonenumber}&senderid=${
            process.env.SMS_SENDER_ID
          }&message=${encodeURIComponent(oldEmpMessage)}`;
          axios.get(smsUrl).catch(err =>
            console.error("SMS to old employee failed:", err.message)
          );
        }
      } catch (smsErr) {
        console.error("Error sending SMS to old employee:", smsErr.message);
      }
    }

  

    return res.status(200).json({ message: "success", data: updatedComplain });
  } catch (error) {
    console.error("UpdateComplainService error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = UpdateComplainService;


