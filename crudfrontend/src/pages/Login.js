import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../service/api";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", loginData);

      toast.success("Login Successfull");

      setTimeout(() => {
        navigate("/employees");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleChange}
          />

          <button className="btn btn-success w-100">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;