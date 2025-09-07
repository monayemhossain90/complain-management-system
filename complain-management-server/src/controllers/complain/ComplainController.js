
const ComplainModel = require("../../models/complain/ComplainModel");
const GetAllService = require("../../services/common/GetAllService");
const DetailsService = require("../../services/common/DetailsService");
const DeleteService = require("../../services/common/DeleteService");



// get all Complains
exports.GetAllComplains=async(req,res)=>{
    const projection = {$project: {_id:1, customerId:1, phonenumber:1, location:1, complainNumber:1,description:1,assignEmployee:1,status:1}}
    await GetAllService(req,res,UserModel, projection)
}

// get complain by id
exports.GetComplainById = async (req, res) =>{
    await DetailsService(req,res,ComplainModel)
}



// delete complain by id
exports.DeleteComplainById = async (req, res) =>{
    await DeleteService(req,res,ComplainModel)
}





