const GetAllComplainService = async (req, res, AppointmentModel) => {
    try{
        const result = await AppointmentModel.aggregate([
            {$lookup: {from: "doctors", localField: "doctorId", foreignField: "_id", as: "doctor"}},
            {$sort : { createdAt: -1 }},
            {$limit: 10}
        ]);
      res.status(200).json({status: true, messsage: "Recent Appointments are retrieved successfully", data:result})
    }catch(err){
      res.status(500).json({status: false, messsage: "Recent Appointments retrieved failled !", error:err})
    }
  }
  
  
  
  module.exports= GetAllComplainService