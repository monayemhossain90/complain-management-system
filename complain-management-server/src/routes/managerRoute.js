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


// get all pending complains
router.get("/getAllPendingComplains", AuthVerifyMiddleware, IsManager, ComplainController.GetAllPendingComplains);

// get complain by id
 router.get("/getComplain/:id", AuthVerifyMiddleware, IsManager, ComplainController.GetComplainById);

// update complain by id
 router.patch("/updateComplain/:id", AuthVerifyMiddleware, IsManager, ComplainController.UpdateComplainById);

module.exports=router;

