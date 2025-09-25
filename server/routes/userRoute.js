const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const sendMail = require("../helper/mailer");
const jwt = require("jsonwebtoken");
const verifyToken = require("../helper/verifyToken");
const jobModel = require("../model/jobModel");
const workerModel = require("../model/workerModel");
const hiredModel = require("../model/hiredModel");
const Razorpay = require("razorpay");
const paymentModel = require("../model/paymentModel");
const path = require("path");
const reviewModel = require("../model/reviewModel");

const userRouter = express.Router();

// REGISTER
userRouter.post("/user-register", async (req, res) => {
  try {
    const { email, name, password, contact, address } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        msg: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { email, name, password: hashedPassword, contact, address };
    const savedUser = await userModel.create(newUser);

    try {
const msg = `
  Dear <strong>${name}</strong>,<br><br>
  Welcome to <strong>ProConnect</strong>! Your account has been successfully created.<br><br>
  You can now explore our platform and start connecting with verified service providers for your needs.<br><br>
  Thank you for choosing ProConnect.<br><br>
  Best regards,<br>
  <strong>The ProConnect Team</strong>
`;

await sendMail(email, "Welcome to ProConnect - Account Registration", msg);

    } catch (mailErr) {
      console.error("Email sending failed:", mailErr.message);
    }

    res.status(200).json({
      success: true,
      msg: "Registration Successful",
      user: { id: savedUser._id, email: savedUser.email, name: savedUser.name },
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

//-------------------------------------- LOGIN -----------------------------------------

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "Email or Password is invalid" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, msg: "Email or Password is invalid" });
    }

    const token = jwt.sign({ email, userId: user._id }, process.env.SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      msg: "Login Successful",
      user: user,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
});

//---------------------Logout------------------------------------------

userRouter.get("/logout", verifyToken, async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.json({
        success: false,
        message: "You are already logged out",
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
});

//------------------API for showing job list to the users on landing page-------------------

userRouter.get("/fetch-job-data", async (req, res) => {
  try {
    const jobList = await jobModel
      .find({ isAdminVerified: true })
      .populate({
        path: "workerId",
        match: { pauseServices: false },
      })
      .populate("reviewById");

    const filteredJobs = jobList.filter((job) => job.workerId);
    console.log("oooooooooooooooooooooooooooooooooooooo", filteredJobs);

    res.json({
      success: true,
      massage: "Data fetched successsfully",
      data: filteredJobs.reverse(),
    });
  } catch (err) {
    res.json({
      massage: "Server error",
    });
  }
});

//------------------API for showing job list for title searched by user to the users on search jobs page-------------------

userRouter.post("/fetch-job-data-by-search", async (req, res) => {
  try {
    const { searchTerm } = req.body;
    const jobList = await jobModel
      .find({
        title: { $regex: searchTerm, $options: "i" },
        isAdminVerified: true,
      })
      .populate({
        path: "workerId",
        match: { pauseServices: false },
      })
      .populate("reviewById");

    const filteredJobs = jobList.filter((job) => job.workerId);
    console.log("oooooooooooooooooooooooooooooooooooooo", filteredJobs);

    res.json({
      success: true,
      massage: "Data fetched successsfully",
      data: filteredJobs,
    });
  } catch (err) {
    res.json({
      massage: "Server error",
    });
  }
});

//------------------API for showing job list of most hired service provider to the users on userporfile page-------------------

userRouter.get(
  "/most-hired-service-provider",
  verifyToken,
  async (req, res) => {
    try {
      let jobList = await workerModel.find();
      jobList.sort((a, b) => b.jobId.length - a.jobId.length);

      const data = jobList.map((worker) => {
        let avgRating = 0;
        if (worker.rating && worker.rating.length > 0) {
          const total = worker.rating.reduce((sum, r) => sum + r, 0);
          avgRating = (total / worker.rating.length).toFixed(1);
        }

        return {
          ...worker.toObject(),
          avgRating,
        };
      });

      res.json({
        success: true,
        message: "Data fetched successfully",
        data,
      });
    } catch (err) {
      console.error(err);
      res.json({
        success: false,
        message: "Server error",
      });
    }
  }
);

//-----------------API for showing job list of most hired service provider to the users on landing page-------------------

userRouter.get("/most-hired-service-provider-landing", async (req, res) => {
  try {
    let jobList = await workerModel.find();
    jobList.sort((a, b) => b.jobId.length - a.jobId.length);

    const data = jobList.map((worker) => {
      let avgRating = 0;
      if (worker.rating && worker.rating.length > 0) {
        const total = worker.rating.reduce((sum, r) => sum + r, 0);
        avgRating = (total / worker.rating.length).toFixed(1);
      }

      return {
        ...worker.toObject(),
        avgRating,
      };
    });

    res.json({
      success: true,
      message: "Data fetched successfully",
      data,
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: "Server error",
    });
  }
});

//------------------API for tracking order after worker start a job on userporfile page-------------------

userRouter.get("/track-order", verifyToken, async (req, res) => {
  try {
    const { email, userId } = req.worker;

    const trackOrder = await hiredModel
      .find({
        userId: userId,
        paymentStatus: "done",
        jobStatusUser: "pending",
        jobStatus: "pending",
        isCancel: false,
      })
      .populate("workerId")
      .populate("jobId");

    if (!trackOrder) {
      return res.json({
        success: false,
        massage: "Order not found",
      });
    }
    console.log("rrrrrrrrrrrrrrrrrrrrr", trackOrder);
    res.json({
      success: true,
      data: trackOrder,
      massage: "Data for tracking found successfully",
    });
  } catch (err) {
    console.log(err.msg);
    res.json({
      success: false,
      massage: "server error in fetching data for tracking details",
    });
  }
});

//----------------- API for marking job status as complete by user side ---------

userRouter.post("/mark-complete-by-user", verifyToken, async (req, res) => {
  try {
    const { id } = req.body;
    const { email, userId } = req.worker;

    const jobData = await hiredModel.findOne({ _id: id });

    if (jobData.trackWorker === "start") {
      jobData.jobStatusUser = "done";

      await jobData.save();

      return res.json({
        success: true,
        massage: "Job marked completed by user",
        data: jobData,
      });
    }

    res.json({
      success: false,
      massage: "Job is not started yet by worker",
    });
  } catch (err) {
    console.log(err.massage);
    res.json({
      success: false,
      massage: "Server error at making job done by user",
    });
  }
});

//-------------------API for viewing the completed jobs for user------------------------------

userRouter.get("/view-history", verifyToken, async (req, res) => {
  try {
    const { email, userId } = req.worker;

    const data = await hiredModel
      .find({
        userId,
        paymentStatus: "done",
        // jobStatus: "done",
        jobStatusUser: "done",
        isCancel: false,
      })
      .populate("jobId")
      .populate("workerId");

    if (!data) {
      return res.json({
        success: false,
        massage: "Unable to fetch data at view history",
      });
    }

    res.json({
      success: true,
      data: data,
      massage: "Data fetched successfully",
    });
  } catch (err) {
    console.log(err.massage);
    res.json({
      success: false,
      massage: "Server error at fetching history data",
    });
  }
});

//-----------------API for fetching user profile data -----------------------------

userRouter.get("/fetch-user-profile", verifyToken, async (req, res) => {
  try {
    const { email, userId } = req.worker;

    const data = await userModel.findOne({ _id: userId });

    if (!data) {
      return res.json({
        success: false,
        massage: "Unable to fetch user data",
      });
    }

    res.json({
      success: true,
      data: data,
      massage: "Successfully fetch user data",
    });
  } catch (err) {
    console.log(err.massage);
    res.json({
      success: false,
      massage: "Server error at fetching user profile data",
    });
  }
});

//------------------API for editing user data ----------------------------

userRouter.patch("/update-user-profile-data", verifyToken, async (req, res) => {
  try {
    const { email, userId } = req.worker;
    const updates = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    console.log(updatedUser);
    res.json({
      success: true,
      massage: "Profile updated",
      data: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
});

//------------------API for storing review of worker -------------------------------------

userRouter.post("/review-worker", verifyToken, async (req, res) => {
  try {
    const { email, userId } = req.worker;
    const { id, workerId, jobId, rating, comment } = req.body;
    console.log(
      "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
      rating,
      comment
    );
    const job = await hiredModel.findOne({ _id: id });
    const worker = await workerModel.findOne({ _id: workerId });

    if (!job) {
      return res.json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.trackWorker === "notStarted") {
      return res.json({
        success: false,
        massage: "job has not started yet",
      });
    }

    if (job.review === undefined && job.rating === undefined) {
      job.review = comment;
      job.rating = rating;

      if (comment) worker.review.unshift(comment);
      if (rating) worker.rating.unshift(rating);

      await job.save();
      await worker.save();
      console.log("..........................................", job.review);
      return res.json({
        success: true,
        massage: "Review and rating saved succefully",
        data: job,
      });
    }
  } catch (err) {
    console.log(err.massage);
    res.json({
      success: false,
      massage: "Internal server error at storing review & rating",
    });
  }
});

//------------------API for storing review on the website by user------------------------

userRouter.post("/review-us", verifyToken, async (req, res) => {
  try {
    const { email, userId } = req.worker;
    const { comment, rating } = req.body;

    const userExist = await reviewModel.findOne({ userId: userId });

    if (userExist) {
      return res.json({
        success: false,
        massage: "You have already reviewed",
      });
    }

    const svaedReview = await reviewModel.create({
      userId,
      rating,
      review: comment,
    });

    res.json({
      success: true,
      massage: "Thanks for review us",
      data: svaedReview,
    });
  } catch (err) {
    console.log(err.massage);
    res.json({
      success: false,
      massage: "Internal server error at storing review ",
    });
  }
});

//-----------------API for fetching review for Landing page-------------------------

userRouter.get("/fetch-review-data", async (req, res) => {
  try {
    const reviewData = await reviewModel.find().populate("userId");

    if (!reviewData) {
      return res.send({
        success: false,
        massage: "No review found",
      });
    }

    res.json({
      success: true,
      massage: "Review data found successfully",
      data: reviewData,
    });
  } catch (err) {
    console.log(err.massage);
    res.json({
      success: false,
      massage: "Internal server error at fetching review ",
    });
  }
});

//-----------------API for fetching review for user landing page-------------------------

userRouter.get("/fetch-review-data-user", verifyToken, async (req, res) => {
  try {
    const reviewData = await reviewModel.find().populate("userId");

    if (!reviewData) {
      return res.send({
        success: false,
        massage: "No review found",
      });
    }

    res.json({
      success: true,
      massage: "Review data found successfully",
      data: reviewData,
    });
  } catch (err) {
    console.log(err.massage);
    res.json({
      success: false,
      massage: "Internal server error at fetching review ",
    });
  }
});

// ------------------ API for showing jobs searched by user ----------------------

userRouter.post("/search-jobs", verifyToken, async (req, res) => {
  try {
    const { searchTerm } = req.body;

    // Agar empty search hai toh sabhi jobs return karo
    let query = {};
    // if (searchTerm && searchTerm.trim() !== "") {
    //   query = {
    //     title: { $regex: searchTerm, $options: "i" }
    //   };
    // }

    const jobs = await jobModel
      .find({ title: searchTerm })
      .populate({
        path: "workerId",
        match: { pauseServices: false },
      })
      .exec();

    res.json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Search jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while searching jobs",
    });
  }
});

//------------------API for showing billing for worker by user on billing page-------------------

userRouter.post("/hire-worker", verifyToken, async (req, res) => {
  try {
    //yeh jo jobId hai yeh ek particular job ka _id hai
    const { jobId } = req.body;
    const { email, userId } = req.worker;

    const jobDetails = await jobModel
      .findOne({ _id: jobId })
      .populate("workerId");

    if (!jobDetails) {
      return res.json({
        success: false,
        massage: "Unable to fetch worker details",
      });
    }

    const workerHired = await hiredModel.create({
      jobId: jobId,
      workerId: jobDetails.workerId,
      userId: userId,
    });

    res.json({
      massage: "hired",
      jobData: jobDetails,
      data: workerHired,
      key: workerHired._id,
      //jab user hire worker par click karega tab , hire worker par request aayega with the jobId of that job from jobModel
      //Iss jobid se job ka deails nikal like workerId , hiredModel mein store kar denge aur frontend ko iss document _id bhej denge aur yeh id har document ko uniquely identify karne mein help karega
      //Aur phir jab user Pay Now par click karega tab frontend iss id ko create-order route ko bhejega taki uske liye order cretae ho saake
    });
  } catch (err) {
    res.json({
      massage: "Server error",
    });
  }
});

//------------------API for storing formData(name,address,contact) coming from billing page in hiredModel----------------

userRouter.post("/send-order-data", verifyToken, async (req, res) => {
  const { name, address, contact, date, time } = req.body.form;
  const { jobUniqueId } = req.body;

  const orderData = await hiredModel.findOne({ _id: jobUniqueId });

  if (!orderData) {
    return res.json({
      massage: "internal server at send-order-data",
    });
  }

  orderData.name = name;
  orderData.address = address;
  orderData.contact = contact;
  orderData.date = date;
  orderData.time = time;

  const savedOrderData = await orderData.save();
  console.log(savedOrderData);

  res.json({
    sucess: true,
    data: savedOrderData,
    massage: "OrderData is successfully saved",
  });
});

//------------------API for creating order by user on billing page-------------------

userRouter.post("/create-order", verifyToken, async (req, res) => {
  try {
    //this is the unique id for the job in hiredModel
    const { jobUniqueId } = req.body;
    const { userId } = req.worker;

    const jobDetails = await hiredModel
      .findOne({ _id: jobUniqueId })
      .populate("jobId")
      .populate({ path: "userId", select: "name email contact" });

    if (!jobDetails) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const orderData = {
      amount: Number(jobDetails.jobId.cost) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(orderData);
    console.log("Order created:", order);

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay error response:", err);
    res.status(500).json({
      success: false,
      message: "Payment order creation failed",
      error: err.message,
    });
  }
});

userRouter.post("/payment-verification/:jobUniqueId",verifyToken,async (req, res) => {
    try {
      //This is the id of a particular job for the particular work in hiredModel
      const { jobUniqueId } = req.params;
      console.log("Confirm payment", jobUniqueId);
      const particularJobData = await hiredModel
        .findOne({ _id: jobUniqueId })
        .populate("jobId");

      if (particularJobData.paymentStatus === "done") {
        return res.json({
          success: false,
          massage: "Payment have already done",
        });
      }

      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        req.body;

      const sign = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(sign.toString())
        .digest("hex");

      console.log("razorpay_signature:", razorpay_signature);
      console.log("expected_signature:", expectedSignature);

      if (razorpay_signature === expectedSignature) {
        //Fix here this id go in hiredModel
        const paymentData = await paymentModel.create({
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        });

        particularJobData.paymentStatus = "done";
        particularJobData.razorpay_payment_id = razorpay_payment_id;
        particularJobData.razorpay_order_id = razorpay_order_id;
        particularJobData.razorpay_signature = razorpay_signature;

        await particularJobData.save();

        //setJobIdInUserModel so that user has info about job
        const user = await userModel.findOne({ _id: particularJobData.userId });
        const worker = await workerModel.findOne({
          _id: particularJobData.workerId,
        });

        user.jobId.unshift(jobUniqueId);
        worker.jobId.unshift(jobUniqueId);
        worker.earnings.unshift(particularJobData.jobId.cost);

        await user.save();
        await worker.save();

        const msg = ` Dear <strong>${user.name}</strong>,<br><br>
                      We are pleased to confirm that you have successfully hired <strong>${
                        worker.name
                      }</strong> 
                     for the service <strong>${
                       particularJobData.jobId.title
                     } on <strong>${new Date(
          particularJobData.hiredAt
        ).toLocaleString()}</strong> 
                     through <strong>ProConnect</strong>.<br><br></strong> via <strong>ProConnect</strong>.<br><br>
                     Your service provider is scheduled to arrive on <strong>${new Date(
                       particularJobData.date
                     ).toLocaleDateString()}</strong>.<br><br>
                     Thank you for trusting ProConnect. We are committed to ensuring you receive the best possible service experience.<br><br>
                     Best regards,<br>
                     Your order id is: <strong>particularJobData.razorpay_order_id</strong>
                    <strong>The ProConnect Team</strong>
                   `;
        await sendMail(
          user.email,
          "Service Booking Confirmation - ProConnect",
          msg
        );

        const msgWorker = `Dear <strong>${worker.name}</strong>,<br><br>
                     We are pleased to inform you that you have been hired by <strong>${user.name}</strong> for the service <strong>${particularJobData.jobId.title}</strong> via <strong>ProConnect</strong>.<br><br>
                     The booking was confirmed on <strong>${new Date(particularJobData.hiredAt).toLocaleString()}</strong>.<br><br>
                   The service is scheduled on <strong>${new Date(particularJobData.date).toLocaleDateString()}</strong> 
                     at <strong>${particularJobData.time}</strong>.<br><br>
                 Thank you for being a valued service provider on ProConnect. We appreciate your commitment to delivering excellent service.<br><br>
                 Best regards,<br>
            <strong>The ProConnect Team</strong>
`;

        await sendMail(
          worker.email,
          "New Service Booking - ProConnect",
          msgWorker
        );

         return res.render("payment-success", {
        userName: user.name,
        workerName: worker.name,
        jobTitle: particularJobData.jobId.title,
        paymentId: razorpay_payment_id,
        scheduledDate: new Date(particularJobData.date).toLocaleDateString(),
        hiredAt: new Date(particularJobData.hiredAt).toLocaleString(),
      });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Payment verification failed" });
      }
    } catch (err) {
      console.error("Payment verification error:", err);
      res
        .status(500)
        .json({ success: false, message: "Server error", error: err.message });
    }
  }
);

//---------------------API for canceling an order and refund---------------------------

userRouter.post("/cancel-order", verifyToken, async (req, res) => {
  try {
    const { id } = req.body;

    const jobDetails = await hiredModel.findOne({ _id: id }).populate("jobId");
    if (!jobDetails) {
      return res.json({ success: false, message: "Order not found" });
    }

    if (jobDetails.trackWorker === "start") {
      return res.json({
        success: false,
        message:
          "The worker has already started their journey to your location. Cancellation is no longer possible at this stage.",
      });
    }

    if (jobDetails.isCancel) {
      return res.json({
        success: false,
        message: "Already cancelled and payment is refunded",
      });
    }

    const user = await userModel.findOne({ _id: jobDetails.userId });
    const worker = await workerModel.findOne({ _id: jobDetails.workerId });

    if (!worker) {
      return res.json({ success: false, message: "Worker not found" });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const paymentId = jobDetails.razorpay_payment_id;
    const amount = jobDetails.jobId.cost;

    if (!paymentId) {
      return res.json({
        success: false,
        message: "Payment ID not found for this order",
      });
    }

    // Refund
    const refund = await instance.payments.refund(paymentId, {
      amount: amount * 100, // paise
      speed: "normal",
    });

    jobDetails.isCancel = true;

    // check refund status
    const refundStatus = await instance.refunds.fetch(refund.id);

    console.log(refundStatus.status);
    if (refundStatus.status === "processed") {
      jobDetails.isRefund = true;
      jobDetails.refundId = refund.id;
    } else {
      jobDetails.isRefund = false; // still pending
    }

    jobDetails.cancelOn = new Date();

    const index = worker.earnings.indexOf(amount);
    if (index > -1) {
      worker.earnings.splice(index, 1);
    }

    const ind = user.jobId.indexOf(id);
    if (index > -1) {
      user.jobId.splice(index, 1);
    }

    const inde = worker.jobId.indexOf(id);
    if (index > -1) {
      worker.jobId.splice(index, 1);
    }

    await jobDetails.save();
    await worker.save();
    await user.save();

const msg = `
  Dear <strong>${jobDetails.userId.name}</strong>,<br><br>
  We confirm that your service <strong>${jobDetails.jobId.title}</strong> (Order ID: <strong>${jobDetails.razorpay_order_id}</strong>) has been successfully canceled.<br><br>
  Please allow 3–7 working days for the refund to be processed and reflected in your account.<br><br>
  Thank you for using <strong>ProConnect</strong>.<br><br>
  Best regards,<br>
  <strong>The ProConnect Team</strong>
`;

await sendMail(jobDetails.userId.email, "Service Cancellation Confirmation - ProConnect", msg);


const msgWorker = `
  Dear <strong>${jobDetails.workerId.name}</strong>,<br><br>
  We would like to inform you that the service <strong>${jobDetails.jobId.title}</strong> (Order ID: <strong>${jobDetails.razorpay_order_id}</strong>) assigned to you has been canceled by <strong>${jobDetails.userId.name}</strong>.<br><br>
  Please note that the refund process for the user is underway and may take 3–7 working days to complete.<br><br>
  Thank you for your continued commitment and service through <strong>ProConnect</strong>.<br><br>
  Best regards,<br>
  <strong>The ProConnect Team</strong>
`;

await sendMail(jobDetails.workerId.email, "Service Cancellation Notification - ProConnect", msgWorker);




    res.json({
      success: true,
      message: "Order canceled and Refund initiated successfully",
      data: refund,
    });
  } catch (error) {
    console.error("Refund Error:", error);
    res.status(500).json({ success: false, message: "Refund failed", error });
  }
});

module.exports = userRouter;
