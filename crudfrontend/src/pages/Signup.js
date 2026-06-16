import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../service/api";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/signup", formData);
      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup Failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100">
            Signup
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;