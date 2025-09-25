
//-------------REgistration----------------------------

export const createAdmin = async(email,name,password,contact,secret) =>{
   const response = await fetch("https://proconnect-server1.onrender.com/create-admin",{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({email,name,password,contact,secret}),
   });

   const data = await response.json();
   
   return data;
}

//-------------------Login--------------------------

export const adminLogin = async(form) =>{
  const response = await fetch("https://proconnect-server1.onrender.com/admin-login",{
    method: "POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(form),
    credentials: "include",  
  });

  const data = await response.json()
  console.log("service",data)
  return data;
}

//-------------Logout---------------------

export const logOut = async() => {
  const response = await fetch("https://proconnect-server1.onrender.com/logout", {
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}


//------------Service for fetching completed jobs by worker------------------

export const fetchCompletedJobs = async() =>{
  const response = await fetch("https://proconnect-server1.onrender.com/get-completed-jobs",{
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}

//------------Service for fetching completed jobs by worker------------------

export const fetchCancelledJobs = async() =>{
  const response = await fetch("https://proconnect-server1.onrender.com/get-cancelled-jobs",{
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}

//------------Service for fetching completed jobs by worker------------------

export const fetchUnverifiedJobs = async() =>{
  const response = await fetch("https://proconnect-server1.onrender.com/fetch-unverified-jobs",{
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}

//------------Service for fetching completed jobs by worker------------------

export const verifyUnverifiedJob = async(id) =>{
  const response = await fetch("https://proconnect-server1.onrender.com/verify-unverified-jobs",{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({id}),
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}

//------------Service for fetching completed jobs by worker------------------

export const rejectJob = async(id) =>{
  const response = await fetch("https://proconnect-server1.onrender.com/rejecting-unverified-jobs",{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({id}),
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}
