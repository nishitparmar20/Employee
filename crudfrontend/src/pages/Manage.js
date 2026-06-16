import "../manage.css";
import Sidebar from "../Common/Sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../service/api";

function Manage() {
  const [emp, setEmp] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/employees");

        setEmp(response.data.employees);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/deleteemployee/${id}`);

      setEmp(emp.filter((item) => item._id !== id));

      alert("Employee deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <>
      <div>
        <div className="wrapper">
          <Sidebar />

          <div className="content">
            <h2 className="mb-4">Manage Employees</h2>

            {emp.map((item) => (
              <div className="card mb-3" key={item._id}>
                <div className="card-body">
                  <h5 className="card-title">
                    {item.username}
                  </h5>

                  <p className="card-text">
                    Email: {item.email}
                    <br />
                    Phone: {item.phone}
                    <br />
                    Position: {item.position}
                    <br />
                    Department: {item.department}
                  </p>
                </div>

                <div className="action-buttons p-3">
                  <Link
                    to={`/edit/${item._id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Manage;