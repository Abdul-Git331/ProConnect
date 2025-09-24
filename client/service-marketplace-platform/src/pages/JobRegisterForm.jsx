import React, { useState } from "react";
import { workerRegistration } from "../service/workerServices";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

export default function ServiceProviderSignup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    profession: "",
    hourlyRate: "",
    availability: "",
    city: "",
    state: "",
    streetAddress: "",
    experience: "",
    skills: [],
    profilePhoto: null,
    certificate: null,
  });

  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // --- Helpers ---
  const update = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill) return;
    if (!form.skills.includes(skill)) {
      update("skills", [...form.skills, skill]);
    }
    setSkillInput("");
  };

  const removeSkill = (s) => {
    update(
      "skills",
      form.skills.filter((k) => k !== s)
    );
  };

  const handleFile = (e, key) => {
    const file = e.target.files[0] ?? null;
    update(key, file);
  };

  // --- Validation per step ---
  const validateStep = (s = step) => {
    const e = {};
    if (s === 1) {
      if (!form.name.trim()) e.name = "Name is required";
      if (!form.email.trim()) e.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
      if (!form.password || form.password.length < 6)
        e.password = "Password must be 6+ characters";
      if (!form.contact || form.contact.length < 10)
        e.contact = "Contact number is required and must be 10 numbers";
    } else if (s === 2) {
      if (!form.skills.length) e.skills = "Add at least one skill";
      if (!form.profession.trim() || form.profession.length > 100) e.profession = "Profession required & must be 100 words";
    } else if (s === 3) {
      if (!form.hourlyRate) e.hourlyRate = "Hourly rate required";
      if (!form.city.trim()) e.city = "City is required";
      if (!form.state.trim()) e.state = "State is required";
      if (!form.streetAddress.trim()) e.streetAddress = "Address is required";
    } else if (s === 4) {
      if (!form.profilePhoto) e.profilePhoto = "Profile photo recommended";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((p) => Math.min(5, p + 1));
  };
  const prev = () => setStep((p) => Math.max(1, p - 1));

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(5)) return;
    const fd = new FormData();
