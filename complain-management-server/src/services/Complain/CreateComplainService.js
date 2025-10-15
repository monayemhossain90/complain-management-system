
// const axios = require("axios");
// const UserModel = require("../../models/user/UserModel"); 

// const CreateComplianService = async (req, res, Model) => {
//   try {
//     const reqBody = req.body;

//     // Create complain in DB
//     const data = await Model.create(reqBody);

//     const apiKey = process.env.BULK_SMS_BD_API_KEY;
  

//     //  Send SMS to customer
//     if (data.phonenumber) {
//       const message = `Your complain has been accepted. Your complain ID is ${data.complainNumber} - Thanks for staying with us. E-Jogajog`;
//       const smsUrl = `http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=${data.phonenumber}&senderid=8809617620042&message=${encodeURIComponent(message)}`;

//       try {
//         await axios.get(smsUrl);
//       } catch (smsError) {
//         console.error("Failed to send SMS to customer:", smsError.message);
//       }
//     }

//     // Send SMS to assigned employee
//     try {
//       const employee = await UserModel.findById(data.assignEmployee);
//       if (employee?.phonenumber) {
//         const empMessage = `A complain has been assigned to you. Complain number is ${data.complainNumber} - E-Jogajog`;
//         const smsUrlEmp = `http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=${employee.phonenumber}&senderid=8809617620042&message=${encodeURIComponent(empMessage)}`;

//         await axios.get(smsUrlEmp);
//       }
//     } catch (empSmsError) {
//       console.error("Failed to send SMS to employee:", empSmsError.message);
//     }

//      res.status(201).json({ status: true, message: "success", data: data });
//   } catch (error) {
//     console.error("Error in CreateComplianService:", error);
//     res.status(500).json({ status: false, message: "error", data: error.message });
//   }
// };

// module.exports = CreateComplianService;



const axios = require("axios");
const UserModel = require("../../models/user/UserModel");

const sendSMS = async (number, message, apiKey) => {
  if (!number) return;
  const smsUrl = `http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=${number}&senderid=8809617620042&message=${encodeURIComponent(message)}`;
  try {
    await axios.get(smsUrl);
  } catch (err) {
    console.error(` Failed to send SMS to ${number}:`, err.message);
  }
};

const CreateComplainService = async (req, res, Model) => {
  try {
    const reqBody = req.body;
const managerId = req.headers.id;
    // Set logged-in user as manager
    reqBody.manager = managerId;

    // Create complain in DB
    const complain = await Model.create(reqBody);

    const apiKey = process.env.BULK_SMS_BD_API_KEY;

    // Prepare SMS messages
    const customerMsg = `Your complain has been accepted. Your complain number is ${complain.complainNumber} - Thanks for staying with us. E-Jogajog`;
    const employeeMsg = `A complain has been assigned to you. Complain number is ${complain.complainNumber}. Customer phonenumber is ${complain.phonenumber} - E-Jogajog`;

    // Get assigned employee
    const employee = await UserModel.findById(complain.assignEmployee).select("phonenumber");

    // Send SMS in parallel
    await Promise.all([
      sendSMS(complain.phonenumber, customerMsg, apiKey),
      sendSMS(employee?.phonenumber, employeeMsg, apiKey),
    ]);

    res.status(201).json({
      status: true,
      message: "Complain created successfully",
      data: complain,
    });
  } catch (error) {
    console.error(" Error in CreateComplainService:", error);
    res.status(500).json({
      status: false,
      message: "Failed to create complain",
      error: error.message,
    });
  }
};

module.exports = CreateComplainService;
