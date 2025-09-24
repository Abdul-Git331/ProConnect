import { useState } from "react";
import { adminLogin } from "../service/adminService";
import {useNavigate} from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate();
    
  const [form, setForm] = useState({
    email: "",
    password: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await adminLogin(form);
             if(response.success === true){
       navigate('/admin-profile')
  }
    console.log("Client", response);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "28rem" }}>
        <h3 className="text-center text-primary mb-4">Admin Login</h3>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="******"
              required
            />
          </div>

        {/* Secret */}
          <div className="mb-3">
            <label htmlFor="secret" className="form-label fw-bold">
              address
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="bihar"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

