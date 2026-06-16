const { ObjectId } = require("mongodb");
const { ConnectDb } = require("../DB/ConnectDb");

async function GetSingleEmployee(req, res) {
  try {
    const db = await ConnectDb();
    const collection = db.collection("employees");

    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Employee ID",
      });
    }

    const employee = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { GetSingleEmployee };