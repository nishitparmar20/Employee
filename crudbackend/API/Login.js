const { ConnectDb } = require("../DB/ConnectDb");

const Login = async (req, res) => {
  try {
    const db = await ConnectDb();
    const collection = db.collection("employees");

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await collection.findOne({
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        isauth: false,
        message: "Invalid credentials",
      });
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    return res.status(200).json({
      success: true,
      isauth: true,
      message: "Login successful",
      user: req.session.user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { Login };