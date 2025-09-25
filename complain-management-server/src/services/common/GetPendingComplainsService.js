const GetPendingComplainService = async (req, res, Model) => {
  try {
    const data = await Model.aggregate([
      // Match only documents with status "pending"
      { $match: { status: "pending" } },
      {
        $lookup: {
          from: "users",
          localField: "assignEmployee",
          foreignField: "_id",
          as: "assignEmployee",
        },
      },
      {
        $unwind: "$assignEmployee",
      },

      {
        $project: {
          _id: 1,
          customerId: 1,
          complainNumber: 1,
          phonenumber: 1,
          location: 1,
          description: 1,
          status: 1,
          employeeFirstName: "$assignEmployee.firstName",
          employeeLastName: "$assignEmployee.lastName",
          createdAt: "$createdAt",
        },
      },
      // Sort by creation date descending
      { $sort: { createdAt: -1 } },
    ]);

    res.status(200).json({ message: "success", data: data });
  } catch (error) {
    res.status(500).json({ message: "error", data: error.toString() });
  }
};

module.exports = GetPendingComplainService;
