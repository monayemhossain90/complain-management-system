const express =require('express');
const EmployeeController = require("../controllers/employee/EmployeeController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const IsEmployee = require('../middlewares/IsEmployee');


const router = express.Router();

// get  pending complains that assigned to a employee
router.get("/getAllComplains", AuthVerifyMiddleware, IsEmployee, EmployeeController.GetAllComplainsByEmployee);

// get complain details by id that assigned to a employee
 router.get("/getComplain/:id", AuthVerifyMiddleware, IsEmployee, EmployeeController.GetComplainByEmployee);



// when employee update complain status, an sms will send to customer and a working history will create
 router.patch("/updateComplainStatus/:id", AuthVerifyMiddleware, IsEmployee, EmployeeController.UpdateComplainByEmployee);

module.exports=router;

