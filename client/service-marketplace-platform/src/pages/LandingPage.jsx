import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "../assets/logo.png";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchJobList,
  fetchMostHiredServiceProviderLanding,
  fetchReviewData,
} from "../service/userServices";
import { FaShieldAlt, FaTools, FaUserCheck } from "react-icons/fa";

const LandingPage = () => {
  const [jobListData, setJobListData] = useState();
  const [mostHired, setMostHired] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewData, setReviewData] = useState([])
  const navigate = useNavigate();
  

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
      const response = await fetchMostHiredServiceProviderLanding();
      if (response.data) {
        setMostHired(response.data);
      }
    };
    fetchJobsList();
  }, []);

   useEffect(() =>{
      const fetchReview = async() =>{
        const response = await fetchReviewData()
       if(response.success){
        setReviewData(response.data)
       }
      }
      fetchReview()
   },[])

  const handleSignUp = () => {
    navigate("/user-registration");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleClick = () =>{
    navigate('/register-job')
  }
  return (
    <div>
      {/* Header Navbar */}
      <header className="shadow-sm">
        <nav className="navbar navbar-expand-lg navbar-light bg-white px-3">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/">
            <img
              src={logo}
              alt="ProConnect Logo"
              style={{ height: "40px", width: "40px", objectFit: "contain" }}
            />
            <span className="fw-bold text-primary">ProConnect</span>
          </a>

          {/* Toggler (Hamburger Menu) */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={toggleMenu}
          >
            <FaBars size={22} />
          </button>

          {/* Navbar Links */}
          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
              <li className="nav-item">
                <button className="btn btn-outline-primary btn-sm" onClick = {handleClick}>
                  Career
                </button >
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-secondary btn-sm">
                  Connect Us
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <div class="container col-xxl-8 px-4 " style={{ marginTop:"7%", marginBottom: "8%" }}>
        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6 animate__animated animate__fadeInRight">
              <img
                src="https://media.istockphoto.com/id/655681082/photo/collection-work-tools-on-wooden-desk.webp?a=1&s=612x612&w=0&k=20&c=BCA8qXnHy5r4xwYptmCdpiWwXW1rXz7FNe794Omhsho="
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
                {" "}
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3" >
              Quick, reliable services at your doorstep.
            </h1>
            <p class="lead fw-semibold">
              No more hassle of searching for reliable workers. From plumbers
              and electricians to mechanics and more – hire only verified
              professionals near you. Quick, safe, and trustworthy services at
              your fingertips.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                class="btn btn-outline-secondary btn-lg px-4 me-md-2"
                fdprocessedid="zyq4o7"
                onClick={handleSignUp}
              >
                SignUp
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-lg px-4"
                fdprocessedid="ep0lqo"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {jobListData && (
        <div className="container" style={{ marginTop:"10%" }}>
          <div style={{ marginBottom:"6%" }}>
          <h3 className="mb-4 fw-bold " >Services Provided by us</h3>
          </div>

          <div className="row">
            {jobListData.slice(0, 6).map((job) => (
              <div className="col-md-4 mb-4" key={job._id}>
                <div className="card shadow-sm position-relative h-100">
                  <img
                    src={job.jobPicture}
                    className="card-img-top"
                    alt={job.title}
                    style={{ height: "220px", objectFit: "cover" }}
                  />

                  <div
                    className="position-absolute"
                    style={{ top: "30px", left: "30px" }}
                  >
                    <img
                      src={job.workerId.profilePhoto}
                      alt={job.workerId.name}
                      className="rounded-circle border border-4 border-light shadow"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title text-start">{job.title}</h5>
                    <p className="card-text text-start">{job.description}</p>
                    
                                             <p className="card-text text-start text-muted">
                      {job.workerId.streetAddress} {job.workerId.city}, {job.workerId.state}
                      </p>
                    <p className="fw-bold text-success text-start">
                      Rs: {job.cost}
                    </p>
                  </div>

                  <div className="p-3 border-top bg-light d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-1 fw-semibold">{job.workerId.name}</p>
                      <p className="text-muted small mb-0">
                        {job.workerId.experience} yrs experience
                      </p>
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        navigate(`/hire-worker/${job._id}?cost=${job.cost}`)
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

      <div className="container" style={{ maxWidth: "1232px" , marginTop:"15vh"}}>
        <div className="row text-center justify-content-center g-4">
          
          {/* Feature 1 */}
          <div className="col-12 col-sm-6 col-md-4">
            <div className="d-flex flex-column align-items-center p-4 shadow-sm rounded bg-white h-100">
              <FaShieldAlt size={40} className="text-primary mb-3" />
              <h5 className="fw-bold">3 Month Warranty</h5>
              <p className="text-muted small mb-0">
                Enjoy peace of mind with a 90-day service warranty on all jobs.
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
      <div className="container" style={{marginTop:"15vh"}}>
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

{/* Customer Reviews Section */}
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


    </div>
  );
};

export default LandingPage;
