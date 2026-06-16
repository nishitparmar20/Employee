import { useState } from "react";
import "../add.css";
import Sidebar from "../Common/Sidebar";
import API from "../service/api";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
function Add() {

  const [add, setAdd] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    gender: "",
    position: "",
    department: "",
    doj: "",
    address: "",

  });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setAdd((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    });
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/add", add);

      if (response.data.success) {
        toast.success(response.data.message, {
          autoClose: 1500,
        });

        setTimeout(() => {
          navigate("/employees");
        }, 1500);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went wrong",
        {
          autoClose: 1500,
        }
      );
    }
  };

  return (
    <>
      <div>
        <div className="d-flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="content">
            <div className="form-container">
              <h2>Add Employee</h2>
              <form method="post" onSubmit={handleSubmit} action="/save_employee">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="name"
                    value={add.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={add.email}
                    onChange={handleInputChange}
                    id="email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={add.phone}
                    onChange={handleInputChange}
                    id="phone"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={add.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={add.dob}
                    onChange={handleInputChange}
                    name="dob"
                    id="dob"
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <br />

                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={add.gender === "Male"}
                    onChange={handleInputChange}
                    id="male"
                  />
                  <label htmlFor="male"> Male </label>

                  &nbsp;&nbsp;

                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={add.gender === "Female"}
                    onChange={handleInputChange}
                    id="female"
                  />
                  <label htmlFor="female"> Female </label>

                  &nbsp;&nbsp;

                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={add.gender === "Other"}
                    onChange={handleInputChange}
                    id="other"
                  />
                  <label htmlFor="other"> Other </label>
                </div>

                <div className="form-group">
                  <label htmlFor="position">Position</label>
                  <input
                    type="text"
                    className="form-control"
                    value={add.position}
                    onChange={handleInputChange}
                    name="position"
                    id="position"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <select
                    className="form-control"
                    value={add.department}
                    onChange={handleInputChange}
                    name="department"
                    id="department"
                  >
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="Development">Development</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="doj">Joining Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="doj"
                    value={add.doj}
                    onChange={handleInputChange}
                    id="doj"
                  />
                </div>



                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    id="address"
                    value={add.address}
                    onChange={handleInputChange}
                    rows="3"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Add Employee
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Add;
