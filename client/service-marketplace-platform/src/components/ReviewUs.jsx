import React, { useState } from "react";
import { reviewUs } from "../service/userServices";
import logo from "../assets/logo.png"

const ReviewUs = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const words = comment.trim().split(/\s+/).length;

    if (words > 60) {
      setError("Your review must not exceed 60 words.");
      return;
    }

    setError("");

    const data = { 
      comment,
       rating };
    const response = await reviewUs(data);

    if (response?.success) {
      setComment("");
      setRating("");
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container" style={{marginBottom: "15%" , marginTop: "6%", width: "80vw"}}>
      <div className="card shadow-lg p-4 border-0 rounded-4">
          <img src={logo} style={{height: "12%" , width: "12%" , marginLeft: "40%" }} alt="ProConnect" />
        <h2 className="text-center mb-3 fw-bold text-primary">
          Share Your Experience
        </h2>
        <p className="text-center text-muted mb-4">
          Your feedback helps us improve our marketplace and provide better
          services for everyone.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Review Text */}
          <div className="mb-3">
            <label className="form-label fw-bold">Your Review</label>
            <textarea
              className="form-control rounded-3 shadow-sm"
              rows="5"
              placeholder="Tell us about your experience with our platform..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
            {error && <small className="text-danger">{error}</small>}
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="form-label fw-bold">Your Rating</label>
            <div className="d-flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.8rem",
                    color: star <= rating ? "#ffc107" : "#e4e5e9",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="alert alert-danger mt-2">{error}</div>}

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary rounded-3">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewUs;
