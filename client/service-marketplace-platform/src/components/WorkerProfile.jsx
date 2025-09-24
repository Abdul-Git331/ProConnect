import { useEffect, useState } from "react";
import { editWorkerProfile, fetchWorkerProfile } from "../service/workerServices";

const WorkerProfile = () => {
  const [workerData, setWorkerData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
   const [toastActive, setToastActive] = useState(false);
  const [toastContent, setToastContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchWorkerProfile();
      if (response?.workerData) {
        setWorkerData(response.workerData);
        setFormData({
          email: response.workerData.email || "",
          city: response.workerData.city || "",
          state: response.workerData.state || "",
          streetAddress: response.workerData.streetAddress || "",
          contact: response.workerData.contact || "",
        });
      }
    };
    fetchData();
  }, []);

  const handleEditProfile = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {

    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );

    const response = await editWorkerProfile(filteredData);
    if (response.success) {
      setWorkerData((prev) => ({ ...prev, ...filteredData }));
      setToastActive(true)
      setToastContent(response.massage)
    }
    setIsEditing(false);
  };

  return (
    <div className="container my-5">
                  {toastActive && (
        <div
          className="toast align-items-center  show position-fixed top-0 end-0 m-3 z-3"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body text-success">{toastContent}</div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              onClick={() => setToastActive(false)}
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-3 p-4">
            <div className="card-body">
              {!isEditing ? (
                <>
                  {/* Profile View */}
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="text-primary mb-3">
                      Welcome, <strong>{workerData.name?.toUpperCase()}</strong>
                    </h3>
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleEditProfile}
                    >
                      Edit Profile
                    </button>
                  </div>

                  <p className="text-muted">
                    This is your professional profile on{" "}
                    <strong>ProConnect</strong>. Keep your details updated so
                    clients can reach you easily and build trust with your
                    services.
                  </p>

                  <hr />

                  <div className="text-center mb-4">
                    <img
                      src={
                        workerData?.profilePhoto ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Worker"
                      className="rounded-circle shadow-sm"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        border: "4px solid #17a2b8",
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <h5 className="mb-1">Profession</h5>
                    <p className="text-dark">
                      {workerData.profession || "Not specified"}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h5 className="mb-1">Email</h5>
                    <p className="text-dark">
                      {workerData.email || "Not available"}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h5 className="mb-1">Contact</h5>
                    <p className="text-dark">
                      {workerData.contact || "Not available"}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h5 className="mb-1">City</h5>
                    <p className="text-dark">
                      {workerData.city || "Not available"}
                    </p>
                  </div>

                                    <div className="mb-3">
                    <h5 className="mb-1">State</h5>
                    <p className="text-dark">
                      {workerData.state || "Not available"}
                    </p>
                  </div>

                                    <div className="mb-3">
                    <h5 className="mb-1">Street Address</h5>
                    <p className="text-dark">
                      {workerData.streetAddress || "Not available"}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h5 className="mb-1">Hourly Rate</h5>
                    <p className="text-dark">
                      {workerData.hourlyRate
                        ? `Rs ${workerData.hourlyRate}`
                        : "Not specified"}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h5 className="mb-1">Availability</h5>
                    <p className="text-dark">
                      {workerData.availability || "Not available"}
                    </p>
                  </div>

                  <div className="mb-3">
                    <h5 className="mb-1">Skills</h5>
                    <p className="text-dark">
                      {workerData.skills || "Not listed"}
                    </p>
                  </div>

                  <div className="alert alert-info mt-4">
                    Tip: Keeping your profile updated increases your chances of
                    getting hired.
                  </div>
                </>
              ) : (
                <>
                  {/* Edit Profile Form */}
                  <h3 className="text-primary mb-3">Edit Your Profile</h3>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contact</label>
                    <input
                      type="text"
                      name="contact"
                      className="form-control"
                      value={formData.contact}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                                    <div className="mb-3">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>

                                    <div className="mb-3">
                    <label className="form-label">Street Address</label>
                    <input
                      type="text"
                      name="streetAddress"
                      className="form-control"
                      value={formData.streetAddress}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex gap-2 mt-4">
                    <button className="btn btn-success" onClick={handleSave}>
                      Save
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
