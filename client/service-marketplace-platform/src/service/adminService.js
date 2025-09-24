
//-------------REgistration----------------------------

export const createAdmin = async(email,name,password,contact,secret) =>{
   const response = await fetch("http://localhost:5000/create-admin",{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({email,name,password,contact,secret}),
   });

   const data = await response.json();
   
   return data;
}

//-------------------Login--------------------------

export const adminLogin = async(form) =>{
  const response = await fetch("http://localhost:5000/admin-login",{
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
  const response = await fetch("http://localhost:5000/logout", {
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}


//------------Service for fetching completed jobs by worker------------------

export const fetchCompletedJobs = async() =>{
  const response = await fetch("http://localhost:5000/get-completed-jobs",{
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}

//------------Service for fetching completed jobs by worker------------------

export const fetchCancelledJobs = async() =>{
  const response = await fetch("http://localhost:5000/get-cancelled-jobs",{
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}

//------------Service for fetching completed jobs by worker------------------

export const fetchUnverifiedJobs = async() =>{
  const response = await fetch("http://localhost:5000/fetch-unverified-jobs",{
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}

//------------Service for fetching completed jobs by worker------------------

export const verifyUnverifiedJob = async(id) =>{
  const response = await fetch("http://localhost:5000/verify-unverified-jobs",{
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
  const response = await fetch("http://localhost:5000/rejecting-unverified-jobs",{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({id}),
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}