import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fetchJobListBySearch } from "../service/userServices";

const SearchJobs = () => {
  const [jobListData, setJobListData] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobsList = async () => {
      if (!searchTerm) return;
      const response = await fetchJobListBySearch(searchTerm);
      if (response.success) {
        setJobListData(response.data);
      }
    };
    fetchJobsList();
  }, [searchTerm]);

  const handleCityFilter = (e) => {
    e.preventDefault();
  };

  const filteredJobList = jobListData.filter(
    (job) =>
      cityFilter.trim() === "" ||
      (job.workerId && job.workerId.city
        ? job.workerId.city.toLowerCase().includes(cityFilter.toLowerCase())
        : false)
  );

  return (
    <div className="container" style={{ marginTop: "5vh", minHeight: "100vh" }}>
      
      {/* City Filter Row */}
      <form onSubmit={handleCityFilter} className="row mb-4 align-items-center">
        <div className="col-md-4 mb-3" >
          <p className="mb-0 fw-semibold">
            Enter location where you want service:
          </p>
        </div>
        <div className="col-md-8">
          <input
            type="text"
            name="cityFilter"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="form-control"
            placeholder="Type city name..."
            style={{ maxWidth: "400px" }}
          />
        </div>
      </form>

      {/* Jobs List */}
      {jobListData.length > 0 ? (
        <div className="row">
          {filteredJobList.length > 0 ? (
            filteredJobList.map((job, index) => (
              <div
                className="col-md-4 mb-4 animate__animated animate__zoomIn"
                style={{ animationDelay: `${index * 0.2}s` }}
                key={job._id}
              >
                <div
                  className="card shadow-sm position-relative h-100 border-0"
                  style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
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
                  {job.workerId && job.workerId.profilePhoto && (
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
                  )}

                  {/* Job Details */}
                  <div className="card-body mt-3">
                    <h5 className="card-title text-start fw-bold">{job.title}</h5>
                    <p className="card-text text-start text-muted">{job.description}</p>
                    <p className="card-text text-start text-muted">
                      {job.workerId.streetAddress} {job.workerId.city}, {job.workerId.state}
                    </p>
                    <p className="fw-bold text-success text-start">Rs: {job.cost}</p>
                  </div>

                  {/* Worker Info */}
                  {job.workerId && (
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
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center mt-5">
              <p className="text-muted fs-5">
                No jobs found for "<strong>{cityFilter}</strong>". We are not available at this location.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center mt-5">
          <p className="text-muted fs-5">
            No jobs found for "<strong>{searchTerm}</strong>". Try searching for something else.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchJobs;
