import { useEffect, useState } from "react";
import { cancelOrder, fetchTrackOrderdetails, markComplete, reviewWorker } from "../service/userServices";

const TrackOrder = () => {
  const [trackDetails, setTrackDetails] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [currentDetail, setCurrentDetail] = useState(null); 
  const [toastActive, setToastActive] = useState(false)
  const [toastContent, setToastContent] = useState("")

  useEffect(() => {
    const handleTrackOrder = async () => {
      const response = await fetchTrackOrderdetails();
      if (response.success) {
        setTrackDetails(response.data);
      }
    };
    handleTrackOrder();
  }, []);

useEffect(() => {
  
},[setCurrentDetail])

const handleMarkComplete = async (detail) => {
  const response = await markComplete(detail._id);
  console.log(response);

  if (!response.success) {
    setToastContent(response.message || "Job is not started by worker yet");
    setToastActive(true);
    setModalActive(false);
  } else {
    setCurrentDetail(detail);  
    setModalActive(true);
  }
};


const handleSubmitReview = async (e) => {
  e.preventDefault();

  const detials = {
    id: currentDetail._id,
    workerId: currentDetail.workerId._id,
    jobId: currentDetail.jobId._id,
    rating,
    comment,
  };

  const response = await reviewWorker(detials);

  if (response.success) {
    setTrackDetails(prevDetails =>
      prevDetails.filter(item => item._id !== currentDetail._id)
    );
    setToastContent("Review submitted successfully");
    setToastActive(true);
  } else {
    setToastContent("Failed to submit review");
    setToastActive(true);
  }

  setModalActive(false);
  setRating(5);
  setComment("");
};


const handleCancelOrder = async (id) => {
  const response = await cancelOrder(id);

  if (response.success) {
    setTrackDetails(prevDetails =>
      prevDetails.filter(item => item._id !== id)
    );
    setToastContent("Order cancelled successfully");
    setToastActive(true);
  } else {
    setToastContent(response.message || "Failed to cancel order");
    setToastActive(true);
  }
};


  return (
    <div>
     {/*Fix karna hai */}
    <div className="container" style={{minHeight: "100vh"}}>

{
  toastActive && (
    <div 
      className="toast align-items-center show position-fixed top-0 end-0 m-3 z-3"
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
      style={{ zIndex: 9999 }} 
    >
      <div className="d-flex">
        <div className="toast-body">
          {toastContent}
        </div>
        <button 
          type="button" 
          className="btn-close me-2 m-auto" 
          onClick={() => setToastActive(false)} 
          aria-label="Close"
        ></button>
      </div>
    </div>
  )
}


      <div className="mt-5 ">
          <h2 className="text-center" >📦 Track Your Orders</h2>
      </div>
      

      <div className="d-flex justify-content-center" style={{ marginTop: "10%" }}>
        <div className="card shadow-sm border-0" style={{ width: "80vw" }}>
          {trackDetails.length > 0 ? (
            trackDetails.map((detail, index) => (
              <div key={index} className="card-body border-bottom">
                <div className="row align-items-center">
                  {/* Left side details */}
                  <div className="col-md-8">
                    <h5 className="card-title text-primary">{detail.jobId.title}</h5>
                    <p className="card-text mb-2">
                      <strong>Cost:</strong> ₹{detail.jobId.cost}
                    </p>
                    <p className="card-text mb-2">
                      <strong>Hired At:</strong>{" "}
                      {new Date(detail.hiredAt).toLocaleString()}
                    </p>
                    <hr />
                    <h6 className="card-subtitle mb-2 text-muted">Worker Details</h6>
                    <p className="mb-1">
                      <strong>Name:</strong> {detail.workerId.name}
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong> {detail.workerId.email}
                    </p>
                       <p className="mb-1">
                      <strong>Contact:</strong> {detail.workerId.contact}
                    </p>
                    <p className="mb-1">
                      <strong>Address:</strong> {detail.workerId.streetAddress}, {detail.workerId.city}, {detail.workerId.state}
                    </p>
                     <hr />
                    <h6 className="card-subtitle mb-2 text-muted">Service Details</h6>
                    <p className="mb-1">
                      <strong>Address:</strong> {detail.address}
                    </p>
                    <p className="mb-1">
                      <strong>Date:</strong> {new Date(detail.date).toLocaleDateString()}
                    </p>
                    <p className="mb-1">
                      <strong>Time:</strong> {detail.time}
                    </p>
                    <p>
                       <strong>Order ID:</strong> {detail.razorpay_order_id}
                    </p>
                  </div>

                  <div className="col-md-4 d-flex justify-content-end gap-2">
                    <button className="btn btn-outline-primary"
                    onClick={() => handleCancelOrder(detail._id)}>Cancel Order</button>
                    <button
                      className="btn btn-success"
                      onClick={() => handleMarkComplete(detail)}
                    >
                      Mark as Done
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card-body text-center">
              <p className="text-muted">No orders found 🚚</p>
            </div>
          )}
        </div>
      </div>


      {modalActive && currentDetail && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0 rounded-3">
              <div className="modal-header">
                <h5 className="modal-title">⭐ Rate {currentDetail.workerId.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalActive(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmitReview}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Rating (1–5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="form-control"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Review</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Write your feedback..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setModalActive(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>

  );
};

export default TrackOrder;
