const CreateComplianService = async (req, res, Model) => {
  try {
    const reqBody = req.body;
    reqBody.complainNumber = Math.floor(100000 + Math.random() * 900000);
    let data = await Model.create(reqBody);
    res.status(201).json({ status: true, message: "success", data: data });
  } catch (error) {
    res.status(500).json({ status: false, message: "error", data: error });
  }
};

module.exports = CreateComplianService;
