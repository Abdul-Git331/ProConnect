const mongoose = require("mongoose");

//Yeh model ek particular job ke lieye hai jo ek worker ko assign hoga
//Jab user worker ko hire karega tab worker,user, and jobid ismein store ho jayega

const hiredSchema = mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  hiredAt: {
    type: Date,
    default: Date.now,
  },

  //Details of the user for where and when service is required coming fron send-order-data route
  name:{
    type: String
  },
    address:{
    type: String
  },
   contact:{
    type: String
  },
  //This is the date and time when the user actually want service
  date:{
    type:Date,
  },
  time:{
    type: String
  },

  //Jab banda payment karega tab status true ho jaega taaki banda particular job ke liye dobara pay nahin kar saake aur uska payment status paid dikhaye
  paymentStatus: {
    type: String,
    default: "pending",
  },

  //This is the status of job from worker side
  jobStatus: {
    type: String,
    default: "pending",
  },

  //This is Status of job from user side
  jobStatusUser:{
    type: String,
    default: "pending",
  },

  //Jab payment confirm ho jayega tab jo payment, order id,signature aayega usko store karlenge taaki hum inn ke help se track kar saake order ko
  razorpay_payment_id: {
    type: String,
  },
  razorpay_order_id: {
    type: String,
  },
  razorpay_signature: {
    type: String,
  },
  paymentAt: {
    type: Date,
    default: Date.now,
  },

  trackWorker:{
    type: String,
    default: "notStarted"
  },
  review:{
    type: String,
  },
  rating:{
    type: Number,
  },
  query:{
   type: String,
  },
  isCancel:{
    type: Boolean,
    default: false
  },
  cancelOn: {
     type: Date
  },
  isRefund: {
    type: Boolean,
    default: false
  },
  refundId:{
    type: String
  }
});

module.exports = mongoose.model("Hired", hiredSchema);
