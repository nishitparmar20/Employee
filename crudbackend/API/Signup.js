const { ConnectDb } = require("../DB/ConnectDb");

const Signup = async (req, res) => {
  try {
    const db = await ConnectDb();
    const collection = db.collection("employees");

    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const insertRes = await collection.insertOne({
      username,
      email,
      phone,
      password,
      status: "active",
      createdAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      userId: insertRes.insertedId,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { Signup };