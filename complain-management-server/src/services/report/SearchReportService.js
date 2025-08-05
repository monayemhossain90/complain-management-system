const SearchReportService = async (req, res, ReportModel) => {
  try {
    let { invoiceNumber, phone } = req.body;

    const reports = await ReportModel.aggregate([
      { $match: { invoiceNumber: invoiceNumber, phone: phone } },
      {
        $lookup: {
          from: "patients",
          localField: "invoiceNumber",
          foreignField: "invoiceNumber",
          as: "patient",
        },
      },
      { $unwind: "$patient" }, // Deconstruct the comments array
      {
        $lookup: {
          from: "doctors", // collection name to lookup
          localField: "patient.referredBy",
          foreignField: "_id",
          as: "patient.referredBy",
        }, // Populate the postedBy field in comments
      },
      { $unwind: "$patient.referredBy" },
      {
        $project: {
          invoiceNumber: 1,
          phone: 1,
          result: 1,
          patientName: "$patient.name", // Project patient name from the joined collection,
          testName: "$patient.testName",
          age: "$patient.age", // Project patient age from the joined collection,
          gender: "$patient.gender",
          address: "$patient.address",
          referredBy: "$patient.referredBy.name",
        },
      },
    ]);

    if (reports.length > 0) {
      res.status(200).json({ message: "success", data: reports[0] });
    } else {
      res.status(404).json({ message: "fail", data: "couldn't find a report" });
    }
  } catch (error) {
    res.status(500).json({ message: "error", data: error });
  }
};

module.exports = SearchReportService;
