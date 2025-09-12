
const ComplainModel = require("../../models/complain/ComplainModel");

const DetailsService = require("../../services/common/DetailsService");
const DeleteService = require("../../services/common/DeleteService");
const CreateComplianService = require("../../services/Complain/CreateComplainService");
const GetSortingByDateService = require("../../services/common/GetSortingByDateService");
const UpdateService = require("../../services/common/UpdateService");


// create Complain - when complain create an sms will send to customer number
exports.CreateComplain = async (req, res) =>{
    await CreateComplianService(req,res,ComplainModel);
}

// get all Complains
exports.GetAllComplains=async(req,res)=>{
  
    await GetSortingByDateService(req,res,ComplainModel)
}

// get complain by id
exports.GetComplainById = async (req, res) =>{
    await DetailsService(req,res,ComplainModel)
}

// update complain by id
exports.UpdateComplainById = async (req, res) =>{
    await UpdateService(req,res,ComplainModel)
}



// delete complain by id
exports.DeleteComplainById = async (req, res) =>{
    await DeleteService(req,res,ComplainModel)
}





