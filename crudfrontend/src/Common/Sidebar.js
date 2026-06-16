import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${sidebarActive ? "active" : ""}`}>
        <h4>Employee Hub</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              📄 View Employees
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              ➕ Add Employee
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/manage" className="nav-link">
              ⚙️ Manage Employees
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
