
const EmployeeService = require("../../services/employee/EmployeeService");




// get all employees
exports.GetAllEmployees=async(req,res)=>{
   try {
    const employees = await EmployeeService.getAllEmployees();

    res.status(200).json({
      message: "success",
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
}






