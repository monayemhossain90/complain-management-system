
const ComplainHistoryModel = require("../../models/history/ComplainHistoryModel");

const DeleteService = require("../../services/common/DeleteService");
const GetSortingByDateService = require("../../services/common/GetSortingByDateService");


// get all history
exports.GetAllHistory=async(req,res)=>{
  
    await GetSortingByDateService(req,res,ComplainHistoryModel)
}

// delete history by id
exports.DeleteHistoryById = async (req, res) =>{
    await DeleteService(req,res,ComplainHistoryModel)
}





