import React, { useEffect, useState } from "react";
import Sidebar from "../Common/Sidebar";
import API from "../service/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
const navigate = useNavigate();
const { id } = useParams();

const [edit, setEdit] = useState({
username: "",
email: "",
phone: "",
dob: "",
gender: "",
position: "",
department: "",
doj: "",
address: "",
});

const handleInputChange = (e) => {
const { name, value } = e.target;

setEdit((prev) => ({
  ...prev,
  [name]: value,
}));

};

useEffect(() => {
fetchEmployee();
}, []);

const fetchEmployee = async () => {
  try {
    const res = await API.put(`/edit/${id}`, edit);

    if (res.data.success) {
      const emp = res.data.employee;

      setEdit({
        username: emp.username || "",
        email: emp.email || "",
        phone: emp.phone || "",
        dob: emp.dob ? emp.dob.split("T")[0] : "",
        gender: emp.gender || "",
        position: emp.position || "",
        department: emp.department || "",
        doj: emp.doj ? emp.doj.split("T")[0] : "",
        address: emp.address || "",
      });
    }
  } catch (error) {
    console.log(error);

    toast.error("Failed to load employee");
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.put(`/edit/${id}`, edit);

    toast.success(res.data.message, {
      autoClose: 1500,
    });

    setTimeout(() => {
      navigate("/employees");
    }, 1500);
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message || "Update Failed"
    );
  }
};

return ( <div className="d-flex"> <Sidebar />

  <div className="content p-4 w-100">
    <div className="card shadow p-4">
      <h2 className="mb-4">Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={edit.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={edit.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={edit.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>DOB</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={edit.dob}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Gender</label>
          <br />

          <input
            type="radio"
            name="gender"
            value="Male"
            checked={edit.gender === "Male"}
            onChange={handleInputChange}
          />
          Male

          <input
            type="radio"
            name="gender"
            value="Female"
            checked={edit.gender === "Female"}
            onChange={handleInputChange}
            className="ms-3"
          />
          Female

          <input
            type="radio"
            name="gender"
            value="Other"
            checked={edit.gender === "Other"}
            onChange={handleInputChange}
            className="ms-3"
          />
          Other
        </div>

        <div className="mb-3">
          <label>Position</label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={edit.position}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Department</label>
          <select
            className="form-control"
            name="department"
            value={edit.department}
            onChange={handleInputChange}
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Development">Development</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <div className="mb-3">
          <label>DOJ</label>
          <input
            type="date"
            className="form-control"
            name="doj"
            value={edit.doj}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea
            className="form-control"
            rows="3"
            name="address"
            value={edit.address}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button className="btn btn-success">
          Update Employee
        </button>
      </form>
    </div>
  </div>
</div>

);
}

export default Edit;
