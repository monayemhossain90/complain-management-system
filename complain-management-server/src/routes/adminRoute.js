const express =require('express');
const UserController = require("../controllers/user/UserController");
const ComplainController = require("../controllers/complain/ComplainController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const IsAdmin = require("../middlewares/IsAdmin");


const router = express.Router();

// create employee or manager
router.post("/admin/createUser", AuthVerifyMiddleware,IsAdmin, UserController.CreateUser);

// get all manager/employee 
router.get("/admin/getAllUsers", AuthVerifyMiddleware, IsAdmin, UserController.GetAllUsers);

// get manager/employee by id
router.get("/admin/getUserById/:id", AuthVerifyMiddleware, IsAdmin, UserController.GetUserById);

// update employee/manager by id
 router.patch("/admin/updateUser/:id", AuthVerifyMiddleware, IsAdmin,UserController.UpdateUserById);

//  delete employee and manager
 router.delete("/admin/deleteUser/:id", AuthVerifyMiddleware, IsAdmin, UserController.DeleteUserById);



// get all complains
router.get("/admin/getAllComplains", AuthVerifyMiddleware, IsAdmin, ComplainController.GetAllComplains);

// get complain by id
 router.get("/admin/getComplain/:id", AuthVerifyMiddleware, IsAdmin, ComplainController.GetComplainById);

 // update complain by id
 router.get("/admin/updateComplain/:id", AuthVerifyMiddleware, IsAdmin, ComplainController.UpdateComplainById);

// delete complain
 router.delete("/admin/deleteComplain/:id", AuthVerifyMiddleware, IsAdmin, ComplainController.DeleteComplainById);

module.exports=router;

