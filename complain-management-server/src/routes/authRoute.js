const AuthController = require("../controllers/auth/AuthController");
// admin login

router.post('/admin/login',AuthController.AdminLogin);

// manager login

router.post('/manager/login',AuthController.AdminLogin);

// employee login

router.post('/employee/login',AuthController.AdminLogin);

 //ForgotPassword
router.post("/forgot-password-verify-email",AuthController.ForgotPasswordVerifyEmail);
router.post("/forgot-password-verify-otp",AuthController.ForgotPasswordVerifyOtp);
router.post("/create-new-password",AuthController.CreateNewPassword);

module.exports = router;