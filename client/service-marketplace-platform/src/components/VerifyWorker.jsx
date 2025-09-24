import { useEffect, useState } from "react";
import { fetchUnVerifiedWorker, rejectWorker, selectWorker, verifyWorker } from "../service/workerServices";

const VerifyWorker = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorker = async () => {
      const response = await fetchUnVerifiedWorker();
      if (response?.massage) {
        setWorkers(response.massage);
      }
    };
    fetchWorker();
  }, []);

  const handleVerify = async(id) => {
    const response = await verifyWorker(id);
    console.log("client",response)
    setWorkers((prev) =>
      prev.map((worker) =>
        worker._id === id ? { ...worker, status: "verified" } : worker
      )
    );
  };

  const handleReject = async(id) => {
    const response = await rejectWorker(id);
    console.log(response)
    setWorkers((prev) =>
      prev.map((worker) =>
        worker._id === id ? { ...worker, status: "rejected" } : worker
      )
    );
  };

  const handleSelect = async(id) => {
    const response = await selectWorker(id);
    console.log("client", response)
    setWorkers((prev) =>
      prev.map((worker) =>
        worker._id === id ? { ...worker, status: "selected" } : worker
      )
    );
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Pending Worker Verifications</h2>

      <div className="row g-4">
        {workers.map((worker) => (
          <div className="col-12" key={worker._id}>
            <div className="card shadow-sm h-100">
              <div className="row g-0 align-items-center">
                {/* Left side photo */}
                <div className="col-md-4 text-center p-3">
                  <img
                    src={worker.profilePhoto || "https://placehold.co/200x200"}
                    className="img-fluid rounded-circle shadow-sm"
                    alt={worker.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      border: "4px solid #17a2b8",
                    }}
                  />
                </div>

                {/* Right side details */}
                <div className="col-md-8">
                  <div className="card-body">
                    <h4 className="card-title text-primary fw-bold">
                      {worker.name}
                    </h4>
                    <p className="mb-1">
                      <strong>Email:</strong> {worker.email}
                    </p>
                    <p className="mb-1">
                      <strong>Profession:</strong> {worker.profession}
                    </p>
                    <p className="mb-1">
                      <strong>Rate:</strong> ₹{worker.hourlyRate}/hr
                    </p>
                    <p className="mb-2">
                      <strong>Experience:</strong> {worker.experience} years
                    </p>

                    {/* Buttons */}
                    <div className="d-flex flex-wrap gap-2">
                      { !worker.isVerified &&  <button
                        className={`btn ${
                          worker.status === "verified"
                            ? "btn-success"
                            : "btn-outline-success"
                        }`}
                        onClick={() => handleVerify(worker._id)}
                      >
                        {worker.status === "verified"
                          ? "Verified ✅"
                          : "Verify"}
                      </button>
                        }

                      { !worker.selected && <button
                        className={`btn ${
                          worker.status === "selected"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => handleSelect(worker._id)}
                      >
                        {worker.status === "selected"
                          ? "Selected ⭐"
                          : "Select"}
                      </button>

                     }
                      
                      <button
                         className={`btn ${
                          worker.status === "rejected"
                            ? "btn-danger"
                            : "btn-outline-danger"
                        }`}
                        onClick={() => handleReject(worker._id)}
                      >
                        {worker.status === "rejected"
                          ? "Rejected ❌"
                          : "Reject"}
                      </button>

 
                    </div>
                  </div>
                  <div className="card-footer text-muted small">
                    Registered:{" "}
                    {new Date(worker.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifyWorker;
