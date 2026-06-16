import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Employee Hub</h3>

      <ul>
        <li>
          <Link to="/employees">View Employees</Link>
        </li>

        <li>
          <Link to="/add">Add Employee</Link>
        </li>

        <li>
          <Link to="/manage">Manage Employees</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;