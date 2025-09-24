const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("../helper/multerConfig");
const uploadToCloudinary = require("../helper/cloudinaryConfig");
const workerModel = require("../model/workerModel");
const { error } = require("console");
const verifyToken = require("../helper/verifyToken");
const hiredModel = require("../model/hiredModel");
const jobModel = require("../model/jobModel");
const path = require("path");
const sendMail = require("../helper/mailer");

const workerRoute = express.Router();

//Registration
workerRoute.post("/worker-registration", upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "certificate", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const {
        name,
        email,
        contact,
        password,
        profession,
        hourlyRate,
        availability,
        city,
        state,
        streetAddress,
        experience,
      } = req.body;

let { skills } = req.body;
if (!Array.isArray(skills)) skills = [skills];


      const worker = await workerModel.findOne({ email });

      if (worker) {
        return res.json({
          success: false,
          massage: "User already exist!",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const uploadedProfilepic = await uploadToCloudinary(
        req.files.profilePhoto[0].path,
        "default_folder"
      );

      let uploadedCertificates = [];
      if (req.files.certificate) {
        uploadedCertificates = await Promise.all(
          req.files.certificate.map((file) =>
            uploadToCloudinary(file.path, "certificates_folder")
          )
        );
      }

      const newWorker = {
        name,
        email,
        contact,
        password: hashedPassword,
        profession,
        hourlyRate,
        availability,
        city,
        state,
        streetAddress,
        certificate: uploadedCertificates[0].url,
        experience,
        skills,
        profilePhoto: uploadedProfilepic.url,
      };

      const savedWorker = await workerModel.create(newWorker);

      if (req.files?.profilePhoto?.[0]) {
        fs.unlinkSync(req.files.profilePhoto[0].path);
      }
      if (req.files?.certificate) {
        req.files.certificate.forEach((file) => {
          fs.unlinkSync(file.path);
        });
      };

const msg = `
  Dear <strong>${savedWorker.name}</strong>,<br><br>
  Thank you for registering as a service provider on <strong>ProConnect</strong>.<br><br>
  Your account has been successfully created and is now pending admin verification. 
  Once verified, you will be able to access all features available to our verified service providers.<br><br>
  We appreciate your patience and look forward to connecting you with customers soon.<br><br>
  Best regards,<br>
  <strong>The ProConnect Team</strong>
`;

await sendMail(savedWorker.email, "Service Provider Registration - ProConnect", msg);


      res.json({
        success: true,
        message: "Worker registered successfully",
        profilePic: uploadedProfilepic,
        certificates: uploadedCertificates,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

//Login
workerRoute.post("/worker-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const worker = await workerModel.findOne({ email });

    if (!worker) {
      return res.json({
        success: false,
        massage: "Email or Password is Invalid!",
      });
    }

    const isMatch = await bcrypt.compare(password, worker.password);

    if (!isMatch) {
      return res.json({
        success: false,
        msg: "Email or Password is invalid",
      });
    }

    const isVerified = worker.isVerified;
    const isSelected = worker.isSelected;

    if (!isVerified) {
      return res.json({
        success: false,
        msg: "User is not Verified",
      });
    }

    if (!isSelected) {
      return res.json({
        success: false,
        msg: "User is not Selected",
      });
    }

    const token = await jwt.sign(
      { email: email, workerId: worker._id },
      process.env.SECRET
    );

    console.log("jwt in login ", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", 
      path: "/",  
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      msg: "Login Successful",
      worker: { email: worker.email, name: worker.name },
    });
  } catch (err) {
    res.json({
      success: false,
      error: err.massage,
    });
  }
});

//Fetch worker profile

workerRoute.get("/fetch-worker-data", verifyToken, async (req, res) => {
  try{
 const workerId = req.worker.workerId;
 const workerData = await workerModel.findOne({_id: workerId}).populate({path: "jobId", select: "paymentStatus"});

 const totalEarning= workerData.earnings.reduce((sum,r) => sum+r,0)

  const completedJobs = await hiredModel.find({
      workerId,
      paymentStatus: "done",
      jobStatusUser: "done"     
     })

         const assignedJobs = await hiredModel.find({
      workerId: workerId,
      paymentStatus: "done",
      jobStatus: "pending",
      jobStatusUser: "pending",
      isCancel: false
    })

     const NumberOfCompletedJobs = completedJobs.length
    const pendingJobs = assignedJobs.length
  console.log("ggggggggggggggggggggggggggggggggggggggggggggggggg",workerData)
  if(!workerData){
    return res.json({
      success: false,
      massage: "Worker data is not fond"
    })
  }

  res.json({
    success: true,
      workerData: { ...workerData.toObject(), totalEarning, NumberOfCompletedJobs, pendingJobs }
  });
  }catch(err){
    res.json({
      success: false,
      error: err.massage,
    })
  }
 
});


//API for fetching assigned data of job to worker

workerRoute.get("/fetch-assigned-jobs", verifyToken, async(req,res) =>{
  try{
    console.log("hello")
    const {email,workerId} = req.worker;
  
    const assignedJobs = await hiredModel.find({
      workerId: workerId,
      paymentStatus: "done",
      jobStatus: "pending",
      jobStatusUser: "pending",
      isCancel: false
    }).populate("userId").populate("jobId")


    if(!assignedJobs){
      return res.json({
        success: true,
        massage: "No job found"
            })
    }

    res.json({
      success: true,
      data: assignedJobs,
      massage: "Jobs assigened",
    })
  }catch(err){
       console.log(err.massage)
     res.json({
      success: false,
      massage: "Internal Server Error at fetching assigned jobs data"
     })
  }
})

//---------------API for fetching details of services listed by a worker-------------

workerRoute.get('/fetch-listed-services', verifyToken, async(req,res) =>{
  try{
    const {email, workerId} = req.worker;

    const listedJobs = await jobModel.find({
      workerId: workerId,
      isAdminVerified: true
    })

    if(!listedJobs){
      return res.json({
        success: false,
        massage: "No listed jobs found"
      })
    }

    res.json({
      success: true,
      massage: "Listed jobs fetched successfully",
      data: listedJobs
    })
  }catch(err){
    console.log(err.massage)
    res.json({
      success: false,
      massage: "Internal server error at fetching listed job data"
    })
  }
})

//---------------APi for deleting a service by worker ------------------------

workerRoute.post('/delete-service', verifyToken, async (req, res) => {
  try {
    const { id } = req.body;

    const job = await jobModel.findByIdAndDelete(id);

    if (!job) {
      return res.json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service deleted successfully",
      deletedJob: job,
    });

  } catch (err) {
    console.error(err.message);
    res.json({
      success: false,
      message: "Internal server error at deleting listed job data",
    });
  }
});


//-------------------- API for marking a job complete by worker

workerRoute.post("/mark-complete", verifyToken, async (req, res) => {
  try {
    const { id } = req.body;

    const job = await hiredModel.findOne({ _id: id });

    if (!job) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }

    // Check if user has already marked job as done
    if (job.jobStatusUser === "done") {
      job.jobStatus = "done";
      await job.save();

      return res.json({
        success: true,
        message: "Job completion status updated to done by worker",
        data: job,
      });
    }

    // If user hasn't marked as done yet
    return res.json({
      success: false,
      message: "User has not marked the job as done",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error while updating job status",
    });
  }
});


//----------------------API for when worker Start a job 

workerRoute.post("/start-job", verifyToken, async(req,res) =>{
  try{
   const {id} = req.body;

   const job = await hiredModel.findOne({_id: id});

   job.trackWorker = "start";

   await job.save();

const msg = `
  Dear <strong>${job.userId.name}</strong>,<br><br>
  We would like to inform you that your service provider, <strong>${job.workerId.name}</strong>, has started en route to provide the service <strong>${job.jobId.title}</strong> that you hired on <strong>${new Date(job.hiredAt).toLocaleString()}</strong>.<br><br>
  Please ensure that you are ready to receive the service at the scheduled location.<br><br>
  Thank you for choosing <strong>ProConnect</strong>.<br><br>
  Best regards,<br>
  <strong>The ProConnect Team</strong>
`;

await sendMail(job.userId.email, "Service Provider En Route - ProConnect", msg);
   
    res.json({
      success: true,
      massage: "Job Started",
      data: job,
    })
  }catch(err){
   console.log(err.massage)
     res.json({
      success: false,
      massage: "Internal Server Error at updating job status"
     })
  }
})

//-------------------------API for fetching completed job data for worker

workerRoute.get('/fetch-completed-job-data', verifyToken, async(req,res) =>{
  try{
     const {email,workerId} = req.worker;
     console.log(workerId)

     const completedJobs = await hiredModel.find({
      workerId,
      paymentStatus: "done",
      trackWorker: "start",
      jobStatusUser: "done",
      isCancel: false     
     }).populate("jobId userId");
     console.log(completedJobs)

     if(!completedJobs){
      return res.json({
        success: false,
        massage: "No completed jobs found"
      })
     };

     res.json({
      success: true,
      data: completedJobs,
      massage: "Completed jobs data found successfully"
     })
  }catch(err){
     res.json({
      success: false,
      massagr: "Internal server error at fetching completed jobs data"
     })
  }
});

// ---------API for listing new job.From Component CreateNewJob.jsx----------

workerRoute.post('/create-new-job',upload.single("jobImage"), verifyToken, async (req, res) => {
  try {
    const {email, workerId} = req.worker;
    console.log(workerId)
    const {  title, description, price } = req.body;

    const uploadedPhoto = await uploadToCloudinary(req.file.path, "default_folder");

    const worker = await workerModel.findOne({_id: workerId});

    if (!worker) {
      return res.json({
         success: false, 
         message: "Worker not found" 
        });
    }

    const job = {
      title,
      description,
      cost: price,
      workerId: workerId, 
      jobPicture: uploadedPhoto.url || " ",
    };

    const createdJob = await jobModel.create(job);

    res.json({
      success: true,
      message: "Job created successfully",
      data: createdJob,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server error at listing new job" 
    });
  }
});

//-----------API for editing worker profile ---------------------

workerRoute.patch("/edit-worker-profile", verifyToken, async (req, res) => {
  try {
    const { workerId } = req.worker;
   console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",req.body)
    const updatedWorker = await workerModel.findByIdAndUpdate(workerId, req.body,
       { new: true }
      );
console.log(updatedWorker)
    res.json({ 
      success: true,
      massage: "Profile updated" ,
      data: updatedWorker
    });
  } catch (err) {
    res.json({
       success: false, 
       message: "Erver error at editing worker profile" 
      });
  }
});

//---------------APi for pausing services of worker-------------

workerRoute.get('/pause-services', verifyToken, async(req,res) =>{
  try{
    const {email, workerId} = req.worker;

    const worker = await workerModel.findOne({_id: workerId});

    if(!worker){
      return res.json({
        success: false, 
       message: "Worker data is not found at pause services" 
      })
    }

    if(worker.pauseServices === true){
       return res.json({
        success: false, 
       message: "Your services is already paused" 
      })
    }

    worker.pauseServices = true;
    await worker.save();

          return res.json({
        success: true, 
       message: "Worker services paused" 
      })

  }catch(err){
console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server error at pause worker services" 
    });
  }
})

//---------------APi for pausing services of worker-------------

workerRoute.get('/start-services', verifyToken, async(req,res) =>{
  try{
    const {email, workerId} = req.worker;

    const worker = await workerModel.findOne({_id: workerId});

    if(!worker){
      return res.json({
        success: false, 
       message: "Worker data is not found at pause services" 
      })
    }

    if(worker.pauseServices === false){
       return res.json({
        success: false, 
       message: "Your services is already started" 
      })
    }

    worker.pauseServices = false;
    await worker.save();

          return res.json({
        success: true, 
       message: "Worker services started" 
      })

  }catch(err){
console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server error at pause worker services" 
    });
  }
})


module.exports = workerRoute;
