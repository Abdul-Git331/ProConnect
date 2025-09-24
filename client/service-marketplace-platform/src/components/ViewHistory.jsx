import { useState, useEffect } from "react";
import { viewHistory } from "../service/userServices";

const ViewHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchterm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await viewHistory();
      if (response.success) {
        setHistoryData(response.data);
      }
    };
    fetchData();
  }, []);

  const filteredData = historyData.filter((data) => {
    const term = searchTerm.toLowerCase();
    return (
      data?.jobId?.title?.toLowerCase().includes(term) ||
      data?.workerId?.name?.toLowerCase().includes(term) ||
      data?.workerId?.email?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container my-4">
      {/* Heading */}
      <div className="text-center my-5">
        <h3 className="fw-bold text-primary">Your Services & History</h3>
      </div>

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="search"
          className="form-control"
          placeholder="Search by job title, worker name, or email"
          value={searchTerm}
          onChange={(e) => setSearchterm(e.target.value)}
        />
      </div>

      {/* History Cards */}
      {filteredData.length > 0 ? (
        filteredData.map((data, index) => (
          <div key={index} className="row justify-content-center " style={{marginBottom: "6vh"}}>
            <div className="col-lg-10">
              <div className="card shadow-sm border-0 rounded-3 hover-shadow">
                <div className="card-body p-4">
                  {/* Job Info */}
                  <h5 className="text-primary mb-3">
                    {data?.jobId?.title || "N/A"}
                  </h5>
                  <p className="mb-2">
                    <strong>Cost:</strong> ₹{data?.jobId?.cost ?? "N/A"}
                  </p>
                  <p className="mb-2 text-muted">
                    <strong>Hired At:</strong>{" "}
                    {data?.hiredAt
                      ? new Date(data.hiredAt).toLocaleString()
                      : "N/A"}
                  </p>

                  <hr />

                  {/* Worker Info */}
                  <h6 className="text-success">Worker Details</h6>
                  <p className="mb-1">
                    <strong>Name:</strong> {data?.workerId?.name || "N/A"}
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong> {data?.workerId?.email || "N/A"}
                  </p>
                  <p className="mb-1">
                    <strong>Contact:</strong> {data?.workerId?.contact || "N/A"}
                  </p>
                  <p className="mb-3">
                    <strong>Address:</strong>{" "}
                    {`${data?.workerId?.streetAddress || ""}, ${
                      data?.workerId?.city || ""
                    }, ${data?.workerId?.state || ""}`}
                  </p>

                  <hr />

                  {/* Service Info */}
                  <h6 className="text-info">Service Details</h6>
                  <p className="mb-1">
                    <strong>Service At:</strong>{" "}
                    {data?.date
                      ? new Date(data.date).toLocaleDateString()
                      : "N/A"}{" "}
                    {data?.time}
                  </p>
                  <p className="mb-2">
                    <strong>Service Address:</strong> {data?.address}
                  </p>
                  <p className="mb-2">
                    <strong>Order ID:</strong> {data?.razorpay_order_id}
                  </p>

                  <hr />

                  {/* Feedback */}
                  <h6 className="text-warning">Feedback</h6>
                  <p className="mb-1">
                    <strong>Rating:</strong> {data?.rating || "N/A"}
                  </p>
                  <p className="mb-0">
                    <strong>Review:</strong>{" "}
                    {data?.review ? data.review : "No review provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted text-center">No results found.</p>
      )}
    </div>
  );
};

export default ViewHistory;
