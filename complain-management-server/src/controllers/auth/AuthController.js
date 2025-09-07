const AdminLoginService = require("../../services/auth/AdminLoginService");
const EmployeeLoginService = require("../../services/auth/EmployeeLoginService");
const ManagerLoginService = require("../../services/auth/ManagerLoginService");


exports.AdminLogin=async(req,res)=>{
    await AdminLoginService(req,res,UserModel);
}

exports.ManagerLogin=async(req,res)=>{
    await ManagerLoginService(req,res,UserModel);
}

exports.EmployeeLogin=async(req,res)=>{
    await EmployeeLoginService(req,res,UserModel);
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
