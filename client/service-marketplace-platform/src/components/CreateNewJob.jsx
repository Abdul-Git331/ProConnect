import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewJob } from "../service/workerServices";
import logo from "../assets/logo.png"

const CreateNewJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    jobImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createNewJob(formData);
    navigate('/worker-landing-page')
  };

  return (
    <div
      className="container"
      style={{ marginTop: "10vh", marginBottom: "15vh"}}
    >
      <h2 className="mb-4 text-center">Create New Job</h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow bg-light"
      >
        {/* Job Title */}
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter job title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter job description"
            rows="3"
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        {/* Job Image */}
        <div className="mb-3">
          <label className="form-label">Job Image</label>
          <input
            type="file"
            className="form-control"
            name="jobImage"
            onChange={handleChange}
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary w-100">Create Job</button>
      </form>
    </div>
  );
};

export default CreateNewJob;
