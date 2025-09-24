export const newUserRegistration = async (
  email,
  name,
  password,
  contact,
  address
) => {
  try {
    const response = await fetch("http://localhost:5000/user-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password, contact, address }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return { success: false, msg: errorData?.msg || "Something went wrong" };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Registration fetch error:", err.message);
    return { success: false, msg: "Network error" };
  }
};

//Login
export const userLogin = async (email, password) => {
  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await response.json();
  console.log("Service", data);
  return data;
};

//------Service for fetching job list for LandingPage.jsx-------------

export const fetchJobList = async () => {
  const response = await fetch("http://localhost:5000/fetch-job-data", {
    method: "GET",
  });

  const data = await response.json();
  console.log("service", data);
  return data;
};

//------Service for fetching job list for searche by user for SearchJobs.jsx-------------

export const fetchJobListBySearch = async (searchTerm) => {
  const response = await fetch("http://localhost:5000/fetch-job-data-by-search", {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({searchTerm})
  });

  const data = await response.json();
  console.log("service", data);
  return data;
};

////------Service for fetching job list of most hired service providerf for userprofilePage.jsx-------------

export const fetchMostHiredServiceProvider = async() =>{
const response = await fetch("http://localhost:5000/most-hired-service-provider", {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  console.log("service", data);
  return data;
}

////------Service for fetching job list of most hired service providerf for LandingPage.jsx-------------

export const fetchMostHiredServiceProviderLanding = async() =>{
const response = await fetch("http://localhost:5000/most-hired-service-provider-landing", {
    method: "GET",
  });

  const data = await response.json();
  console.log("service", data);
  return data;
}
//---------------Service for tracking order detail for serprofilePage.jsx-----------------

export const fetchTrackOrderdetails = async() =>{
const response = await fetch("http://localhost:5000/track-order", {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  console.log("service", data);
  return data;
}

//API for markin job status complete by user side for trackOreder.jsx--------------------

export const markComplete = async(id) =>{
  const response = await fetch("http://localhost:5000/mark-complete-by-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
    credentials: "include",
  });

  const data = await response.json();
  console.log("Service", data);
  return data;
}

//-----------Service for viewing completed jobs for user from ViewHistori.jsx--------

export const viewHistory = async() =>{
const response = await fetch("http://localhost:5000/view-history", {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  console.log("service", data);
  return data;
}

//-------------Service for fetching user Profile data for UserProfile.jsx------------------

export const fetchUserProfileData = async() =>{
const response = await fetch("http://localhost:5000/fetch-user-profile", {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  console.log("service", data);
  return data;
}

//-------Service for editing user profile data -----------------

export const editUserData = async (data) => {
  const response = await fetch("http://localhost:5000/update-user-profile-data", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify(data), 
    credentials: "include",
  });

  const updatedData = await response.json();
  return updatedData;
};

//-------Service for reviewing worker ---------------------------

export const reviewWorker = async(data) =>{
  const response = await fetch("http://localhost:5000/review-worker",{
    method: "POST",
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify(data), 
    credentials: "include"
  });

    const savedReview = await response.json();
    return savedReview;
}


//-----------Service for review by worker on website------------

export const reviewUs = async(review) =>{
    const response = await fetch("http://localhost:5000/review-us", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( review ),
    credentials: "include",
  });

  const data = await response.json();
  console.log("service", data);
  return data;
}

//----------------Service for fetching review data for landing oage---------

export const fetchReviewData = async() =>{
const response = await fetch("http://localhost:5000/fetch-review-data", {
    method: "GET",
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}

//----------------Service for fetching review data for landing oage---------

export const fetchReviewDataUser = async() =>{
const response = await fetch("http://localhost:5000/fetch-review-data-user", {
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}

//------Service for searching jobs by user------------------------

export const searchJobs = async(searchTerm) => {
  const response = await fetch("http://localhost:5000/search-jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchTerm }),
    credentials: "include",
  });

  const data = await response.json();
  console.log("service", data);
  return data;
}

//------Service for hirirng worker by user for LandingPage.jsx-------------

export const hireWorker = async (jobId) => {
  const response = await fetch("http://localhost:5000/hire-worker", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jobId }),
    credentials: "include",
  });

  const data = await response.json();
  console.log("service", data);
  return data;
};

//--------Service for storing the order data(name,contact,address) from biiling page in hiredModel

export const sendOrderData = async(form,jobUniqueId) =>{
  const response = await fetch("http://localhost:5000/send-order-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body : JSON.stringify({ form, jobUniqueId }),
    credentials: "include",
  });

  const data = await response.json();
  return data;
}

//----------Service for cccreating order(creating the data for order by razorpy) used for billingPage.jsx

export const createOrder = async (jobUniqueId) => {
  console.log("--------------",jobUniqueId)
  const response = await fetch("http://localhost:5000/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jobUniqueId}), // ✅ send jobId only
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

//-----------Service for canceling an order------------------------------------

export const cancelOrder = async(id) =>{
  const response = await fetch("http://localhost:5000/cancel-order",{
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({id}),
    credentials: "include"
  });

  const data = await response.json();
  return data;
}

//------------------Service for logout-------------------------------

export const logOut = async() => {
  const response = await fetch("http://localhost:5000/logout", {
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}

