const express =require('express');
const UserController = require("../controllers/user/UserController");
const ComplainController = require("../controllers/complain/ComplainController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const IsAdmin = require("../middlewares/IsAdmin");


const router = express.Router();


// create employee or manager
router.post("/createUser", AuthVerifyMiddleware,IsAdmin, UserController.CreateUser);

// get all managers and employees 
router.get("/getAllUsers", AuthVerifyMiddleware, IsAdmin, UserController.GetAllUsers);

// get manager/employee by id
router.get("/getUserById/:id", AuthVerifyMiddleware, IsAdmin, UserController.GetUserById);

// update employee/manager by id
 router.patch("/updateUser/:id", AuthVerifyMiddleware, IsAdmin,UserController.UpdateUserById);

//  delete employee and manager
 router.delete("/deleteUser/:id", AuthVerifyMiddleware, IsAdmin, UserController.DeleteUserById);



// get all complains
router.get("/getAllComplains", AuthVerifyMiddleware, IsAdmin, ComplainController.GetAllComplains);

// get complain by id
 router.get("/getComplain/:id", AuthVerifyMiddleware, IsAdmin, ComplainController.GetComplainById);

 // update complain by id
 router.get("/updateComplain/:id", AuthVerifyMiddleware, IsAdmin, ComplainController.UpdateComplainById);

// delete complain
 router.delete("/deleteComplain/:id", AuthVerifyMiddleware, IsAdmin, ComplainController.DeleteComplainById);

module.exports=router;

