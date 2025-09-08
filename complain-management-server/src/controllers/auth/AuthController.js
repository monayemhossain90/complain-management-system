const AdminLoginService = require("../../services/auth/AdminLoginService");
const EmployeeLoginService = require("../../services/auth/EmployeeLoginService");
const ManagerLoginService = require("../../services/auth/ManagerLoginService");
const ForgotPasswordVerifyEmailService = require("../../services/ForgotPassword/ForgotPasswordVerifyEmailService");
const ForgotPasswordVerifyOtpService = require("../../services/ForgotPassword/ForgotPasswordVerifyOtpService");

const CreateNewPasswordService = require("../../services/ForgotPassword/CreateNewPasswordService");


exports.AdminLogin=async(req,res)=>{
    await AdminLoginService(req,res,UserModel);
}

exports.ManagerLogin=async(req,res)=>{
    await ManagerLoginService(req,res,UserModel);
}

exports.EmployeeLogin=async(req,res)=>{
    await EmployeeLoginService(req,res,UserModel);
}



