const { ObjectId } = require("mongodb");
const { ConnectDb } = require("../DB/ConnectDb");

async function Edit(req, res) {
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

    const {
      username,
      email,
      phone,
      dob,
      gender,
      position,
      department,
      doj,
      address,
    } = req.body;

    const updatedEmployee = {
      username,
      email,
      phone,
      gender,
      position,
      department,
      address,
      updatedAt: new Date(),
    };

    if (dob) updatedEmployee.dob = new Date(dob);
    if (doj) updatedEmployee.doj = new Date(doj);

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: updatedEmployee,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("EDIT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = { Edit };