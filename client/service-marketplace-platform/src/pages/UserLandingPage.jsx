import logo from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import {
  fetchJobList,
  fetchMostHiredServiceProvider,
  fetchReviewDataUser,
  logOut,
  searchJobs,
} from "../service/userServices";
import { FaShieldAlt, FaTools, FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserLandingPage = () => {
  const [jobListData, setJobListData] = useState([]);
  const [mostHired, setMostHired] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
    const [reviewData, setReviewData] = useState([])
    const [searchTerm, setSearchTerm] = useState()
    const [openSearchContent, setOpenSearchContent] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobsList = async () => {
      const response = await fetchJobList();
      if (response.data) {
        setJobListData(response.data);
      }
    };
    fetchJobsList();
  }, []);

  useEffect(() => {
    const fetchJobsList = async () => {
      const response = await fetchMostHiredServiceProvider();
      if (response.data) {
        setMostHired(response.data);
      }
    };
    fetchJobsList();
  }, []);

  useEffect(() => {

  },[])

     useEffect(() =>{
        const fetchReview = async() =>{
          const response = await fetchReviewDataUser()
         if(response.success){
          setReviewData(response.data)
         }
        }
        fetchReview()
     },[])

  const handleProfile = () =>{

  }

const handleSearch = async () => {
  const result = await searchJobs(searchTerm);
  if (result.success) {
    setJobListData(result.data);
  }
};

