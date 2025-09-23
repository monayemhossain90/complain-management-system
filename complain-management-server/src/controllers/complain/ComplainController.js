
const ComplainModel = require("../../models/complain/ComplainModel");

const DetailsService = require("../../services/common/DetailsService");
const DeleteService = require("../../services/common/DeleteService");
const CreateComplianService = require("../../services/Complain/CreateComplainService");
const GetPendingComplainService = require("../../services/common/GetPendingComplainsService");

const GetCompletedComplainService = require("../../services/common/GetCompletedComplainsService");
const UpdateComplainService = require("../../services/common/UpdateComplainService");


// create Complain - when complain create an sms will send to customer number
exports.CreateComplain = async (req, res) =>{
    await CreateComplianService(req,res,ComplainModel);
}

// get all pending Complains
exports.GetAllPendingComplains=async(req,res)=>{
  
    await GetPendingComplainService(req,res,ComplainModel)
}

// get all completed Complains
exports.GetAllCompletedComplains=async(req,res)=>{
  
    await GetCompletedComplainService(req,res,ComplainModel)
}

// get complain by id
exports.GetComplainById = async (req, res) =>{
    await DetailsService(req,res,ComplainModel)
}

// update complain by id
exports.UpdateComplainById = async (req, res) =>{
    await UpdateComplainService(req,res,ComplainModel)
}



// delete complain by id
exports.DeleteComplainById = async (req, res) =>{
    await DeleteService(req,res,ComplainModel)
}





