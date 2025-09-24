import { useState, useEffect } from "react";
import { fetchUnverifiedJobs, rejectJob, verifyUnverifiedJob } from "../service/adminService";

const VerifyUnverifiedJobs = () => {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUnverifiedJobs();
      if (response.success) {
        setJobList(response.data); 
      }
    };
    fetchData();
  }, []);

  const handleVerify = async(id) =>{
    const response = await verifyUnverifiedJob(id);
    console.log(response)
  }

    const handleReject = async(id) =>{
    const response = await rejectJob(id);
    console.log(response)
  }

  return (
    <div className="container my-4">
      <h3 className="text-center fw-bold text-primary mb-4">
        Unverified Jobs
      </h3>

      {jobList.length > 0 ? (
        <div className="row">
          {jobList.map((job, index) => (
            <div key={index} className="col-12 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  {/* Job Details */}
                  <h5 className="card-title text-primary mb-3">
                    {job?.title || "Untitled Job"}
                  </h5>
                  <p className="mb-2">
                    <strong>Cost:</strong> ₹{job?.cost ?? "N/A"}
                  </p>
                  <p className="mb-2 text-muted">
                    <strong>Description:</strong>{" "}
                    {job?.description || "No description provided"}
                  </p>

                  <hr />

                  {/* Worker Details */}
                  <h6 className="text-success mb-3">Worker Details</h6>
                  <p className="mb-1">
                    <strong>Name:</strong> {job?.workerId?.name || "N/A"}
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong> {job?.workerId?.email || "N/A"}
                  </p>
                  <p className="mb-1">
                    <strong>Contact:</strong>{" "}
                    {job?.workerId?.contact || "Not provided"}
                  </p>
                  <p className="mb-0">
                    <strong>Address:</strong>{" "}
                    {`${job?.workerId?.streetAddress || ""}, ${
                      job?.workerId?.city || ""
                    }, ${job?.workerId?.state || ""}`}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="card-footer bg-light d-flex justify-content-end">
                  <button className="btn btn-sm btn-success me-2" onClick={() => handleVerify(job._id)}>
                    ✅ Verify
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleReject(job._id)}>
                    ❌ Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No unverified jobs found.</p>
      )}
    </div>
  );
};

export default VerifyUnverifiedJobs;