Object.entries(form).forEach(([k, v]) => {
  if (v === null) return;

  if (Array.isArray(v)) {
    v.forEach((item) => fd.append(k, item)); 
  } else {
    fd.append(k, v);
  }
});
    const response = await workerRegistration(fd);
    console.log(response)
    navigate("/worker-login");
  };

  // --- Progress bar ---
  const Progress = ({ step }) => {
    const percent = ((step - 1) / 4) * 100;
    return (
      <>
        <div className="mb-3 small">Step {step} of 5</div>
        <div className="progress mb-3" style={{ height: 8 }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${percent}%` }}
            aria-valuenow={percent}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </>
    );
  };

  // --- Render Steps ---
  return (
    <div>
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
            </nav>
          </header>
    

    <div className="container" style={{marginTop: "15vh",marginBottom: "20vh", width: "80%"}}>
      
      <div className="card p-3 shadow-sm">
        <Progress step={step} />

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Step 1: Personal */}
          {step === 1 && (
            <>
              <h5 className="mb-3">Personal Information</h5>
              <div className="mb-2">
                <label className="form-label small">Full Name</label>
                <input
                  className="form-control"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
                {errors.name && (
                  <div className="text-danger small">{errors.name}</div>
                )}
              </div>

              <div className="mb-2">
                <label className="form-label small">Email</label>
                <input
                  className="form-control"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
                {errors.email && (
                  <div className="text-danger small">{errors.email}</div>
                )}
              </div>

 <div className="mb-2">
                <label className="form-label small">Contact</label>
                <input
                  className="form-control"
                  value={form.contact}
                  onChange={(e) => update("contact", e.target.value)}
                />
                {errors.contact && (
                  <div className="text-danger small">{errors.contact}</div>
                )}
              </div>

              <div className="mb-2">
                <label className="form-label small">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                />
                {errors.password && (
                  <div className="text-danger small">{errors.password}</div>
                )}
              </div>
            </>
          )}

          {/* Step 2: Skills */}
          {step === 2 && (
            <>
              <h5 className="mb-3">Skills & Profession</h5>

              <div className="mb-2">
                <label className="form-label small">Profession</label>
                <textarea
                  className="form-control"
                  value={form.profession}
                  onChange={(e) => update("profession", e.target.value)}
                />
                {errors.profession && (
                  <div className="text-danger small">{errors.profession}</div>
                )}
              </div>

              <div className="mb-2">
                <label className="form-label small">Add Skills</label>
                <div className="d-flex">
                  <input
                    className="form-control me-2"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter"
                        ? (e.preventDefault(), addSkill())
                        : null
                    }
                    placeholder="e.g. Plumbing, Wiring"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={addSkill}
                  >
                    Add
                  </button>
                </div>
                {errors.skills && (
                  <div className="text-danger small">{errors.skills}</div>
                )}
                <div className="mt-2">
                  {form.skills.map((s) => (
                    <span key={s} className="badge bg-secondary me-1 mb-1">
                      {s}{" "}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        aria-label="Remove"
                        onClick={() => removeSkill(s)}
                        style={{ verticalAlign: "middle" }}
                      ></button>
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 3: Work Info */}
          {step === 3 && (
            <>
              <h5 className="mb-3">Work Details</h5>

              <div className="row">
                <div className="col-md-6 mb-2">
                  <label className="form-label small">Hourly Rate (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.hourlyRate}
                    onChange={(e) => update("hourlyRate", e.target.value)}
                  />
                  {errors.hourlyRate && (
                    <div className="text-danger small">{errors.hourlyRate}</div>
                  )}
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label small">Experience (years)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.experience}
                    onChange={(e) => update("experience", e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="form-label small">Availability</label>
                <input
                  className="form-control"
                  placeholder="e.g. Mon-Fri 9:00-18:00"
                  value={form.availability}
                  onChange={(e) => update("availability", e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label className="form-label small">
                 City
                </label>
               <input type="text" 
               className="form-control"
                  value={form.address}
                  onChange={(e) => update("city", e.target.value)} />
                {errors.city && (
                  <div className="text-danger small">{errors.city}</div>
                )}
              </div>

               <div>
<div className="mb-2">
                <label className="form-label small">
                 State
                </label>
               <input type="text" 
               className="form-control"
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)} />
                {errors.state && (
                  <div className="text-danger small">{errors.state}</div>
                )}
              </div>

               <div className="mb-2">
                <label className="form-label small">
                 Street Address
                </label>
               <input type="text" 
               className="form-control"
                  value={form.streetAddress}
                  onChange={(e) => update("streetAddress", e.target.value)} />
                {errors.streetAddress && (
                  <div className="text-danger small">{errors.streetAddress}</div>
                )}
              </div>
               </div>
               
            </>
          )}

          {/* Step 4: Documents & Photos */}
          {step === 4 && (
            <>
              <h5 className="mb-3">Documents & Photo</h5>

              <div className="mb-2">
                <label className="form-label small">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => handleFile(e, "profilePhoto")}
                />
                {errors.profilePhoto && (
                  <div className="text-danger small">{errors.profilePhoto}</div>
                )}
              </div>

              <div className="mb-2">
                <label className="form-label small">
                  10th/12th Certificate (jpg, png, pdf)
                </label>
                <input
                  type="file"
                  accept=".jpg,.png,.pdf"
                  className="form-control"
                  onChange={(e) => handleFile(e, "certificate")}
                />
              </div>
            </>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <>
              <h5 className="mb-3">Review & Submit</h5>
              <div className="mb-2">
                <strong>Name:</strong> {form.name || "-"}
              </div>
              <div className="mb-2">
                <strong>Email:</strong> {form.email || "-"}
              </div>
              <div className="mb-2">
                <strong>Profession:</strong> {form.profession || "-"}
              </div>
              <div className="mb-2">
                <strong>Skills:</strong> {form.skills.join(", ") || "-"}
              </div>
              <div className="mb-2">
                <strong>Rate:</strong>{" "}
                {form.hourlyRate ? `₹${form.hourlyRate}/hr` : "-"}
              </div>
              <div className="mb-2">
                <strong>City:</strong> {form.city || "-"}
              </div>
              <div className="mb-2">
                <strong>State:</strong> {form.state || "-"}
              </div>
              <div className="mb-2">
                <strong>Street Address:</strong> {form.streetAddress || "-"}
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <div>
              {step > 1 && (
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={prev}
                >
                  Back
                </button>
              )}
            </div>

            <div>
              {step < 5 && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={next}
                >
                  Next
                </button>
              )}
              {step === 5 && (
                <button type="submit" className="btn btn-success">
                  Submit Registration
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      {/* Login Button */}

      <div
        className="text-center mt-4"
        style={{ marginLeft: "4%", marginTop: "5%" }}
      >
        <Link to="/worker-login" className="btn btn-outline-secondary">
          Already have an account? Login
        </Link>
      </div>
    </div>
    </div>


  );
}
