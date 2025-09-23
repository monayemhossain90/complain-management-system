// const mongoose = require("mongoose");
// const UpdateComplainService= async (req, res,DataModel) => {

//     try{
//         let ID = req.params.id;
//         const ObjectId = mongoose.Types.ObjectId;
//         let UpdateQueryObject = {_id: new ObjectId(ID)};
//         let PostBody=req.body;

//         let Update = await DataModel.updateOne(UpdateQueryObject,PostBody);
//         res.status(200).json({message: "success", data: Update});

//     }
//     catch (error) {
//         res.status(500).json({message: "error", data: error});
//     }
// }
// module.exports=UpdateComplainService



const mongoose = require("mongoose");
const axios = require("axios");
const UserModel = require("../../models/user/UserModel"); 


const UpdateComplainService = async (req, res, DataModel) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid complain ID" });
    }

    const allowedFields = ["status", "assignEmployee"];
    const updateData = {};

    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }

    // update complain and return updated doc
    const updatedComplain = await DataModel.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedComplain) {
      return res.status(404).json({ message: "Complain not found" });
    }

    //  If assignEmployee updated → send SMS
    if (updateData.assignEmployee) {
      try {
        const employee = await UserModel.findById(updateData.assignEmployee);
        if (employee?.phonenumber) {
          const empMessage = `A complain has been assigned to you. Complain number is ${updatedComplain.complainNumber} - E-Jogajog`;

          const smsUrl = `http://bulksmsbd.net/api/smsapi?api_key=${process.env.SMS_API_KEY}&type=text&number=${employee.phonenumber}&senderid=${process.env.SMS_SENDER_ID}&message=${encodeURIComponent(empMessage)}`;

          // fire without blocking main response
          axios.get(smsUrl).catch((err) => {
            console.error("SMS send failed:", err.message);
          });
        }
      } catch (smsErr) {
        console.error("Error sending SMS to employee:", smsErr.message);
      }
    }

    res.status(200).json({ message: "success", data: updatedComplain });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
};

module.exports = UpdateComplainService;
