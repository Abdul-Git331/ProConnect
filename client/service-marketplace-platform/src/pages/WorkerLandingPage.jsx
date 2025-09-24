import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteService,
  fetchAssignedJobData,
  fetchListedjobs,
  fetchWorkerProfile,
  logOut,
  markComplete,
  pauseServices,
  startjob,
  startServices,
} from "../service/workerServices";
import logo from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";

const WorkerLandingPage = () => {
  const [workerData, setWorkerData] = useState({});
  const [assignedjobsData, setAssignedJobsData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [listedJobs, setListedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchWorkerProfile();
      if (response.success) {
        setWorkerData(response.workerData);
      }
      if (response.workerData.pauseServices) {
        setIsPause(true);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAssignedJobData();
      console.log(response);
      if (response.success) {
        setAssignedJobsData(response.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchListedjobs();
      if (response.success) {
        setListedJobs(response.data);
      }
    };
    fetchData();
  }, []);

  //unique id of documents in hiredModel
  const handleComplete = async (id) => {
    const response = await markComplete(id);
  };

  const handleStart = async (id) => {
    const response = await startjob(id);
    if (response.success) {
    }
  };

  //This btn is to see the completed job by worker
  const handleCompleteJobBtn = async () => {
    navigate(`/completed-jobs-details/${workerData._id}`);
  };

  const handlePauseServices = async () => {
    const response = await pauseServices();
    if (response.success) {
      setIsPause(true);
    }
  };

  const handleStartServices = async () => {
    const response = await startServices();
    if (response.success) {
      setIsPause(false);
    }
  };

  const handleDeleteService = async (id) => {
    const response = await deleteService(id);

    if (response.success) {
      setListedJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } else {
      console.error("Failed to delete service:", response.message);
    }
  };

  const handleLogOut = async() => {
    const response = await logOut()
    navigate('/worker-login')
    console.log(response)
  }

  return (
    <div>
      <header className="navbar navbar-expand-lg bg-light shadow-sm px-4 py-3 top animate__animated animate__fadeInDown">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/">
            <img
              src={logo}
              alt="ProConnect Logo"
              style={{ height: "40px", width: "40px", objectFit: "contain" }}
            />
            <span className="fw-bold text-primary">ProConnect</span>
          </a>

          <div className="d-none d-lg-flex align-items-center">
            {isPause && (
              <span
                className="badge rounded-pill bg-danger me-3 px-3 py-2 shadow-sm animate__animated animate__fadeIn"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                }}
              >
                ⏸ Services Paused
              </span>
            )}

            <button
              className="btn btn-outline-primary me-2 transition-all hover-shadow"
              onClick={() => handleCompleteJobBtn()}
            >
              Completed Job
            </button>
            <button
              className="btn btn-outline-secondary me-3 transition-all hover-shadow"
              onClick={() => navigate("/list-job")}
            >
              List Service
            </button>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-outline-dark dropdown-toggle d-flex align-items-center"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <CgProfile size={22} className="me-1" />
                Account
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow animate__animated animate__fadeIn">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/worker-profile")}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item "
                    onClick={handlePauseServices}
                  >
                    Pause Services
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item "
                    onClick={handleStartServices}
                  >
                    Start Services
                  </button>
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogOut}>
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <button
            className="btn d-lg-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {menuOpen && (
          <div className="d-lg-none bg-light p-3 border-top animate__animated animate__fadeInDown">
            <button
              className="btn btn-outline-primary w-100 mb-2"
              onClick={() => handleCompleteJobBtn()}
            >
              Completed Jobs
            </button>
            <button
              className="btn btn-outline-secondary w-100 mb-2"
              onClick={() => navigate("/list-job")}
            >
              List Service
            </button>
            <div className="dropdown w-100">
              <button
                className="btn btn-outline-dark w-100 dropdown-toggle d-flex align-items-center justify-content-center"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <CgProfile size={22} className="me-1" />
                Account
              </button>
              <ul className="dropdown-menu shadow w-100">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/worker-profile")}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handlePauseServices}
                  >
                    Pause Services
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item "
                    onClick={handleStartServices}
                  >
                    Start Services
                  </button>
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogOut}>
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>

      <div style={{ backgroundColor: "#f4f9f9", padding: "5%",}}>
        <div className="d-flex justify-content-center flex-wrap gap-4 " style={{ marginBottom: "18vh" }}>
          <div className="stat-circle shadow-sm">
            <h2 className="stat-number text-primary">
              ₹ {workerData.totalEarning || 0}
            </h2>
            <p className="stat-title">Total Earnings</p>
          </div>

          <div className="stat-circle shadow-sm">
            <h2 className="stat-number text-success">
              {workerData.NumberOfCompletedJobs || 0}
            </h2>
            <p className="stat-title">Completed Jobs</p>
          </div>

          <div className="stat-circle shadow-sm">
            <h2 className="stat-number text-warning">
              {workerData.pendingJobs || 0}
            </h2>
            <p className="stat-title">Pending Jobs</p>
          </div>
        </div>

        {/* Assigned Jobs Section */}
        <div >
          <h3 className="fw-bold text-dark mb-4">Assigned Jobs</h3>
          <div className="row">
            {assignedjobsData.length > 0 ? (
              assignedjobsData.map((job, index) => (
                <div key={index} className="col-md-6 mb-4">
                  <div className="card shadow-sm p-3 hover-card">
                    {/* Job Title */}
                    <h5 className="fw-bold text-primary">
                      {job?.jobId?.title}
                    </h5>
                                        <h5 className="">
                     Rs {job?.jobId?.cost}
                    </h5>

                    {/* Job Info */}
                    <ul className="list-unstyled mt-2">
                      <li>
                         <strong>Hired By:</strong> {job?.userId?.name}
                      </li>
                                            <li>
                        <strong>Hired At:</strong>{" "}
                        {new Date(job?.hiredAt).toLocaleString()}
                      </li>
                      <hr />
                      <li>
                        <strong>Name:</strong> {job?.name}
                      </li>

                      <li>
                        <strong>Address:</strong> {job?.address}
                      </li>
                      <li>
                        <strong>Contact:</strong> {job?.contact}
                      </li>
                      <li>
                        <strong>Date of Service:</strong>{" "}
                        {new Date(job?.date).toLocaleDateString()}
                      </li>
                      <li>
                        <strong>Time of Service:</strong> {job?.time}
                      </li>
                      <hr />
                      <li>
                        <strong>Order ID:</strong> {job?.razorpay_order_id}
                      </li>
                    </ul>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-success"
                        onClick={() => handleComplete(job._id)}
                      >
                        Mark as Completed
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => handleStart(job._id)}
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted">No assigned jobs yet.</p>
            )}
          </div>
          </div>
          
           <div style={{marginTop: "18vh"}}>
            <h3 className="fw-bold text-dark mb-4">Your Services</h3>
            <div className="row">
              {listedJobs.length > 0 ? (
                listedJobs.map((job, index) => (
                  <div key={index} className="col-md-6 mb-4">
                    <div className="card shadow-sm p-3 hover-card-service">
                      <h5 className="fw-bold text-primary mb-3">
                        {job?.title}
                      </h5>
                      <p className="mb-1">
                        <strong>Description:</strong> {job?.description}
                      </p>
                      <p className="mb-4">
                        <strong>Cost:</strong> ₹{job?.cost}
                      </p>
                      <button
                        className="btn btn-danger btn-sm"
                        style={{ width: "30%" }}
                        onClick={() => handleDeleteService(job._id)}
                      >
                        Delete this service
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">
                  You have not listed any services yet.
                </p>
              )}
            </div>


        </div>

        {/* Styles */}
        <style>{`
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0px 8px 20px rgba(0,0,0,0.15);
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .stat-circle {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-circle:hover {
          transform: scale(1.05);
          box-shadow: 0px 8px 20px rgba(0,0,0,0.15);
        }
        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          margin: 0;
        }
        .stat-title {
          font-size: 1.2rem;
          margin: 0;
          color: #555;
          font-weight: 600;
        }
      `}</style>
      </div>
    </div>
  );
};

export default WorkerLandingPage;
