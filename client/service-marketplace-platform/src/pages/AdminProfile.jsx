import { useState, useEffect } from "react";
import VerifyWorker from "../components/VerifyWorker";
import TotalWorker from "../components/TotalWorker";
import { logOut } from "../service/adminService";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";
import CompletedJobsForAdmin from "../components/CompletedJobsForAdmin";
import CancelledJobsDetails from "../components/CancelledJobsDetails";
import VerifyUnverifiedJobs from "../components/VerifyUnverifiedJobs";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(
    () => localStorage.getItem("activeItem") || "verifyWorker"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { key: "verifyWorker", label: "Verify Worker" },
    { key: "totalWorker", label: "Total Worker" },
    { key: "completedJobs", label: "Completed Jobs" },
    { key: "cancelledJobs", label: "Cancelled Jobs" },
    { key: "verifyJobs", label: "Verify Jobs" },
  ];

  useEffect(() => {
    localStorage.setItem("activeItem", activeItem);
  }, [activeItem]);

  const handleLogOut = async () => {
    const response = await logOut();
    navigate("/admin-login");
    console.log(response);
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      {/* Top Navbar (Mobile Only) */}
      <div className="d-md-none d-flex align-items-center bg-light shadow-sm px-3 py-2 position-fixed top-0 start-0 w-100 z-3">
        <button
          className="btn btn-light border-0"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <div className="d-flex align-items-center gap-2 px-4">
          <img src={logo} alt="ProConnect" style={{ height: "32px" }} />
          <span className="fw-bold fs-5">ProConnect</span>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary position-fixed"
        style={{
          width: "250px",
          height: "100vh", 
          top: 0,
          left: 0,
          transition: "transform 0.3s ease-in-out",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          zIndex: 2000, 
        }}
      >
        {/* Logo for desktop sidebar */}
        <div className="d-flex align-items-center mb-md-0 me-md-auto fw-bold text-decoration-none d-none d-md-flex">
          <img
            src={logo}
            alt="logo"
            style={{ height: "32px", marginRight: "8px" }}
          />
          ProConnect
        </div>
        <hr className="d-none d-md-block" />

        <ul className="nav nav-pills flex-column mb-auto">
          {menuItems.map((item) => (
            <li key={item.key} className="nav-item">
              <button
                className={`nav-link w-100 text-start ${
                  activeItem === item.key ? "active" : ""
                }`}
                style={{
                  color: activeItem === item.key ? "white" : "black",
                  fontWeight: "600",
                }}
                onClick={() => {
                  setActiveItem(item.key);
                  setSidebarOpen(false);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <hr />

        {/* Admin Profile Dropdown */}
        <div className="dropdown mt-auto">
          <button
            className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle border-0 bg-transparent"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src=""
              alt="admin"
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>Admin</strong>
          </button>
          <ul className="dropdown-menu text-small shadow">
            <li>
              <button className="dropdown-item">Settings</button>
            </li>
            <li>
              <button className="dropdown-item">Profile</button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="content flex-grow-1"
        style={{
          marginLeft: "0",
          marginTop: "60px",
          padding: "1rem",
        }}
      >
        {activeItem === "verifyWorker" && <VerifyWorker />}
        {activeItem === "totalWorker" && <TotalWorker />}
        {activeItem === "completedJobs" && <CompletedJobsForAdmin />}
        {activeItem === "cancelledJobs" && <CancelledJobsDetails />}
         {activeItem === "verifyJobs" && <VerifyUnverifiedJobs/>}
      </div>

      <style>
        {`
          @media (min-width: 768px) {
            .bg-body-tertiary {
              transform: translateX(0) !important; 
              position: fixed !important;        
              top: 0;
              left: 0;
            }
            .content {
              margin-left: 250px !important;      
              margin-top: 0 !important;          
            }
          }

          @media (max-width: 767px) {
            .content {
              margin-left: 0 !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AdminProfile;
