const mongoose = require("mongoose");

/* 
   ----------------------Job-------------------
   Step1:  Worker khudko register karega. Worker ke pass skilss hoga jaise AC Servicing, Kitchen Cleaning
   Step2:  Admin worker ko unke skills ke hisaab se job dega and admin hee job create karega. jobSchema workerId mein unn sabhi workers ka id hoga jinko admin koi particular job dega
   Step3:  User worker ko hire karega, like agar user ko AC repairing ke liye worker chahiye toh woh search karega aur jo worker usko best lagega usko hire karega
   Step4:  Jab user worker ko hire karega, tab workerHiredModel mein uss worker ka id , user ka id , uss job ka id aa jayega , aur isse hee humein job, worker, user ka shara details mil jayega
*/

//Ek user ke pass multiple job hoga but iss job ke pass ek particular single user hee hoga, jab band worker ko hire karega tab jobId backend ko jayega kyunki iss particular 
//job ke liye yehi ek single worker hai

const jobSchema = mongoose.Schema({
  
  jobPicture: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
  },
  cost: {
    type: String,
    required: true,
  },

  // Jab user worker ko kisis job ke liye review karega toh worker, toh user ka id job ke review by Id mein save ho jaye ga aur uska content bhi taki
  //humlog track kar saake ki kya review tha aur kaun diya tha
  reviewById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reviewContent: {
    type: String,
  },

  isAdminVerified: {
    type:Boolean,
    default: false
  },
  //Rejected by admin
  isRejected:{
    type:Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }

});

module.exports = mongoose.model("Job", jobSchema);
