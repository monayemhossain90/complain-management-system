
const ComplainHistoryModel = require("../../models/history/ComplainHistoryModel");
const DeleteService = require("../../services/common/DeleteService");
const GetAdminHistoryService = require("../../services/common/GetAdminHistoryService");
const GetEmployeeHistoryService = require("../../services/common/GetEmployeeHistoryService");



// get employee history
exports.GetEmployeeHistory=async(req,res)=>{
  
    await GetEmployeeHistoryService(req,res,ComplainHistoryModel)
}

// get admin history
exports.GetAdminHistory=async(req,res)=>{
  
    await GetAdminHistoryService(req,res,ComplainHistoryModel)
}

// delete history by id
exports.DeleteHistoryById = async (req, res) =>{
    await DeleteService(req,res,ComplainHistoryModel)
}





