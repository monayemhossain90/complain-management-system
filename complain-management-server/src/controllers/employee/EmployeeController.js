const employeeService = require("../../services/employee/EmployeeService");

// Get all complaints assigned to employee
exports.GetAllComplainsByEmployee = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const complains = await employeeService.getAllComplainsByEmployee(employeeId);

    return res.status(200).json({
      success: true,
      complains,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching complains",
      error: error.message,
    });
  }
};

// Get complaint details assigned to employee
exports.GetComplainByEmployee = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const complainId = req.params.id;

    const complain = await employeeService.getComplainByEmployee(employeeId, complainId);

    if (!complain) {
      return res.status(404).json({
        success: false,
        message: "Complain not found or not assigned to you",
      });
    }

    return res.status(200).json({
      success: true,
      complain,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching complain",
      error: error.message,
    });
  }
};

// Update complain status by employee
exports.UpdateComplainByEmployee = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const complainId = req.params.id;
    const { status } = req.body;

    if (!status || !["Pending", "Completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed values: Pending, Completed",
      });
    }

    const complain = await employeeService.updateComplainByEmployee(employeeId, complainId, status);

    if (!complain) {
      return res.status(404).json({
        success: false,
        message: "Complain not found or not assigned to you",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Complain updated successfully",
      complain,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating complain",
      error: error.message,
    });
  }
};
