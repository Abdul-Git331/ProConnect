import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdmin } from "../service/adminService";

const CreateAdmin = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [secret, setSecret] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = createAdmin(
      email,
      name,
      password,
      contact,
      secret,
    );
    console.log("Client",response)
    response.then((a) => {
      if (a.success) {
        navigate("/admin-login");
      } else {
        alert(a.msg);
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="card shadow-sm p-3 rounded-3">
            <h5 className="text-center mb-3">User Registration</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="email" className="form-label small">
                  Enter your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-sm"
                  placeholder="example@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="name" className="form-label small">
                  Enter your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control form-control-sm"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="password" className="form-label small">
                  Create Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-sm"
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="contact" className="form-label small">
                  Enter mobile number
                </label>
                <input
                  type="number"
                  id="contact"
                  name="contact"
                  className="form-control form-control-sm"
                  placeholder="9876543210"
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="secret" className="form-label small">
                  Enter your Location
                </label>
                <textarea
                  id="secret"
                  name="address"
                  rows="2"
                  className="form-control form-control-sm"
                  placeholder="City, State"
                  onChange={(e) => setSecret(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="d-grid mt-2">
                <button type="submit" className="btn btn-primary btn-sm">
                  Register
                </button>
              </div>

              <div className="text-center mt-2">
                <small>
                  Already have an account?{" "}
                  <a href="/admin-login" className="text-decoration-none">
                    Login
                  </a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;

