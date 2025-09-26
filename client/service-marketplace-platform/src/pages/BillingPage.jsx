import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { hireWorker, createOrder, sendOrderData } from "../service/userServices";


const BillingPage = () => {
  //This is the _id of job in the hired model send by hire-worker route
  const [jobUniqueId, setJobUniqueId] = useState();
  //This is the detail of the job like cost, worker infromation from hire-worker route
  const [jobDetails, setJobDetails] = useState();
  const [form, setFrom] = useState({
    name: "",
    address:"",
    contact:"",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({}); 
  const [verified, setVerified] = useState(false); 

  //When user click on hire this unique id(stored in jobModel: _id) of particular service comes in params, it has job deatils with worker id
  const { jobId } = useParams();
  const [searchParams] = useSearchParams();
  const cost = searchParams.get("cost");

  //When the page renders, useEffect executes itself calls the hireWorker service which calls the hire-worker route , which stores this jobId , 
  //workerId ,loggedIn userid in hiredWorkermodel and return the _id(jobUniqueId) and jabData(jobdetails) as response
  useEffect(() => {
    const hire = async (jobId) => {
      const response = await hireWorker(jobId);
      setJobUniqueId(response.key);
      setJobDetails(response.jobData);
    };
    hire(jobId);
  }, []);

  useEffect(() => {
    console.log("////////////////////",jobDetails)
  },[jobDetails])

  const handleChange = (e) =>{
    setFrom({...form,[e.target.name] : e.target.value })
  }

  // simple form validator
  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.date.trim()) newErrors.date = "Address is required";
    if (!form.time.trim()) newErrors.time = "Address is required";
    if (!form.contact.trim()) {
      newErrors.contact = "Contact is required";
    } else if (!/^[0-9]{10}$/.test(form.contact)) {
      newErrors.contact = "Contact must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) =>{
     // Method in the service for storing the order data(name,contact,address) from biiling page in hiredModel
     e.preventDefault();
     if (!validateForm()) return; // stop if validation fails

     const orderData = await sendOrderData(form,jobUniqueId);
     console.log("Order Data Saved:", orderData);
     // when verified, hide button with transition
     setVerified(true);
  }

  //when userclick on paynow this method calls
  const handlePayment = async () => {
    try {
      const data = await createOrder(jobUniqueId);
      console.log("-----------------",data)

     if (!data.success) return alert("Failed to initiate payment");

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Service Marketplace Platform",
        description: "Providing Services",
        order_id: data.order.id,
        callback_url: `https://proconnect-server1.onrender.com/payment-verification/${jobUniqueId}`,
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#0a1920ff" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Billing Page</h2>

      <div className="row">
        {/* Left Side: Billing Form */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Billing Information</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.name ? "is-invalid" : ""}`} 
                  placeholder="Enter your name" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange}/>
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea 
                  className={`form-control ${errors.address ? "is-invalid" : ""}`} 
                  rows="3" 
                  placeholder="Enter your address" 
                  name="address" 
                  value={form.address} 
                  onChange={handleChange}></textarea>
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Contact</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.contact ? "is-invalid" : ""}`} 
                  placeholder="Enter your contact number"  
                  name="contact" 
                  value={form.contact} 
                  onChange={handleChange}/>
                {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
              </div>

               <div className="mb-3">
                <label className="form-label">Enter Date you want for service</label>
                <input 
                  type="date" 
                  className={`form-control ${errors.date ? "is-invalid" : ""}`} 
                  placeholder="Enter your contact number"  
                  name="date" 
                  value={form.date} 
                  onChange={handleChange}/>
                {errors.date && <div className="invalid-feedback">{errors.date}</div>}
              </div>

               <div className="mb-3">
                <label className="form-label">Enter time you want for service</label>
                <input 
                  type="time" 
                  className={`form-control ${errors.time ? "is-invalid" : ""}`} 
                  placeholder="Enter your contact number"  
                  name="time" 
                  value={form.time} 
                  onChange={handleChange}/>
                {errors.time && <div className="invalid-feedback">{errors.time}</div>}
              </div>

              {/* Verify button with fade-out transition */}
              {!verified && (
                <button 
                  type="submit" 
                  className="btn btn-success w-100 transition-all" 
                  style={{ transition: "opacity 0.5s ease", opacity: verified ? 0 : 1 }}
                >
                  Verify Details
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Right Side: Billing Details */}
        {verified &&         <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Billing Details</h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between">
                <span>Service Cost</span>
                <strong>₹{cost || 0}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Discount</span>
                <strong>₹--</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <strong>₹{cost}</strong>
              </li>
            </ul>

            {/* <div className="mb-3">
  <label className="form-label">Discount Code</label>
  <div className="input-group">
    <input
      type="text"
      className="form-control"
      placeholder="Enter discount code"
      id="discountCode"
    />
    <button
      className="btn btn-outline-primary"
      type="button"
      onClick={() => {
        const code = document.getElementById("discountCode").value;
        if (code === "SAVE50") {
          setDiscount(50);
        } else {
          setDiscount(0);
          alert("Invalid discount code");
        }
      }}
    >
      Apply
    </button>
  </div>
  <p class="py-2">Enter <strong>"SAVE50" </strong> for discount of ₹50</p>
</div> */}

            <button className="btn btn-primary btn-lg w-100" onClick={handlePayment}>
              Pay Now
            </button>
          </div>
        </div>}

      </div>
    </div>
  );
};

export default BillingPage;
