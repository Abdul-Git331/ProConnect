import { useState, useEffect } from "react";
import { editUserData, fetchUserProfileData } from "../service/userServices";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
    const [toastActive, setToastActive] = useState(false);
  const [toastContent, setToastContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchUserProfileData();
      if (response.success) {
        setUserData(response.data);
        setFormData(response.data); 
      }
    };
    fetchData();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async() => {
    const response = await editUserData(formData);
    console.log(response)
    if(response.success){
      setToastActive(true)
      setToastContent(response.massage)
    }
    setUserData(formData);
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
                      Hello, <strong>{userData.name?.toUpperCase()}</strong>
                    </h3>
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleEditProfile}
                    >
                      Edit Profile
                    </button>
                  </div>

                  <p className="text-muted">
                    Welcome to <strong>ProConnect</strong>, your trusted service
                    marketplace. Here you can connect with skilled workers,
                    explore services, and track your hiring history — all in one
                    place.
                  </p>

                  <hr />

                  <div className="mb-3">
                    <h5 className="mb-1">Address</h5>
                    <p className="text-dark">{userData.address || "Not provided"}</p>
                  </div>

                  <div className="mb-3">
                    <h5 className="mb-1">Contact</h5>
                    <p className="text-dark">{userData.contact || "Not available"}</p>
                  </div>

                  <div className="mb-3">
                    <h5 className="mb-1">Email</h5>
                    <p className="text-dark">{userData.email}</p>
                  </div>

                  <div className="mb-3">
                    <h5 className="mb-1">Joined</h5>
                    <p className="text-dark">
                      {userData.joinedAt
                        ? new Date(userData.joinedAt).toLocaleString()
                        : "Not available"}
                    </p>
                  </div>

                  <div className="alert alert-info mt-4">
                    Tip: Complete your profile to get better service
                    recommendations and build trust with workers.
                  </div>
                </>
              ) : (
                <>
                  {/* Edit Profile Form */}
                  <h3 className="text-primary mb-3">Edit Your Profile</h3>

                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      value={formData.address || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contact</label>
                    <input
                      type="text"
                      name="contact"
                      className="form-control"
                      value={formData.contact || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email || ""}
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

export default UserProfile;
