import { useState } from "react";
import { userLogin } from "../service/userServices";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastActive, setToastActive] = useState(false);
  const [toastContent, setToastContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = userLogin(email, password);
    console.log("Client", response);
    response
      .then((a) => {
        if (a.success == true) {
          navigate("/user-landing-page");
        } else {
          setToastActive(true);
          setToastContent(a.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {toastActive && (
        <div
          className="toast align-items-center  show position-fixed top-0 end-4 m-3"
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

      <div className="card shadow-sm p-3 rounded-3 " style={{ width: "320px" }}>
        <img
          src={logo}
          style={{ height: "20%", width: "20%", marginLeft: "40%" }}
          alt="ProConnect"
        />
        <h5 className="text-center mb-3">Login</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="email"
              name="email"
              className="form-control form-control-sm"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <input
              type="password"
              name="password"
              className="form-control form-control-sm"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-sm">
              Login
            </button>
          </div>

          <div className="text-center mt-2">
            <a href="/forgot-password" className="small text-decoration-none">
              Forgot Password?
            </a>
            <br />
            <a href="/user-registration" className="small text-decoration-none">
              Already have an account: Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
