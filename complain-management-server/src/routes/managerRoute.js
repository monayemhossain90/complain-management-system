const express =require('express');
const ComplainController = require("../controllers/complain/ComplainController");
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const IsManager = require('../middlewares/IsManager');


const router = express.Router();

// create complain by manager
router.post("/manager/createComplain", AuthVerifyMiddleware,IsManager, ComplainController.CreateComplain);


// get all complains
router.get("/manager/getAllComplains", AuthVerifyMiddleware, IsManager, ComplainController.GetAllComplains);

// get complain by id
 router.get("/manager/getComplain/:id", AuthVerifyMiddleware, IsManager, ComplainController.GetComplainById);

// update complain by id
 router.get("/manager/updateComplain/:id", AuthVerifyMiddleware, IsManager, ComplainController.UpdateComplainById);

module.exports=router;

