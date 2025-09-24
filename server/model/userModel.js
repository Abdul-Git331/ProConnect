const mongoose = require("mongoose");

mongoose.connect(process.env.URI).then(() => console.log("MongoDB connected"));

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  joinedAt:{
    type: Date,
    default: Date.now()
  },
  //when user hire a worker, the workers id comes here
  workerId: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker",
    }
  ],
  //when user hire a job, and done payment then _id from hiredModel come here.This id has all data ex workerdata, jobdata,payment data
    jobId: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
    }
  ],
});

module.exports = mongoose.model("User", userSchema);
