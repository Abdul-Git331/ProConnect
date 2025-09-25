const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminModel = require("../model/adminModel");
const verifyToken = require("../helper/verifyToken");
const workerModel = require("../model/workerModel");
const hiredModel = require("../model/hiredModel");
const jobModel = require("../model/jobModel");
const upload = require("../helper/multerConfig");
const uploadToCloudinary = require("../helper/cloudinaryConfig");
const sendMail = require("../helper/mailer");

const adminRoute = express.Router();

adminRoute.post("/create-admin", async (req, res) => {
  try {
    const { email, name, password, contact, secret } = req.body;

    const admin = await adminModel.findOne({ email });
    console.log(admin);
    if (admin) {
      return res.json({
        sucess: false,
        massage: "admin already created",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const hashedSecret = await bcrypt.hash(secret, 12);

    const newadmin = {
      email,
      name,
      password: hashedPassword,
      contact,
      secret: hashedSecret,
    };

    const savedAdmin = await adminModel.create(newadmin);

    const msg = `Hello, <strong>${savedAdmin.name}</strong> you have successfully registered to <strong>ProConnect</strong>`;
      await sendMail(savedAdmin.email, "User Registration", msg);

    return res.json({
      success: true,
      massage: "Admin registered",
      admin: { adminName: savedAdmin.name, adminEmail: savedAdmin.email },
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.json({
      massage: "Internal server error",
    });
  }
});

adminRoute.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const secret = req.body.address;

    const admin = await adminModel.findOne({ email });
    console.log(admin);

    if (!admin) {
      return res.json({
        success: false,
        massage: "invalid credential",
      });
    }

    const passwordMatched = await bcrypt.compare(password, admin.password);

    if (!passwordMatched) {
      return res.json({
        success: false,
        massage: "invalid credential",
      });
    }

    const secretMatched = await bcrypt.compare(secret, admin.secret);

    if (!secretMatched) {
      return res.json({
        success: false,
        massage: "invalid credential",
      });
    }

    const token = await jwt.sign(
      { email: admin.email, adminId: admin._id },
      process.env.SECRET
    );
    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      massage: "User login successfull",
    });
  } catch (err) {
    console.log("Login error", err.massage);
    res.json({
      massage: "Server error",
    });
  }
});

//-----------------API for handlin request from ADmin for fetching unverify worker data. From Component VerifyWorker.jsx-------

adminRoute.get("/fetch-unverified-worker", verifyToken, async (req, res) => {
  try {
    const { email, adminId } = req.worker;

    const workersData = await workerModel.find({
      $or: [
        { isVerified: false, selected: false },
        { isVerified: true, selected: false },
        { isVerified: false, selected: true },
      ],
    });
    console.log(workersData);
    res.json({
      massage: workersData,
    });
  } catch (err) {
    console.log("error in unverified worker data fetching");
    res.json("Server error", err.massage);
  }
});

//-----------------API for handlin request from ADmin for verify worker data. From Component VerifyWorker.jsx-------

adminRoute.patch("/verify-unverified-worker", verifyToken, async (req, res) => {
  try {
    const { id } = req.body;

    const worker = await workerModel.findOne({ _id: id });

    if (!worker) {
      return res.json({
        success: false,
        massage: "Unable to verify worker. Problem in fetching worker data",
      });
    }

    worker.isVerified = true;

    const savedWorker = await worker.save();

const msg = `
  Dear <strong>${savedWorker.name}</strong>,<br><br>
  Congratulations! Your account has been successfully verified by the admin on <strong>ProConnect</strong>.<br><br>
  You can now access all the features available to verified service providers.<br><br>
  Thank you for being a valued member of our platform.<br><br>
  Best regards,<br>
  <strong>The ProConnect Team</strong>
`;

await sendMail(worker.email, "Account Verification - ProConnect", msg);


    console.log(savedWorker);
    res.json({
      success: true,
      massage: "Worker verification successful",
    });
  } catch (err) {
    console.log("Worker verififcation fail", err.massage);
    res.json({
      massage: "Internal server error",
    });
  }
});

