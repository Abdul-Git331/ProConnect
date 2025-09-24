
//Worker only login when he is verified 

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { workerLogin } from "../service/workerServices"; 
import logo from "../assets/logo.png"

export default function WorkerLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
    const [toastActive, setToastActive] = useState(false);
  const [toastContent, setToastContent] = useState("");

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    if (!form.password.trim()) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await workerLogin(form);
      if (response.success === true) {
        console.log("client login",response)
        navigate("/worker-landing-page"); 
      } else {
        setToastActive(true)
        setToastContent(response.msg)
      }
    } catch (err) {
        console.log(err)
    }
  };

  return (
    <div>

    <div className="container" style={{marginTop: "28vh"}}>
            {toastActive && (
        <div
          className="toast align-items-center  show position-fixed top-0 end-0 m-3"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toastContent}</div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              onClick={() => setToastActive(false)}
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4 shadow-sm">
            <img src={logo} alt="ProConnect" style={{width: "17%", height: "17%", marginLeft: "42%"}} />
            <h4 className="mb-3 text-center">Worker Login</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
                {errors.email && (
                  <div className="text-danger small">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                />
                {errors.password && (
                  <div className="text-danger small">{errors.password}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>

            <div className="mt-3 text-center">
              <span>Don't have an account? </span>
              <button
                className="btn btn-link p-0"
                onClick={() => navigate("/register-job")}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
}
