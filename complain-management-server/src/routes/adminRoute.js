const express =require('express');
const UserController = require("../controllers/user/UserController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const IsAdmin = require("../middlewares/IsAdmin");


const router = express.Router();
// create user
router.post("/admin/createUser", AuthVerifyMiddleware,IsAdmin, UserController.CreateUser);

// admin login

router.post('/admin/login',UserController.AdminLogin);

// get employee and manager
router.get("/admin/getAllEmployee", AuthVerifyMiddleware, IsAdmin, UserController.GetAllUser);
router.get("/admin/getManagerById/:id", AuthVerifyMiddleware, IsAdmin, UserController.GetAllUser);

// update employee and manager
 router.patch("/admin/updateUser/:id", AuthVerifyMiddleware, UserController.UpdateUser);

//  delete employee and manager
 router.delete("/admin/deleteUser/:id", AuthVerifyMiddleware, IsAdmin, UserController.DeleteUser);

// delete complain

 router.delete("/admin/deleteComplain/:id", AuthVerifyMiddleware, IsAdmin, UserController.DeleteUser);
module.exports=router;