//-----------------API for handlin request from ADmin for select unselected worker. From Component VerifyWorker.jsx-------

adminRoute.patch('/select-unselected-worker',verifyToken, async(req,res) =>{
  try{
    const { id } = req.body;

    const worker = await workerModel.findOne({_id: id});

    if (!worker) {
      return res.json({
        success: false,
        massage: "Unable to verify worker. Problem in fetching worker data",
      });
    };

    worker.selected = true;

    const savedWorker = await worker.save();

    const msg = `
  Dear <strong>${savedWorker.name}</strong>,<br><br>
  Congratulations! Your account has been successfully selected by the admin on <strong>ProConnect</strong>.<br><br>
  Wait for admins to verify your documents.<br><br>
  Thank you for being a valued member of our platform.<br><br>
  Best regards,<br>
  <strong>The ProConnect Team</strong>
`;

await sendMail(worker.email, "Account Selection - ProConnect", msg);

    console.log(savedWorker);
    res.json({
      success: true,
      massage: "Worker selection successful",
    });
  }catch (err) {
    console.log("Worker selection fail", err.massage);
    res.json({
      massage: "Internal server error",
    });
  }
})

//-----------------API for handlin request from ADmin for reject worker request. From Component VerifyWorker.jsx-------

adminRoute.delete('/reject-worker', verifyToken, async(req,res) =>{
  try{
   const {id} = req.body;

   const worker = await workerModel.deleteOne({_id: id});

const msg = `
  Dear <strong>${worker.name}</strong>,<br><br>
  We regret to inform you that your account verification on <strong>ProConnect</strong> has not been approved by the admin.<br><br>
  Please ensure that all required documents and information are complete and accurate before submitting your account for verification again.<br><br>
  Thank you for your interest in joining ProConnect. We encourage you to review the verification requirements and reapply.<br><br>
  Best regards,<br>
  <strong>The ProConnect Team</strong>
`;

await sendMail(worker.email, "Account Verification Status - ProConnect", msg);


   res.json({
    success: true,
    massage: "Worker rejected",
    data: worker,
   })
  }catch(err){
    console.log("Problem in rejecting worker ", err.massage);
    res.json({
      massage: "Internal server error"
    });
  }
})

// ---------API for fetching total verified and selected worker data.From Component TotalWorker.jsx----------

adminRoute.get('/verifiedselected-worker-data',verifyToken , async (req,res) =>{
  try{

    const verifiedWorkers = await workerModel.find({
      isVerified : true,
      selected: true
    })
    console.log(verifiedWorkers)
    if(!verifiedWorkers){
      return res.json({
        success: true,
        massage: "Unverified and Unselescted workers notfound in DB"
      });
    };

    res.json({
      success: true,
      massage: "Workers Found",
      data: verifiedWorkers
    });

  }catch{
    console.log("Problem in fetching verified worker data", err.massage);
    res.json({
      massage: "Internal server error"
    });
  }
})

//----------APi for removing a worker by admin----------------

// adminRoute.post('/remove-worker', verifyToken, async(req,res) =>{

// })

//---------API for showing the completed jobs to the admin-------------------------

adminRoute.get('/get-completed-jobs', verifyToken, async(req,res) =>{
  try{
     const jobs = await hiredModel.find({
     paymentStatus: "done",
      jobStatusUser: "done",
       trackWorker: "start", 
      isCancel: false
     }).populate("jobId userId workerId").sort({"hiredAt": -1});

     if(!jobs){
      return res.json({
        success: false,
        massage: "No jobs found"
      })
     };

     console.log(jobs)
     res.json({
      success: true,
      massage: "Job data fetched successfully",
      data: jobs,
     })
  }catch(err){
     console.log(err.massage);
    res.json({
      massage: "Internal server error at fetching completed jobs data"
    });
  }
});

