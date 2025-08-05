const PatientModel = require("../../models/patient/PatientModel");
const CreateReportService = async (req, res, ReportModel) => {
    try{
        let {invoiceNumber} = req.body;
        let patient =await PatientModel.findOne({invoiceNumber:invoiceNumber});

        if(patient){
            let report =await ReportModel.findOne({invoiceNumber:invoiceNumber});
            if(report){
                res.status(409).json({message: "fail", data: "This Invoice Number already associated with Report!"});
            }
            else {
                let report = await ReportModel.create(req.body)
                res.status(201).json({message: "success", data: report});
            }
        }
        else{
            res.status(404).json({message: "fail", data: "Could not Match this Invoice Number!"});
        }
    }
    catch (error) {
        res.status(500).json({message: "error", data: error});
    }
}

module.exports=CreateReportService