const handleLogOut = async() => {
  const response = await logOut()
  navigate('/login')
  console.log(response)
}

  return (
    <div>
      
      {/* Header */}
      <header className="navbar navbar-expand-lg bg-light shadow-sm px-4 py-3 top animate__animated animate__fadeInDown">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo */}
         <a className="navbar-brand d-flex align-items-center gap-2" href="/">
                    <img
                      src={logo}
                      alt="ProConnect Logo"
                      style={{ height: "40px", width: "40px", objectFit: "contain" }}
                    />
                    <span className="fw-bold text-primary">ProConnect</span>
                  </a>

          {/* Desktop Menu */}
          <div className="d-none d-lg-flex align-items-center">
            <button className="btn btn-outline-primary me-2 transition-all hover-shadow" onClick={() => navigate('/track-order')}>
              Track Order
            </button>
            <button className="btn btn-outline-secondary me-3 transition-all hover-shadow" onClick={() => navigate('/view-history')}>
              View History
            </button>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-outline-dark dropdown-toggle d-flex align-items-center"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <CgProfile size={22} className="me-1" />
                Account
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow animate__animated animate__fadeIn">
                <li>
                  {/* when user click orofile in account button */}
                  <button className="dropdown-item" onClick={() => navigate('/user-profile-active')}>
                    Profile
                  </button>
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogOut}>
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="btn d-lg-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="d-lg-none bg-light p-3 border-top animate__animated animate__fadeInDown">
            <button className="btn btn-outline-primary w-100 mb-2" onClick={() => navigate('/track-order')}>
              Track Order
            </button>
            <button className="btn btn-outline-secondary w-100 mb-2" onClick={() => navigate('/view-history')}>
              View History
            </button>
            <div className="dropdown w-100">
              <button
                className="btn btn-outline-dark w-100 dropdown-toggle d-flex align-items-center justify-content-center"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <CgProfile size={22} className="me-1" />
                Account
              </button>
              <ul className="dropdown-menu shadow w-100">
                <li>
                   {/* when user click orofile in account button */}
                  <button className="dropdown-item" href="#" onClick={() => navigate('/user-profile-active')}>
                    Profile
                  </button>
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogOut}>
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>


      <main>

        <div
          className="container col-xxl-10 px-4 "
          style={{ marginTop: "7%", marginBottom: "8%" }}
        >
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6 animate__animated animate__fadeInRight">
              <img
                src="https://images.unsplash.com/photo-1676311396794-f14881e9daaa?w=1000&auto=format&fit=crop&q=60"
                className="d-block mx-lg-auto img-fluid rounded-4 shadow-lg"
                alt="Service Marketplace"
                width="700"
                height="500"
                loading="lazy"
                style={{ transition: "transform 0.4s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
            <div className="col-lg-6 animate__animated animate__fadeInLeft">
              <h1 className="display-5 fw-bold text-dark lh-1 mb-3">
                Hire Trusted Professionals Anytime, Anywhere
              </h1>
              <p className="lead text-secondary">
                ProConnect is your one-stop platform to connect with verified
                service providers. From home repairs to personal care, we bring
                skilled workers to your fingertips with secure payments and
                seamless hiring.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg px-4 transition-all hover-shadow"
                  onClick={() => navigate('/review-us')}
                >
                  Review us
                </button>
              </div>
            </div>
          </div>
        </div>

                <div  className="d-flex align-items-center justify-content-center" style={{marginBottom: "15vh" , marginLeft:  "3vw", marginRight: "3vw"}}>
          <form
  onSubmit={(e) => {
    e.preventDefault();
    handleSearch();
    navigate(`/search-jobs?searchTerm=${searchTerm}`);
  }}
  className="d-flex align-items-center ms-3" 
  style={{ maxWidth: "600px", width: "100%", }}
>
  <input
    type="search"
    value={searchTerm || ""}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search jobs..."
    className="form-control me-2 shadow-sm"
    style={{
      borderRadius: "30px",
      padding: "10px 15px",
      border: "1px solid #ced4da",
      fontSize: "0.95rem",
    }}
  />
  <button
    type="submit"
    className="btn btn-primary px-4 shadow-sm"
    style={{ borderRadius: "30px" }}
  >
    Search
  </button>
</form>
        </div>

        {/* Service Providers */}
        {jobListData.length > 0 && (
          <div
            className="container my-5 animate__animated animate__fadeInUp"
            style={{ marginTop: "10%" }}
          >
            <div style={{ marginBottom: "6%" }}>
              <h3 className="mb-4 fw-bold">Services provided by us</h3>
            </div>

            <div className="row">
              {jobListData.slice(0, 6).map((job, index) => (
                <div
                  className="col-md-4 mb-4 animate__animated animate__zoomIn"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  key={job._id}
                >
                  <div
                    className="card shadow-sm position-relative h-100 border-0 transition"
                    style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 20px rgba(0,0,0,0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(0,0,0,0.1)";
                    }}
                  >
                    {/* Job Image */}
                    <img
                      src={job.jobPicture}
                      className="card-img-top"
                      alt={job.title}
                      style={{ height: "220px", objectFit: "cover" }}
                    />

                    {/* Worker Photo */}
                    <div
                      className="position-absolute"
                      style={{ top: "30px", left: "30px" }}
                    >
                      <img
                        src={job.workerId.profilePhoto}
                        alt={job.workerId.name}
                        className="rounded-circle border border-4 border-light shadow"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          transition: "transform 0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.1)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    </div>

                    {/* Job Details */}
                    <div className="card-body mt-3">
                      <h5 className="card-title text-start fw-bold">
                        {job.title}
                      </h5>
                      <p className="card-text text-start text-muted">
                        {job.description}
                      </p>
                                             <p className="card-text text-start text-muted">
                      {job.workerId.streetAddress}  {job.workerId.city}, {job.workerId.state}
                      </p>
                      <p className="fw-bold text-success text-start">
                        Rs: {job.cost}
                      </p>
                    </div>

                    {/* Worker Info */}
                    <div className="p-3 border-top bg-light d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-1 fw-semibold">{job.workerId.name}</p>
                        <p className="text-muted small mb-0">
                          {job.workerId.experience} yrs experience
                        </p>
                      </div>
                      <button
                        className="btn btn-primary btn-sm transition-all"
                        onClick={() =>
                          navigate(`/hire-worker/${job._id}?cost=${job.cost}`)
                        }
                        style={{ transition: "transform 0.2s" }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        Hire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className="container"
          style={{ maxWidth: "1232px", marginTop: "15vh" }}
        >
          <div className="row text-center justify-content-center g-4">
            {/* Feature 1 */}
            <div className="col-12 col-sm-6 col-md-4">
              <div className="d-flex flex-column align-items-center p-4 shadow-sm rounded bg-white h-100">
                <FaShieldAlt size={40} className="text-primary mb-3" />
                <h5 className="fw-bold">3 Month Warranty</h5>
                <p className="text-muted small mb-0">
                  Enjoy peace of mind with a 90-day service warranty on all
                  jobs.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-12 col-sm-6 col-md-4">
              <div className="d-flex flex-column align-items-center p-4 shadow-sm rounded bg-white h-100">
                <FaTools size={40} className="text-success mb-3" />
                <h5 className="fw-bold">Expert Professionals</h5>
                <p className="text-muted small mb-0">
                  All service providers are verified and highly skilled.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-12 col-sm-6 col-md-4">
              <div className="d-flex flex-column align-items-center p-4 shadow-sm rounded bg-white h-100">
                <FaUserCheck size={40} className="text-warning mb-3" />
                <h5 className="fw-bold">Trusted by Customers</h5>
                <p className="text-muted small mb-0">
                  Thousands of satisfied customers rely on us every day.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Most Hired Workers Slider */}
{mostHired && mostHired.length > 0 && (
  <div className="container" style={{ marginTop: "15vh" }}>
    <div style={{ marginBottom: "6%" }}>
      <h3 className="fw-bold" style={{ marginBottom: "6%" }}>
        Most Hired Service Providers
      </h3>
    </div>

    <div className="position-relative">
      {/* Slider Buttons */}
      <button
        className="btn btn-light shadow position-absolute top-50 start-0 translate-middle-y z-3"
        style={{ borderRadius: "50%" }}
        onClick={() =>
          document
            .getElementById("slider")
            .scrollBy({ left: -300, behavior: "smooth" })
        }
      >
        ‹
      </button>
      <button
        className="btn btn-light shadow position-absolute top-50 end-0 translate-middle-y z-3"
        style={{ borderRadius: "50%" }}
        onClick={() =>
          document
            .getElementById("slider")
            .scrollBy({ left: 300, behavior: "smooth" })
        }
      >
        ›
      </button>

      {/* Slider Container */}
      <div
        id="slider"
        className="d-flex overflow-auto gap-4 pb-3"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {mostHired.slice(0, 9).map((worker, index) => (
          <div
            key={index}
            className="card shadow-sm p-4 flex-shrink-0 d-flex align-items-center"
            style={{
              width: "400px",
              height: "260px",
              scrollSnapAlign: "center",
              borderRadius: "15px",
              transition: "transform 0.3s, boxShadow 0.3s",
              flexDirection: "row",
              gap: "30px",
              overflow: "hidden",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 12px 22px rgba(0,0,0,0.25)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 8px rgba(0,0,0,0.1)";
            }}
          >
            {/* Left Side: Photo + Name */}
            <div className="d-flex flex-column align-items-center text-center flex-shrink-0">
              <img
                src={worker.profilePhoto}
                alt={worker.name}
                className="rounded-circle shadow"
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                }}
              />
              <h6 className="mt-2 fw-bold">{worker.name}</h6>
              <h6 className="mt-1 text-warning">⭐ {worker.avgRating}</h6>
            </div>

            {/* Right Side: Details + Hire Button */}
            <div
              className="text-start flex-grow-1 d-flex flex-column justify-content-between"
              style={{ height: "100%" }}
            >
              <div className="d-flex flex-column">
                              <p className="mb-2">
                  Skills: {Array.isArray(worker.skills)
                    ? worker.skills.join(", ")
                    : worker.skills}
                </p>

                <p className="text-secondary small mb-1">
                  Contact: {worker.contact}
                </p>
                <p className="text-secondary small mb-1">
                  Address: {worker.city}, {worker.state}
                </p>
                                <p className="text-secondary small mb-1">
                  {worker.experience} yrs exp.
                </p>
                <p className="fw-bold text-primary mb-1">
                  Jobs Done: {worker.jobId.length}
                </p>
              </div>
              <button
                className="btn btn-sm btn-primary mt-2"
                onClick={() => navigate(`/hire-worker/${worker._id}`)}
              >
                Hire
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}


        {/* Features Section */}
        <div className="container " style={{ marginTop: "15vh" }}>
          <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5">
            <div className="col d-flex flex-column align-items-start gap-3 animate__animated animate__fadeInLeft">
              <h2 className="fw-bold text-dark">Why Choose ProConnect?</h2>
              <p className="text-secondary">
                Our platform is designed to make hiring services as easy as
                ordering online. Here’s what makes us different:
              </p>
              <a
                href="#"
                className="btn btn-primary btn-lg transition-all hover-shadow"
              >
                Explore More
              </a>
            </div>
            <div className="col">
              <div className="row row-cols-1 row-cols-sm-2 g-4">
                {[
                  {
                    icon: "bi-shield-lock-fill",
                    title: "Verified Workers",
                    desc: "All service providers are background checked and verified.",
                  },
                  {
                    icon: "bi-cash-stack",
                    title: "Secure Payments",
                    desc: "Pay safely through our platform with complete protection.",
                  },
                  {
                    icon: "bi-geo-alt-fill",
                    title: "Real-time Tracking",
                    desc: "Track your hired worker’s location in real-time.",
                  },
                  {
                    icon: "bi-star-fill",
                    title: "Ratings & Reviews",
                    desc: "Choose the best workers based on reviews and ratings.",
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="col d-flex flex-column gap-2 animate__animated animate__zoomIn border rounded-3 p-3 shadow-sm"
                    style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 18px rgba(0,0,0,0.15)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(0,0,0,0.1)";
                    }}
                  >
                    <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary fs-4 rounded-3 shadow">
                      <i className={`bi ${feature.icon}`}></i>
                    </div>
                    <h4 className="fw-semibold mb-0">{feature.title}</h4>
                    <p className="text-secondary small">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


          <div className="container" style={{ marginTop: "15vh", marginBottom: "15vh" }}>
  <div className="text-center mb-5">
    <h3 className="fw-bold">What Our Customers Say</h3>
    <p className="text-muted">
      Real experiences from people who trust and use our platform every day.
    </p>
  </div>

  {reviewData.length > 0 ? (
    <div
      id="reviewSlider"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {reviewData.slice(0,6).map((data, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={index}
          >
            <div className="d-flex justify-content-center">
              <div
                className="card shadow-sm border-0 rounded-4 d-flex flex-column align-items-center text-center"
                style={{
                  width: "500px",
                  minHeight: "250px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(0,0,0,0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0,0,0,0.1)";
                }}
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  {/* Review Text */}
                  <p
                    className="text-secondary flex-grow-1"
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    "{data.review}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="mt-3">
                    <h6 className="fw-bold text-primary mb-1">
                      {data.userId?.name || "Anonymous"}
                    </h6>
                    <small className="text-muted">
                      {new Date(data.reviewedAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#reviewSlider"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon bg-dark rounded-circle p-2"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#reviewSlider"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon bg-dark rounded-circle p-2"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  ) : (
    <p className="text-center text-muted">No reviews yet.</p>
  )}
</div>

      </main>

    </div>
  );
};

export default UserLandingPage;