//-------------API forvshowing the cancelled job of the users----------------------

adminRoute.get('/get-cancelled-jobs', verifyToken, async(req,res) =>{
  try{
    const jobs = await hiredModel.find({
      paymentStatus: "done",
      trackWorker: "notStarted", 
      isCancel: true,
    }).populate("jobId userId workerId").sort({"hiredAt": -1});

    if(!jobs){
      return res.json({
        success: false,
        massage: "Cancelled jobs data not found"
      })
    };

    res.json({
      success: true,
      massage: "Data fetched successfully",
      data: jobs
    })
  }catch(err){
    console.log(err.massage);
    res.json({
      massage: "Internal server error at fetching cancelled jobs data"
    });
  }
})

//-------------API for fetching unverifying the job-----------------

adminRoute.get('/fetch-unverified-jobs', verifyToken, async(req,res) =>{
  try{
   const jobs = await jobModel.find({
    isAdminVerified: false,
    isRejected: false
   }).populate("workerId");

   if(!jobs){
    return res.json({
      success: false,
      massage: "unverified jobs not found"
    })
   };

   res.json({
    success: true,
    massage: "Unverified data found successfully",
    data: jobs
   })
  }catch(err){
 console.log(err.massage);
    res.json({
      massage: "Internal server error at fetching unverified jobs data"
    });
  }
});

//--------API for verifying an unverified jobs------------------

adminRoute.post('/verify-unverified-jobs', verifyToken, async(req,res) =>{
  try{
    const {id} = req.body
    const job = await jobModel.findOne({
      _id: id, 
  }).populate("workerId");

   if(!job){
    return res.json({
      success: false,
      massage: "unverified job not found"
    })
   };

   job.isAdminVerified = true;

   await job.save();

const msg = `
  Dear <strong>${job.workerId.name}</strong>,<br><br>
  Congratulations! Your service listing <strong>${job.title}</strong>, created on <strong>${new Date(job.createdAt).toLocaleString()}</strong> via <strong>ProConnect</strong>, has been successfully verified and approved by the admin.<br><br>
  Your service is now live and visible to potential customers on our platform.<br><br>
  Thank you for being a valued member of ProConnect. We look forward to your continued contributions.<br><br>
  Best regards,<br>
  <strong>The ProConnect Team</strong>
`;

await sendMail(job.workerId.email, "Service Listing Approved - ProConnect", msg);

   res.json({
    success: true,
    massage: "Job verified successfully",
    data: job
   })
  }catch(err){
 console.log(err.massage);
    res.json({
      massage: "Internal server error at verifying unverified jobs data"
    });
  }
});

//--------API for rejecting an unverified jobs------------------

adminRoute.post('/rejecting-unverified-jobs', verifyToken, async(req,res) =>{
  try{
    const {id} = req.body
    const job = await jobModel.findOne({_id: id}).populate("workerId");

   if(!job){
    return res.json({
      success: false,
      massage: "unverified job not found"
    })
   };

   job.isRejected = true;

    await job.save();

   const msg = `
  Dear <strong>${job.workerId.name}</strong>,<br><br>
  We regret to inform you that your service listing <strong>${job.title}</strong>, created on <strong>${new Date(job.createdAt).toLocaleString()}</strong> via <strong>ProConnect</strong>, has not been approved by the admin.<br><br>
  Please review the service details, ensure all required information and documentation are complete and accurate, and resubmit for approval.<br><br>
  Thank you for your contribution to ProConnect. We encourage you to make the necessary adjustments and try again.<br><br>
  Best regards,<br>
  <strong>The ProConnect Team</strong>
`;

await sendMail(job.workerId.email, "Service Listing Status - ProConnect", msg);


   res.json({
    success: true,
    massage: "Job rejected successfully",
    data: job
   })
  }catch(err){
 console.log(err.massage);
    res.json({
      massage: "Internal server error at rejecting jobs data"
    });
  }
});


module.exports = adminRoute;
