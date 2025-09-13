// const CreateComplianService = async (req, res, Model) => {
//   try {
//     const reqBody = req.body;
    
//     let data = await Model.create(reqBody);
//     res.status(201).json({ status: true, message: "success", data: data });
//   } catch (error) {
//     res.status(500).json({ status: false, message: "error", data: error });
//   }
// };

// module.exports = CreateComplianService;

const axios = require("axios");

const CreateComplianService = async (req, res, Model) => {
  try {
    const reqBody = req.body;

    // Create complaint in DB
    let data = await Model.create(reqBody);

    // Send SMS to customer if phone number exists
    if (data.phonenumber) {
      const message = `Your complain has been accepted. Your complain ID is ${data.complainNumber} - Thanks for stay with us. E-Jogajog`;
      const apiKey= process.env.BULK_SMS_BD_API_KEY;
      const smsUrl = `http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=${data.phonenumber}&senderid=8809617620042&message=${encodeURIComponent(message)}`;

      // Send SMS
      await axios.get(smsUrl);
    }

    res.status(201).json({ status: true, message: "success", data: data });
  } catch (error) {
    console.error(error); // optional: log error
    res.status(500).json({ status: false, message: "error", data: error.message });
  }
};

module.exports = CreateComplianService;
