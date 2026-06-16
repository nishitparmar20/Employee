const { ConnectDb } = require("../DB/ConnectDb");

async function Insert(req, res) {
  try {
    const db = await ConnectDb();
    const collection = db.collection("employees");

    let {
      username,
      email,
      phone,
      password,
      dob,
      gender,
      position,
      department,
      doj,
      address,
    } = req.body;

    if (!username || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Username, Email and Phone are required",
      });
    }

    const employee = {
      username,
      email,
      phone,
      password,
      gender,
      position,
      department,
      address,
      createdAt: new Date(),
    };

    if (dob) employee.dob = new Date(dob);
    if (doj) employee.doj = new Date(doj);

    const result = await collection.insertOne(employee);

    return res.status(201).json({
      success: true,
      message: "Employee added successfully",
      employeeId: result.insertedId,
    });
  } catch (error) {
    console.error("INSERT EMPLOYEE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while adding employee",
      error: error.message,
    });
  }
}

module.exports = { Insert };