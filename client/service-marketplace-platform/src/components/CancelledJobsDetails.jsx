import { useState, useEffect } from "react";
import { fetchCancelledJobs } from "../service/adminService";

const CancelledJobsDetails = () => {
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCancelledJobs();
      if (response?.success) {
        setJobList(response.data);
      }
    };
    fetchData();
  }, []);

  const filteredJobList = jobList.filter(
    (job) =>
      job?.razorpay_order_id
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      job?.workerId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center text-danger">❌ Cancelled Jobs</h3>

      {/* Search Box */}
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="search"
          className="form-control w-50"
          placeholder="Search by Order ID, Worker, or User"
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
                {/* Card Header */}
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{job?.jobId?.title || "Job"}</h5>
                    <p className="text-muted mb-0">
                      Worker: {job?.workerId?.name || "N/A"} | Order:{" "}
                      {job?.razorpay_order_id}
                    </p>
                  </div>
                  <span className="badge bg-danger">Cancelled</span>
                </div>

                {/* Expandable Section */}
                {expandedCard === index && (
                  <div className="mt-3">
                    <hr />
                    <h6 className="text-primary">Worker Details</h6>
                    <p><strong>Name:</strong> {job?.workerId?.name || "N/A"}</p>
                    <p><strong>Contact:</strong> {job?.workerId?.contact || "N/A"}</p>
                    <p><strong>Email:</strong> {job?.workerId?.email || "N/A"}</p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {job?.workerId?.streetAddress}, {job?.workerId?.city},{" "}
                      {job?.workerId?.state}
                    </p>

                    <hr />
                    <h6 className="text-success">Hired By</h6>
                    <p><strong>User:</strong> {job?.userId?.name || "N/A"}</p>
                    <p>
                      <strong>Hired At:</strong>{" "}
                      {job?.hiredAt
                        ? new Date(job.hiredAt).toLocaleString()
                        : "N/A"}
                    </p>

                    <hr />
                    <h6 className="text-info">Service Details</h6>
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
                    <h6 className="text-danger">Cancellation</h6>
                    <p>
                      <strong>Cancelled On:</strong>{" "}
                      {job?.cancelOn
                        ? new Date(job.cancelOn).toLocaleString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Refund Status:</strong>{" "}
                      {job?.isRefund ? "Refunded ✅" : "Not Refunded ❌"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No cancelled jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default CancelledJobsDetails;
