const UserCreateService = require("../../services/user/UserCreateService");
const UserModel = require("../../models/user/UserModel");
const UserLoginService = require("../../services/user/UserLoginService");
const ForgotPasswordVerifyEmailService = require("../../services/ForgotPassword/ForgotPasswordVerifyEmailService");
const ForgotPasswordVerifyOtpService = require("../../services/ForgotPassword/ForgotPasswordVerifyOtpService");
const CreateNewPasswordService = require("../../services/ForgotPassword/CreateNewPasswordService");
const AdminLoginService = require("../../services/user/AdminLoginService");
const GetAllService = require("../../services/common/GetAllService");
const MakeAdminService = require("../../services/user/MakeAdminService");
const RemoveAdminService = require("../../services/user/RemoveAdminService");
const BanUserService = require("../../services/user/BanUserService");
const UnbanUserService = require("../../services/user/UnbanUserService");


exports.CreateUser = async (req, res) =>{
    await UserCreateService(req,res,UserModel);
}

exports.AdminLogin=async(req,res)=>{
    await AdminLoginService(req,res,UserModel);
}


exports.Login = async (req, res) =>{
    await UserLoginService(req,res,UserModel);
}

exports.AdminLogin=async(req,res)=>{
    await AdminLoginService(req,res,UserModel);
}

exports.GetAllUser=async(req,res)=>{
    const projection = {$project: {_id:1, email:1, firstName:1, lastName:1, role:1, isBanned:1}}
    await GetAllService(req,res,UserModel, projection)
}


exports.MakeAdmin=async(req,res)=>{
    await MakeAdminService(req,res,UserModel)
}

//remove admin
exports.RemoveAdmin=async(req,res)=>{
    await RemoveAdminService(req,res,UserModel)
}


exports.BanUser=async(req,res)=>{
    await BanUserService(req,res,UserModel)
}

exports.UnbanUser=async(req,res)=>{
    await UnbanUserService(req,res,UserModel)
}




//Step-01// Send OTP
exports.ForgotPasswordVerifyEmail=async (req,res)=>{
    await ForgotPasswordVerifyEmailService(req,res,UserModel)
}

//Step-02// Verify OTP
exports.ForgotPasswordVerifyOtp=async (req,res)=>{
    await ForgotPasswordVerifyOtpService(req,res);
}

//Step-03
exports.CreateNewPassword=async (req,res)=>{
    await CreateNewPasswordService(req,res)
}
