import '../index.css';
import Sidebar from "../Common/Sidebar";
import { useEffect, useState } from 'react';
import API from '../service/api';

function EmpList() {

  const [emp,setEmp] = useState([]);

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        
        const response = await API.get("/employees");

        setEmp(response.data.employees);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  },[]);

  return (
    <div>
      <div className="wrapper">
        {/* Sidebar */}
        <Sidebar/>
        {/* Main Content */}
       <div className="content">
  <h2 className="mb-4">All Employees</h2>

  {
    emp.map((item) => (
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
          </p>
        </div>
      </div>
    ))
  }

</div>
      </div>
    </div>
  );
}

export default EmpList;
