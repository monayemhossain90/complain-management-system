const express =require('express');
const ComplainController = require("../controllers/complain/ComplainController");
const ManagerController = require("../controllers/manager/ManagerController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const IsManager = require('../middlewares/IsManager');


const router = express.Router();

//  get all employee by manager

router.get("/getAllEmployees", AuthVerifyMiddleware, IsManager, ManagerController.GetAllEmployees);

// create complain by manager
router.post("/createComplain", AuthVerifyMiddleware,IsManager, ComplainController.CreateComplain);


// get all completed complains
router.get("/getAllCompletedComplains", AuthVerifyMiddleware, IsManager, ComplainController.GetAllCompletedComplains);

// get all pending complains
router.get("/getAllPendingComplains", AuthVerifyMiddleware, IsManager, ComplainController.GetAllPendingComplains);

// get complain by id
 router.get("/getComplain/:id", AuthVerifyMiddleware, IsManager, ComplainController.GetComplainById);

// update pending complain by manager 
 router.patch("/updateComplain/:id", AuthVerifyMiddleware, IsManager, ComplainController.UpdateComplainById);

// update completed complain status by manager
router.patch("/updateComplainStatus/:id", AuthVerifyMiddleware, IsManager, ManagerController.UpdateComplainStatusByManager);

// get all completed complains
router.get("/getAllCompletedComplains", AuthVerifyMiddleware, IsManager, ComplainController.GetAllCompletedComplains);
module.exports=router;

