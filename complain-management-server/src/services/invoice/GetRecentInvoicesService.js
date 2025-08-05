
const GetRecentInvoicesSeevice = async (req, res, PatientModel) => {
  try{
    const result = await PatientModel.find().sort('-createdAt').limit(10);
    res.status(200).json({status: true, messsage: "Recent Invoices are retrieved successfully", data:result})
  }catch(err){
    res.status(500).json({status: false, messsage: "Recent Invoices retrieved failled !", error:err})
  }
}



module.exports= GetRecentInvoicesSeevice