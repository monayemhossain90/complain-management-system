const AuthController = require("../controllers/auth/AuthController");
// admin login

router.post('/admin/login',AuthController.AdminLogin);

// manager login

router.post('/manager/login',AuthController.ManagerLogin);

// employee login

router.post('/employee/login',AuthController.EmployeeLogin);



module.exports = router;