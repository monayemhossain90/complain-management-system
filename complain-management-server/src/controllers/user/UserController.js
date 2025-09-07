const UserCreateService = require("../../services/user/UserCreateService");
const UserModel = require("../../models/user/UserModel");
const GetAllService = require("../../services/common/GetAllService");
const MakeAdminService = require("../../services/user/MakeAdminService");
const RemoveAdminService = require("../../services/user/RemoveAdminService");
const DetailsService = require("../../services/common/DetailsService");
const UpdateService = require("../../services/common/UpdateService");
const DeleteService = require("../../services/common/DeleteService");

// create user
exports.CreateUser = async (req, res) =>{
    await UserCreateService(req,res,UserModel);
}

// get all users
exports.GetAllUsers=async(req,res)=>{
    const projection = {$project: {_id:1, phonenumber:1, firstName:1, lastName:1, role:1,}}
    await GetAllService(req,res,UserModel, projection)
}

// get user by id
exports.GetUserById = async (req, res) =>{
    await DetailsService(req,res,UserModel)
}

//  update user by id
exports.UpdateUserById = async (req, res) =>{
    await UpdateService(req,res,UserModel)
}

// delete user by id
exports.DeleteUserById = async (req, res) =>{
    await DeleteService(req,res,UserModel)
}

// make admin

exports.MakeAdmin=async(req,res)=>{
    await MakeAdminService(req,res,UserModel)
}

//remove admin
exports.RemoveAdmin=async(req,res)=>{
    await RemoveAdminService(req,res,UserModel)
}





