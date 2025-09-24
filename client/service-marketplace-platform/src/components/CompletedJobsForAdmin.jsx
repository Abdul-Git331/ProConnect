import { useState, useEffect } from "react";
import { fetchCompletedJobs } from "../service/adminService";
import { data } from "react-router";

const CompletedJobsForAdmin = () => {
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCompletedJobs();
      if (response?.success) {
        setJobList(response.data);
      }
    };
    fetchData();
  }, []);

  const filteredJobList = jobList.filter((job) =>
    job?.razorpay_order_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  job?.workerId.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">✅ Completed Jobs by Service Providers</h3>

      <div className="mb-4 d-flex justify-content-center">
        <input
          type="search"
          className="form-control w-50"
          placeholder="Search by Razorpay Order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredJobList.length > 0 ? (
          filteredJobList.map((job, index) => (
            <div className="col-12 mb-4" key={index}>
              <div
                className="card border-0 shadow-lg p-3 transition"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setExpandedCard(expandedCard === index ? null : index)
                }
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{job?.jobId?.title || "Job"}</h5>
                    <p className="text-muted mb-0">
                      Worker: {job?.workerId?.name} | Order:{" "}
                      {job?.razorpay_order_id}
                    </p>
                  </div>
                  <span
                    className={`badge ${
                      job?.paymentStatus === "done"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                  >
                    {job?.paymentStatus}
                  </span>
                </div>

                {/* Expand/Collapse Section */}
                {expandedCard === index && (
                  <div className="mt-3">
                    <hr />
                    <h6 className="text-primary">Worker Details</h6>
                    <p><strong>Name:</strong> {job?.workerId?.name}</p>
                    <p><strong>Contact:</strong> {job?.workerId?.contact}</p>
                    <p>
                      <strong>Location:</strong>{" "}
                      {job?.workerId?.city || "N/A"},{" "}
                      {job?.workerId?.state || "N/A"}
                    </p>

                    <hr />
                    <p><strong>Hired By:</strong> {job?.userId?.name || "N/A"}</p>
                    <p><strong>Hired At:</strong> {new Date(job?.date).toLocaleDateString() || "N/A"}</p>
                    <hr />
                    <h6 className="text-primary mt-3">Job Details</h6>
                    <p><strong>Title:</strong> {job?.jobId?.title || "N/A"}</p>
                    <p><strong>Cost:</strong> ₹{job?.jobId?.cost || "N/A"}</p>
                    <p><strong>Customer Name:</strong> {job?.name}</p>
                    <p><strong>Contact:</strong> {job?.contact}</p>
                    <p><strong>Address:</strong> {job?.address}</p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {job?.date
                        ? new Date(job.date).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p><strong>Time:</strong> {job?.time}</p>
                    <p><strong>Order ID:</strong> {job?.razorpay_order_id}</p>
                    <hr />

                    <strong>Rating:</strong> {job?.rating || "N/A"}                    <br />
                    <strong>Review:</strong> {job?.review || "N/A"} 
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No completed jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default CompletedJobsForAdmin;
