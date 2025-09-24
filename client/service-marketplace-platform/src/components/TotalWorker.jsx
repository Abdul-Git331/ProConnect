import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { fetchVerifiedAndSelectedWorker } from "../service/workerServices";

const TotalWorker = () => {
  const [workerData, setWorkerData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVerifiedWorkerData = async () => {
      const response = await fetchVerifiedAndSelectedWorker();
      console.log("dcdc", response);

      if (response.success) {
        setWorkerData(response.data);
      }
    };
    fetchVerifiedWorkerData();
  }, []);

  const filteredWorkers = workerData.filter((worker) => {
    if (!searchTerm) return true; // show all if no search
    return worker.skills?.some((skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handlAppointJob = async(id) => {
    navigate(`/create-job?id=${id}`)
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Verified Workers</h2>

      {/* Search Field */}
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by skill (e.g. plumbing, electrician)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredWorkers.length > 0 ? (
          filteredWorkers.map((worker) => (
            <div key={worker._id} className="col-md-12 mb-4">
              <div className="card shadow-sm h-100">
                <div className="row g-0 align-items-center">
                  {/* Profile Photo */}
                  <div className="col-md-3">
                    <img
                      src={
                        worker.profilePhoto || "https://via.placeholder.com/150"
                      }
                      className="img-fluid rounded-start w-100 h-100"
                      alt={worker.name}
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* Worker Details */}
                  <div className="col-md-9">
                    <div className="card-body">
                      <h5 className="card-title">{worker.name}</h5>
                      <p className="card-text mb-1">
                        <strong>Email:</strong> {worker.email}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Profession:</strong>{" "}
                        {worker.profession || "N/A"}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Experience:</strong>{" "}
                        {worker.experience || "Not provided"} years
                      </p>
                      <p className="card-text mb-1">
                        <strong>Address:</strong>{" "}
                        {worker.address || "Not provided"}
                      </p>
                      <p className="card-text">
                        <strong>Skills:</strong>{" "}
                        {worker.skills && worker.skills.length > 0
                          ? worker.skills.join(", ")
                          : "No skills listed"}
                      </p>
                    </div>
                    <div className="card-footer bg-white border-0 d-flex justify-content-end gap-2">
                      <button className="btn btn-success btn-sm" onClick={() => handlAppointJob(worker._id)}>
                        Appoint Job
                      </button>
                      <button className="btn btn-danger btn-sm">
                        Remove Worker
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No workers match your search</p>
        )}
      </div>
    </div>
  );
};

export default TotalWorker;
