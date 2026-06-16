const { ConnectDb } = require("../DB/ConnectDb");

async function FetchEmployee(req, res) {
  try {
    const db = await ConnectDb();
    const collection = db.collection("employees");

    const employees = await collection.find().toArray();

    return res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      employees,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { FetchEmployee };