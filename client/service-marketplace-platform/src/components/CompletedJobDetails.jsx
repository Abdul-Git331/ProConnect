import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchCompletedJobsData } from "../service/workerServices";

const CompletedJobDetails = () => {
  const [jobData, setJobData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { workerId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCompletedJobsData();
      if (response.success) {
        setJobData(response.data);
      }
      console.log(response);
    };
    fetchData();
  }, []);

  // Filtered jobs based on search term
  const filteredJobs = jobData.filter((job) => {
    const search = searchTerm.toLowerCase();
    return (
      job?.jobId?.title?.toLowerCase().includes(search) ||
      job?.userId?.name?.toLowerCase().includes(search) ||
      job?.contact?.toLowerCase().includes(search) ||
      job?.razorpay_order_id.toLowerCase().includes(search)
    );
  });

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-success">Your Completed Jobs</h2>
        <p className="text-muted">
          Here are all the jobs you have completed successfully.
        </p>
      </div>

      {/* Search Box */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input
            type="search"
            className="form-control"
            placeholder="Search by job title, client name, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Jobs List */}
      <div className="row">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="col-12 mb-4">
              <div className="card shadow border-0 w-100">
                <div className="card-body d-flex flex-column flex-md-row align-items-start justify-content-between">
                  {/* Left Section: Job Info */}
                  <div>
                    <h5 className="card-title fw-bold text-primary">
                      {job?.jobId?.title || "Untitled Job"}
                    </h5>
                    <h6 className="card-subtitle mb-3 text-muted">
                      ₹{job?.jobId?.cost || "N/A"}
                    </h6>

                    <ul className="list-unstyled small mb-0">
                      <li>
                        <strong>Hired By:</strong> {job?.userId?.name || "N/A"}
                      </li>
                        <li>
                        <strong>Hired At:</strong>{" "}
                        {job?.hiredAt
                          ? new Date(job.hiredAt).toLocaleString()
                          : "N/A"}
                      </li>
                      <hr />
                      <li>
                        <strong>Name:</strong> {job?.name || "N/A"}
                      </li>
                      <li>
                        <strong>Contact:</strong> {job?.contact || "N/A"}
                      </li>
                      <li>
                        <strong>Address:</strong> {job?.address || "N/A"}
                      </li>
                       <li>
                        <strong>Date:</strong> {new Date(job?.date).toLocaleDateString() || "N/A"}
                      </li>
                       <li>
                        <strong>Time:</strong> {job?.time || "N/A"}
                      </li>
                       <li>
                        <strong>Order ID:</strong> {job?.razorpay_order_id || "N/A"}
                      </li>
                      <hr />
                       <li>
                        <strong>Rating:</strong> {job?.rating|| "No rated"}
                      </li>
                       <li>
                        <strong>Review:</strong> {job?.review|| "No review yet"}
                      </li>
                    </ul>
                  </div>

                  {/* Right Section: Status */}
                  <div className="text-md-end mt-3 mt-md-0">
                    <span className="badge bg-success fs-6 px-3 py-2">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">No jobs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedJobDetails;
