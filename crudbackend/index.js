const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { ConnectDb } = require("./DB/ConnectDb");

const { FetchEmployee } = require("./API/FetchEmployee");
const { GetSingleEmployee } = require("./API/GetSingleEmployee");
const { Delete } = require("./API/Delete");
const { Signup } = require("./API/Signup");
const { Login } = require("./API/Login");
const { Edit } = require("./API/Edit");
const { Insert } = require("./API/Insert");
const session = require("express-session");
const dns = require("dns");
dns.setServers(["1.1.1.1" , "8.8.8.8"]);
const app = express();

app.use(express.json());

app.use(
  cors()
);

app.use(
  session({
    secret: "employeecrudsecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Created Successfully",
  });
});

/* Employee Routes */
app.get("/employees", FetchEmployee);
app.get("/employee/:id", GetSingleEmployee);
app.post("/add", Insert);
app.put("/edit/:id", Edit);
app.delete("/deleteemployee/:id", Delete);

/* Auth Routes */
app.post("/signup", Signup);
app.post("/login", Login);

const PORT = process.env.PORT || 8000;

ConnectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Connection Failed");
    console.error(err);
  });