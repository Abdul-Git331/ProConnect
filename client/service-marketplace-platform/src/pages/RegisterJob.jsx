import { useNavigate } from "react-router";
import logo from "../assets/logo.png";

const RegisterJob = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <header className="shadow-sm">
        <nav className="navbar navbar-expand-lg navbar-light bg-white px-3">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/">
            <img
              src={logo}
              alt="ProConnect Logo"
              style={{ height: "40px", width: "40px", objectFit: "contain" }}
            />
            <span className="fw-bold text-primary">ProConnect</span>
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">
          Register as a Service Provider
        </h1>
        <div className="col-lg-8 mx-auto">
          <p className="lead mb-4">
            “Join our growing network of trusted service providers. Create your
            profile, list your services, and start connecting with customers who
            need your skills. Whether you are a plumber, electrician,
            beautician, or home cleaner – we make it easy for you to find jobs
            and grow your business.”
          </p>
        </div>
      </div>

      {/* Buttons (moved here) */}
      <div className="text-center mb-5">
        <button
          type="button"
          className="btn btn-primary btn-lg px-4 gap-3"
          onClick={() => navigate("/job-form")}
        >
          Register
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary btn-lg px-4 ms-3"
          onClick={() => navigate("/worker-login")}
        >
          Login
        </button>
      </div>

      {/* Process Section */}
      <div className="container my-5">
        <h3 className="fw-bold text-center" style={{ marginBottom: "6%", marginTop: "9%" }}>
          How We Select Service Providers
        </h3>
        <div className="row g-4">
          {/* Step 1 */}
          <div className="col-md-3">
            <div className="card shadow-sm border-0 h-100 p-3 text-center step-card">
              <div className="step-circle mx-auto mb-3">1</div>
              <h5 className="fw-bold">Register Yourself</h5>
              <p className="text-muted small">
                Fill out the registration form with correct details. Fake or
                incomplete information will lead to rejection.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-md-3">
            <div className="card shadow-sm border-0 h-100 p-3 text-center step-card">
              <div className="step-circle mx-auto mb-3">2</div>
              <h5 className="fw-bold">Online Interview</h5>
              <p className="text-muted small">
                Our team will conduct a short online interview to check your
                skills and communication.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-md-3">
            <div className="card shadow-sm border-0 h-100 p-3 text-center step-card">
              <div className="step-circle mx-auto mb-3">3</div>
              <h5 className="fw-bold">Document Verification</h5>
              <p className="text-muted small">
                We verify your ID proof, certificates, and experience documents
                to ensure authenticity.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="col-md-3">
            <div className="card shadow-sm border-0 h-100 p-3 text-center step-card">
              <div className="step-circle mx-auto mb-3">4</div>
              <h5 className="fw-bold">Start Listing Jobs</h5>
              <p className="text-muted small">
                Once approved, you can list your services and start getting
                hired by customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles */}
      <style>
        {`
          .step-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .step-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 20px rgba(0,0,0,0.15);
          }
          .step-circle {
            width: 50px;
            height: 50px;
            background-color: #0d6efd;
            color: white;
            font-weight: bold;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          }
        `}
      </style>
    </div>
  );
};

export default RegisterJob;
