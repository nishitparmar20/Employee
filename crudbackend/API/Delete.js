const { ObjectId } = require("mongodb");
const { ConnectDb } = require("../DB/ConnectDb");

async function Delete(req, res) {
  try {
    const { id } = req.params;

    const db = await ConnectDb();
    const collection = db.collection("employees");

    const deleteRes = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteRes.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { Delete };