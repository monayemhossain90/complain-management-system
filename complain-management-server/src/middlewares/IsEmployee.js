const UserModel = require("../models/user/UserModel");


module.exports= async (req,res,next)=>{
    try{
        const phonenumber = req.headers.phonenumber;
        const employeeUser = await UserModel.findOne( {phonenumber: phonenumber });
        if(employeeUser.role !== "employee"){
            res.status(400).json("You are not a Employee")
        }
        else{
            next();
        }
    }
    catch(error) {
        res.status(500).json({message: "Employee failure", result: error.toString()})
    }
}

