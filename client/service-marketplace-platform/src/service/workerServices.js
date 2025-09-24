import { Form } from "react-router";

export const workerRegistration = async (fd) => {
  const response = await fetch("http://localhost:5000/worker-registration", {
    method: "POST",
    body: fd,
  });

  const data = await response.json();
  return data;
};

export const workerLogin = async (form) => {
  const response = await fetch("http://localhost:5000/worker-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
    credentials: "include",
  });

  const data = await response.json();
  console.log("service", data);
  return data;
};

export const fetchWorkerProfile = async () => {
  const response = await fetch("http://localhost:5000/fetch-worker-data", {
    method: "GET",
    credentials: "include",
  });
  console.log("Service", response);
  const data = await response.json();
  return data;
};

//-----------Service for fetching the data of job assined to a from hiredModel for workerProfile.jsx

export const fetchAssignedJobData = async() =>{
  const response = await fetch("http://localhost:5000/fetch-assigned-jobs", {
    method: "GET",
    credentials: "include",
  });
  console.log("Service", response);
  const data = await response.json();
  return data;
}

//----------------Service for when worker click on mark complete for WworkerProfile.jsx-----------------------

export const markComplete = async(id) =>{
  const response = await fetch("http://localhost:5000/mark-complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id}),
    credentials: "include",
  });

  const data = await response.json();
  console.log("service", data);
  return data
}

//----------------Service for when worker click on start for WworkerProfile.jsx-----------------------

export const startjob = async(id) =>{
  const response = await fetch("http://localhost:5000/start-job", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id}),
    credentials: "include",
  });

  const data = await response.json();
  console.log("service", data);
  return data
}

//Service for worker to see completed job details

export const fetchCompletedJobsData = async() =>{
  const response = await fetch("http://localhost:5000/fetch-completed-job-data", {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();
  console.log("service", data);
  return data
}

//----------------Service for VerifyWorker.jsx----------------------

export const fetchUnVerifiedWorker = async () => {
  const response = await fetch(
    "http://localhost:5000/fetch-unverified-worker",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();
  console.log("Service", data);
  return data;
};

export const verifyWorker = async (id) => {
  const response = await fetch(
    "http://localhost:5000/verify-unverified-worker",
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      credentials: "include",
    }
  );

  const data = await response.json();
  console.log("response", data);
  return data;
};

export const selectWorker = async (id) => {
  const response = await fetch(
    "http://localhost:5000/select-unselected-worker",
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      credentials: "include",
    }
  );

  const data = await response.json();
  console.log("response", data);
  return data;
};

export const rejectWorker = async (id) => {
  const response = await fetch("http://localhost:5000/reject-worker", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
    credentials: "include",
  });

  const data = await response.json();
  console.log("Service", data);
  return data;
};

//----------Service for TotalWorker.jsx--------------------

export const fetchVerifiedAndSelectedWorker = async () => {
  const response = await fetch(
    "http://localhost:5000/verifiedselected-worker-data",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();
  console.log("Service", data);
  return data;
};

//--------------Service for CreateNewJob,jsx----------------

export const createNewJob = async (form) => {
  const fd = new FormData();
  fd.append("title", form.title);
  fd.append("description", form.description);
  fd.append("price", form.price);
  if (form.jobImage) {
    fd.append("jobImage", form.jobImage); 
  }

  const response = await fetch("http://localhost:5000/create-new-job", {
    method: "POST",
    body: fd, 
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

//--------------------Service for editing worker profile
export const editWorkerProfile = async (formData) => {
  const response = await fetch("http://localhost:5000/edit-worker-profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), 
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

//------------------Service for pausing worker services----------------

export const pauseServices = async () => {
  const response = await fetch(
    "http://localhost:5000/pause-services",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();
  console.log("Service", data);
  return data;
};

//------------------Service for start worker services----------------

export const startServices = async () => {
  const response = await fetch(
    "http://localhost:5000/start-services",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();
  console.log("Service", data);
  return data;
};


//-----------------Service for fetching listed jobs data----------

export const fetchListedjobs = async() => {
   const response = await fetch(
    "http://localhost:5000/fetch-listed-services",
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();
  console.log("Service", data);
  return data;
}

//----------------Service for deleting a service by worker------------------

export const deleteService = async(id) =>{
  const response = await fetch("http://localhost:5000/delete-service",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({id}),
    credentials: "include",
  });

  const data = await response.json();
  console.log("Service", data);
  return data;
}

//---------------Service for logOut-----------------

export const logOut = async() => {
  const response = await fetch("http://localhost:5000/logout", {
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();
  console.log("service------------------------------------------", data);
  return data;
}
