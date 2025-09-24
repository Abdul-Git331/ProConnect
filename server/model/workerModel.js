const mongoose = require("mongoose");

const workerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: [
    {
type: String,
    required: true,
    }   
  ],
  profession: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: String,
    required: true,
  },
  availability: {
    type: [String],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
    state: {
    type: String,
    required: true,
  },
    streetAddress: {
    type: String,
    required: true,
  },
  certificate: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
  },
  createdAt: { 
    type: Date,
    default: Date.now 
  },
  isVerified:{
    type: Boolean,
    default: false,
  },
  selected:{
   type: Boolean,
   default: false,
  },

  //unique id from hiredModel for the info of the job doen by worker
  jobId: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    }
  ],
  
  rating:[
    {
      type: Number,
    }
  ],
  review:[
    {
      type: String
    }
  ],
  pauseServices:{
    type: Boolean,
    default: false
  },
  earnings:[
     {
      type: Number
     }
  ]
});

module.exports = mongoose.model("Worker", workerSchema);
